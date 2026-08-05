export type DownloadStatus = 'idle' | 'loading' | 'success' | 'error'

export type DownloadMode = 'auto' | 'audio' | 'mute'

export interface DownloadPickerItem {
  type: string
  url: string
  thumb?: string
}

export interface DownloadResult {
  status: string
  url?: string
  filename?: string
  picker?: DownloadPickerItem[]
  audio?: string
  audioFilename?: string
  error?: { code: string }
}

export interface DownloadRequestBody {
  url: string
  downloadMode: DownloadMode
  videoQuality: string
  audioFormat: string
  audioBitrate: string
  youtubeVideoCodec: string
  filenameStyle: string
  convertGif: boolean
  disableMetadata: boolean
  tiktokFullAudio: boolean
  overrideMetadata?: {
    title?: string
    artist?: string
    album?: string
  }
}

export interface MusicPreview {
  kind: 'music'
  provider: string
  processable: boolean
  resolvedUrl?: string
  title: string
  artist: string
  album: string
  artwork: string | null
  duration: number | null
  formats: Array<'mp3' | 'wav' | 'flac'>
  bitrates: string[]
  notice?: string
}

export interface VideoPreview {
  kind: 'video'
  provider: string
  title: string
  author?: string
  thumbnail?: string | null
}

export type MediaInspection = MusicPreview | VideoPreview
