/**
 * Provider: Bandcamp
 * Busca via scraping da página de busca do Bandcamp.
 */

const SEARCH_URL = 'https://bandcamp.com/search'

async function search(title, artist) {
  const query = `${artist} ${title}`.trim()
  if (!query) return null

  try {
    const url = new URL(SEARCH_URL)
    url.searchParams.set('q', query)
    url.searchParams.set('item_type', 't') // tracks only

    const res = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null

    const html = await res.text()

    // Extrair resultados de busca do HTML
    const results = []
    const matches = html.matchAll(/<div class="result-info">[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>[\s\S]*?<div class="heading">\s*<a[^>]*>([^<]+)<\/a>[\s\S]*?<div class="subhead">[^<]*by\s*([^<]+)/g)

    for (const match of matches) {
      results.push({ url: match[1].trim(), title: match[2].trim(), artist: match[3].trim() })
      if (results.length >= 5) break
    }

    if (results.length === 0) return null

    const normalizedTitle = normalize(title)
    const normalizedArtist = normalize(artist)

    for (const track of results) {
      const t = normalize(track.title)
      const a = normalize(track.artist)

      const titleMatch = t.includes(normalizedTitle) || normalizedTitle.includes(t)
      const artistMatch = a.includes(normalizedArtist) || normalizedArtist.includes(a)

      if (titleMatch && artistMatch) {
        return { url: track.url, confidence: 0.75 }
      }
      if (titleMatch) {
        return { url: track.url, confidence: 0.5 }
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

export const bandcamp = { name: 'Bandcamp', search }
