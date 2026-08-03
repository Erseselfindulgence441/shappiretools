/**
 * Provider: Internet Archive
 * Busca áudio na maior biblioteca digital pública do mundo.
 */

const SEARCH_URL = 'https://archive.org/advancedsearch.php'

async function search(title, artist) {
  const query = `${artist} ${title}`.trim()
  if (!query) return null

  try {
    const url = new URL(SEARCH_URL)
    url.searchParams.set('q', `${query} AND mediatype:audio`)
    url.searchParams.set('fl[]', 'identifier,title,creator')
    url.searchParams.set('rows', '5')
    url.searchParams.set('page', '1')
    url.searchParams.set('output', 'json')

    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) return null

    const data = await res.json()
    const docs = data?.response?.docs || []
    if (docs.length === 0) return null

    const normalizedTitle = normalize(title)
    const normalizedArtist = normalize(artist)

    for (const doc of docs) {
      const t = normalize(doc.title || '')
      const a = normalize(doc.creator || '')

      const titleMatch = t.includes(normalizedTitle) || normalizedTitle.includes(t)
      const artistMatch = a.includes(normalizedArtist) || normalizedArtist.includes(a)

      if (titleMatch && artistMatch && doc.identifier) {
        // Retornar link da página — o sistema depois resolve o arquivo de áudio
        const pageUrl = `https://archive.org/details/${doc.identifier}`
        return { url: pageUrl, confidence: 0.6 }
      }
      if (titleMatch && doc.identifier) {
        return { url: `https://archive.org/details/${doc.identifier}`, confidence: 0.35 }
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

export const internetarchive = { name: 'Internet Archive', search }
