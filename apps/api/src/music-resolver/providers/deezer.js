
const SEARCH_URL = 'https://api.deezer.com/search'

async function search(title, artist) {
  const query = `${artist} ${title}`.trim()
  if (!query) return null

  try {
    const url = new URL(SEARCH_URL)
    url.searchParams.set('q', query)
    url.searchParams.set('limit', '5')

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null

    const data = await res.json()
    const tracks = data?.data || []
    if (tracks.length === 0) return null

    const normalizedTitle = normalize(title)
    const normalizedArtist = normalize(artist)

    for (const track of tracks) {
      const t = normalize(track.title || track.title_short || '')
      const a = normalize(track.artist?.name || '')

      const titleMatch = t.includes(normalizedTitle) || normalizedTitle.includes(t)
      const artistMatch = a.includes(normalizedArtist) || normalizedArtist.includes(a)

      if (titleMatch && artistMatch && track.preview) {
        
        return { url: track.preview, confidence: 0.3 }
      }
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

export const deezer = { name: 'Deezer', search }
