
const SEARCH_URL = 'https://freemusicarchive.org/api/get/tracks.json'

async function search(title, artist) {
  const query = `${artist} ${title}`.trim()
  if (!query) return null

  try {

    const url = new URL('https://freemusicarchive.org/search')
    url.searchParams.set('quicksearch', query)
    url.searchParams.set('sort', 'track_date_published')
    url.searchParams.set('d', 'desc')
    url.searchParams.set('page_size', '5')

    const res = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null

    const html = await res.text()

    const audioMatch = html.match(/href="(https:\/\/freemusicarchive\.org\/music\/[^"]+)"/i)
    if (audioMatch) {
      return { url: audioMatch[1], confidence: 0.4 }
    }

    return null
  } catch {
    return null
  }
}

export const freemusicarchive = { name: 'Free Music Archive', search }
