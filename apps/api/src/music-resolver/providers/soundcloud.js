
const SEARCH_URL = 'https://api-v2.soundcloud.com/search/tracks'
let cachedClientId = ''

async function getClientId() {
  if (cachedClientId) return cachedClientId

  try {
    const html = await fetch('https://soundcloud.com/', { signal: AbortSignal.timeout(8000) }).then(r => r.text())

    let clientId = html.match(/"hydratable"\s*:\s*"apiClient"\s*,\s*"data"\s*:\s*\{\s*"id"\s*:\s*"([^"]+)"/)?.[1]
    if (!clientId) {
      const scripts = [...html.matchAll(/<script.+src="(.+)">/g)]
      for (const [, url] of scripts) {
        if (!url?.startsWith('https://a-v2.sndcdn.com/')) continue
        const js = await fetch(url, { signal: AbortSignal.timeout(5000) }).then(r => r.text()).catch(() => '')
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

async function search(title, artist) {
  const clientId = await getClientId()
  if (!clientId) return null

  const query = `${artist} ${title}`.trim()
  if (!query) return null

  const url = new URL(SEARCH_URL)
  url.searchParams.set('q', query)
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('limit', '5')

  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) return null

  const data = await res.json()
  const tracks = data?.collection || []
  if (tracks.length === 0) return null

  const normalizedTitle = normalize(title)
  const normalizedArtist = normalize(artist)

  for (const track of tracks) {
    if (track.policy === 'BLOCK' || track.policy === 'SNIP' || !track.streamable) continue

    const t = normalize(track.title || '')
    const a = normalize(track.user?.username || '')

    const titleMatch = t.includes(normalizedTitle) || normalizedTitle.includes(t)
    const artistMatch = a.includes(normalizedArtist) || normalizedArtist.includes(a)

    if (titleMatch && artistMatch) {
      return { url: track.permalink_url, confidence: 0.9 }
    }
    if (titleMatch) {
      return { url: track.permalink_url, confidence: 0.7 }
    }
  }

  const first = tracks.find(t => t.streamable && t.policy !== 'BLOCK' && t.policy !== 'SNIP')
  if (first) {
    return { url: first.permalink_url, confidence: 0.4 }
  }

  return null
}

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export const soundcloud = { name: 'SoundCloud', search }
