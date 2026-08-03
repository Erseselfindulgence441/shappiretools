/**
 * Provider: Audiomack
 * Busca músicas via API pública do Audiomack.
 * Audiomack é uma plataforma de streaming gratuita.
 */

const SEARCH_URL = 'https://api.audiomack.com/v1/music/search'

async function search(title, artist) {
  const query = `${artist} ${title}`.trim()
  if (!query) return null

  try {
    const url = new URL(SEARCH_URL)
    url.searchParams.set('q', query)
    url.searchParams.set('show', 'songs')
    url.searchParams.set('limit', '5')

    const res = await fetch(url, {
      headers: { 'accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) return null

    const data = await res.json()
    const results = data?.results?.songs || data?.results || []
    if (!Array.isArray(results) || results.length === 0) return null

    const normalizedTitle = normalize(title)
    const normalizedArtist = normalize(artist)

    for (const track of results) {
      const t = normalize(track.title || track.song_title || '')
      const a = normalize(track.artist || track.uploader || '')

      const titleMatch = t.includes(normalizedTitle) || normalizedTitle.includes(t)
      const artistMatch = a.includes(normalizedArtist) || normalizedArtist.includes(a)

      if (titleMatch && artistMatch && track.url_slug) {
        return {
          url: `https://audiomack.com/${track.artist_url_slug || track.uploader_url_slug}/song/${track.url_slug}`,
          confidence: 0.75,
        }
      }
      if (titleMatch && track.url_slug) {
        return {
          url: `https://audiomack.com/${track.artist_url_slug || track.uploader_url_slug}/song/${track.url_slug}`,
          confidence: 0.5,
        }
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

export const audiomack = { name: 'Audiomack', search }
