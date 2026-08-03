
const SEARCH_URL = 'https://api.jamendo.com/v3.0/tracks'
const CLIENT_ID = '5b6ad8c8' 

async function search(title, artist) {
  const query = `${artist} ${title}`.trim()
  if (!query) return null

  try {
    const url = new URL(SEARCH_URL)
    url.searchParams.set('client_id', CLIENT_ID)
    url.searchParams.set('format', 'json')
    url.searchParams.set('limit', '5')
    url.searchParams.set('namesearch', query)
    url.searchParams.set('include', 'musicinfo')

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null

    const data = await res.json()
    const tracks = data?.results || []
    if (tracks.length === 0) return null

    const normalizedTitle = normalize(title)
    const normalizedArtist = normalize(artist)

    for (const track of tracks) {
      const t = normalize(track.name || '')
      const a = normalize(track.artist_name || '')

      const titleMatch = t.includes(normalizedTitle) || normalizedTitle.includes(t)
      const artistMatch = a.includes(normalizedArtist) || normalizedArtist.includes(a)

      if (titleMatch && artistMatch && track.audio) {
        return { url: track.audio, confidence: 0.7 }
      }
      if (titleMatch && track.audio) {
        return { url: track.audio, confidence: 0.5 }
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

export const jamendo = { name: 'Jamendo', search }
