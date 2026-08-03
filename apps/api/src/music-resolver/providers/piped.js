/**
 * Provider: YouTube (via Piped API — instância pública sem bloqueio)
 * Busca músicas no YouTube sem precisar de autenticação ou cookies.
 * Piped é um frontend alternativo do YouTube com API pública.
 */

const PIPED_INSTANCES = [
  'https://pipedapi.kavin.rocks',
  'https://pipedapi.r4fo.com',
  'https://pipedapi.moomoo.me',
]

let activeInstance = 0

function getBaseUrl() {
  return PIPED_INSTANCES[activeInstance % PIPED_INSTANCES.length]
}

function rotateInstance() {
  activeInstance = (activeInstance + 1) % PIPED_INSTANCES.length
}

async function search(title, artist) {
  const query = `${artist} ${title}`.trim()
  if (!query) return null

  // Tentar até 2 instâncias
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const base = getBaseUrl()
      const url = `${base}/search?q=${encodeURIComponent(query)}&filter=music_songs`

      const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
      if (!res.ok) { rotateInstance(); continue }

      const data = await res.json()
      const items = data?.items || []
      if (items.length === 0) { rotateInstance(); continue }

      const normalizedTitle = normalize(title)
      const normalizedArtist = normalize(artist)

      for (const item of items) {
        if (item.type !== 'stream') continue

        const t = normalize(item.title || '')
        const a = normalize(item.uploaderName || '')

        const titleMatch = t.includes(normalizedTitle) || normalizedTitle.includes(t)
        const artistMatch = a.includes(normalizedArtist) || normalizedArtist.includes(a)

        if (titleMatch && artistMatch) {
          // Retornar URL do SoundCloud-style (o backend processa via Cobalt)
          const videoUrl = `https://youtube.com${item.url}`
          return { url: videoUrl, confidence: 0.85 }
        }
        if (titleMatch) {
          const videoUrl = `https://youtube.com${item.url}`
          return { url: videoUrl, confidence: 0.6 }
        }
      }

      // Primeiro resultado como fallback
      const first = items.find(i => i.type === 'stream')
      if (first) {
        return { url: `https://youtube.com${first.url}`, confidence: 0.35 }
      }

      return null
    } catch {
      rotateInstance()
    }
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

export const piped = { name: 'YouTube (Piped)', search }
