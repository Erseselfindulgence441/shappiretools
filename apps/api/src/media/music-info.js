import { extract, normalizeURL } from '../processing/url.js'
import { getSoundCloudTrack } from '../processing/services/soundcloud.js'
import { resolveAudioSource } from '../music-resolver/index.js'

const supportedFormats = ['mp3', 'wav', 'flac']

function splitTrackTitle(title = '') {
  const parts = title.split(/\s+[–-]\s+/)
  return parts.length > 1
    ? { title: parts[0].trim(), artist: parts.slice(1).join(' - ').trim() }
    : { title: title.trim(), artist: '' }
}

async function oEmbed(url, endpoint) {
  const request = new URL(endpoint)
  request.searchParams.set('url', url)
  request.searchParams.set('format', 'json')
  const response = await fetch(request, { signal: AbortSignal.timeout(7000) })
  if (!response.ok) throw new Error('metadata unavailable')
  return response.json()
}

function musicResponse(data) {
  return {
    kind: 'music',
    formats: supportedFormats,
    bitrates: ['128', '192', '320'],
    ...data,
  }
}

export async function inspectMusic(req, res) {
  const rawUrl = String(req.body?.url || '').trim()
  if (!rawUrl) return res.status(400).json({ error: 'Envie um link válido.' })

  let url
  try {
    url = new URL(rawUrl)
  } catch {
    return res.status(400).json({ error: 'Envie um link válido.' })
  }

  const host = url.hostname.replace(/^www\./, '')

  try {
    if (host.endsWith('soundcloud.com') || host === 'on.soundcloud.com') {
      const normalized = normalizeURL(rawUrl)
      const parsed = extract(normalized)
      if ('error' in parsed || parsed.host !== 'soundcloud') return res.status(400).json({ error: 'Não foi possível identificar esta faixa do SoundCloud.' })

      const track = await getSoundCloudTrack({ ...parsed.patternMatch, format: 'mp3' })
      if (track.error) return res.status(400).json({ error: 'Não foi possível obter os dados desta faixa.' })

      return res.json(musicResponse({
        provider: 'SoundCloud',
        processable: true,
        title: track.fileMetadata?.title || 'Faixa sem título',
        artist: track.fileMetadata?.artist || 'Artista desconhecido',
        album: track.fileMetadata?.album || 'Single',
        artwork: track.cover || null,
        duration: Math.round((track.duration || 0) / 1000),
      }))
    }

    if (host.endsWith('open.spotify.com') || host.endsWith('spotify.com')) {
      const data = await oEmbed(url.toString(), 'https://open.spotify.com/oembed')
      const track = splitTrackTitle(data.title)
      const title = track.title || 'Faixa do Spotify'
      const artist = track.artist || data.author_name || 'Artista desconhecido'
      const artwork = data.thumbnail_url || null

      const resolved = await resolveAudioSource(title, artist)

      if (resolved) {
        return res.json(musicResponse({
          provider: 'Spotify',
          processable: true,
          resolvedUrl: resolved.url,
          resolvedProvider: resolved.provider,
          title,
          artist,
          album: 'Spotify',
          artwork,
          duration: null,
        }))
      }

      return res.json(musicResponse({
        provider: 'Spotify',
        processable: false,
        title,
        artist,
        album: 'Spotify',
        artwork,
        duration: null,
        notice: 'Não foi possível encontrar uma fonte de áudio para esta música. Tente com outro link ou use o SoundCloud diretamente.',
      }))
    }

    if (host.endsWith('music.youtube.com') || (host.endsWith('youtube.com') && url.pathname.startsWith('/watch')) || host === 'youtu.be') {
      const data = await oEmbed(url.toString(), 'https://www.youtube.com/oembed')
      const title = data.title || 'Faixa'
      const artist = data.author_name || 'Artista desconhecido'
      const artwork = data.thumbnail_url || null

      const resolved = await resolveAudioSource(title, artist)

      if (resolved) {
        return res.json(musicResponse({
          provider: 'YouTube Music',
          processable: true,
          resolvedUrl: resolved.url,
          resolvedProvider: resolved.provider,
          title,
          artist,
          album: 'YouTube Music',
          artwork,
          duration: null,
        }))
      }

      return res.json(musicResponse({
        provider: 'YouTube Music',
        processable: false,
        title,
        artist,
        album: 'YouTube Music',
        artwork,
        duration: null,
        notice: 'Não foi possível encontrar uma fonte de áudio para esta música.',
      }))
    }

    return res.json({ kind: 'video' })
  } catch {
    return res.status(502).json({ error: 'Não foi possível buscar os dados desta mídia.' })
  }
}
