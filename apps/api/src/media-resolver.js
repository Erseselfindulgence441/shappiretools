/**
 * Media Resolver — Busca automaticamente uma fonte de áudio processável
 * quando o link original (Spotify, YouTube Music) não fornece arquivo direto.
 *
 * Estratégia: Usa o SoundCloud como fonte de áudio via busca por título + artista.
 */

const SOUNDCLOUD_SEARCH = 'https://api-v2.soundcloud.com/search/tracks'

let cachedClientId = ''

async function getClientId() {
  if (cachedClientId) return cachedClientId

  try {
    const html = await fetch('https://soundcloud.com/').then(r => r.text())
    const version = html.match(/<script>window\.__sc_version="([0-9]{10})"<\/script>/)?.[1]

    let clientId = html.match(/"hydratable"\s*:\s*"apiClient"\s*,\s*"data"\s*:\s*\{\s*"id"\s*:\s*"([^"]+)"/)?.[1]
    if (!clientId) {
      const scripts = [...html.matchAll(/<script.+src="(.+)">/g)]
      for (const [, url] of scripts) {
        if (!url?.startsWith('https://a-v2.sndcdn.com/')) continue
        const js = await fetch(url).then(r => r.text()).catch(() => '')
        const match = js.match(/,client_id:"([A-Za-z0-9]{32})",/)
        if (match) { clientId = match[1]; break }
      }
    }

    if (clientId) cachedClientId = clientId
    return clientId
  } catch {
    return null
  }
}

/**
 * Busca uma música no SoundCloud por título e artista.
 * Retorna a URL do SoundCloud se encontrar um match razoável, null se não encontrar.
 */
export async function resolveAudioSource(title, artist) {
  const clientId = await getClientId()
  if (!clientId) return null

  const query = `${artist} ${title}`.trim()
  if (!query) return null

  const searchUrl = new URL(SOUNDCLOUD_SEARCH)
  searchUrl.searchParams.set('q', query)
  searchUrl.searchParams.set('client_id', clientId)
  searchUrl.searchParams.set('limit', '5')
  searchUrl.searchParams.set('offset', '0')

  try {
    const res = await fetch(searchUrl, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null

    const data = await res.json()
    const tracks = data?.collection || []

    if (tracks.length === 0) return null

    // Tentar encontrar o melhor match
    const normalizedTitle = normalize(title)
    const normalizedArtist = normalize(artist)

    // Primeiro: match exato no título
    const exactMatch = tracks.find(track => {
      const t = normalize(track.title || '')
      const a = normalize(track.user?.username || '')
      return t.includes(normalizedTitle) && (a.includes(normalizedArtist) || normalizedArtist.includes(a))
    })

    if (exactMatch) {
      return buildSoundCloudUrl(exactMatch)
    }

    // Segundo: match parcial (título contém palavras-chave)
    const partialMatch = tracks.find(track => {
      const t = normalize(track.title || '')
      return t.includes(normalizedTitle) || normalizedTitle.includes(t)
    })

    if (partialMatch) {
      return buildSoundCloudUrl(partialMatch)
    }

    // Terceiro: pegar o primeiro resultado mesmo
    const first = tracks[0]
    if (first && first.streamable && first.policy !== 'BLOCK' && first.policy !== 'SNIP') {
      return buildSoundCloudUrl(first)
    }

    return null
  } catch {
    return null
  }
}

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildSoundCloudUrl(track) {
  if (track.permalink_url) return track.permalink_url
  if (track.user?.permalink && track.permalink) {
    return `https://soundcloud.com/${track.user.permalink}/${track.permalink}`
  }
  return null
}
