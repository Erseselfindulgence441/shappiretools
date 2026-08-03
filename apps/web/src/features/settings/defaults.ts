import type { DownloadSettings } from './types'

export const DEFAULT_DOWNLOAD_SETTINGS: DownloadSettings = {
  videoQuality: '1080',
  audioFormat: 'mp3',
  audioBitrate: '128',
  youtubeVideoCodec: 'h264',
  filenameStyle: 'basic',
  convertGif: true,
  disableMetadata: false,
  tiktokFullAudio: false,
}
