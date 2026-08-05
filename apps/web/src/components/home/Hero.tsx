import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  ArrowRight,
  Download,
  Disc3,
  Link as LinkIcon,
  Loader2,
  Sparkles,
} from 'lucide-react'
import {
  inspectMedia,
  requestDownload,
  translateApiError,
  triggerBrowserDownload,
  type DownloadMode,
  type DownloadResult,
  type DownloadStatus,
  type MusicPreview,
  type VideoPreview,
} from '../../features/download'
import { getDownloadSettings } from '../../features/settings'
import { useI18n } from '../../i18n'
import shappireDownload from '../../assets/images/shappiredownload.png'

export function Hero() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<DownloadStatus>('idle')
  const [result, setResult] = useState<DownloadResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [downloadMode, setDownloadMode] = useState<DownloadMode>('auto')
  const [music, setMusic] = useState<MusicPreview | null>(null)
  const [videoPreview, setVideoPreview] = useState<VideoPreview | null>(null)
  const [completedMusic, setCompletedMusic] = useState<MusicPreview | null>(null)
  const [musicFormat, setMusicFormat] = useState<'mp3' | 'wav' | 'flac'>('mp3')
  const [musicBitrate, setMusicBitrate] = useState('320')
  const [musicStep, setMusicStep] = useState('')
  const [analysisStep, setAnalysisStep] = useState('')
  const { t } = useI18n()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!url.trim()) return

    setStatus('loading')
    setResult(null)
    setErrorMsg('')
    setMusic(null)
    setVideoPreview(null)
    setCompletedMusic(null)
    setAnalysisStep(t('downloader.analysis.identifying'))

    try {
      const [inspection] = await Promise.all([
        inspectMedia(url.trim()),
        new Promise((resolve) => window.setTimeout(resolve, 850)),
      ])
      if (inspection.kind === 'music') {
        setMusic(inspection)
        setMusicFormat(inspection.formats.includes('mp3') ? 'mp3' : inspection.formats[0])
        setMusicBitrate(inspection.bitrates.includes('320') ? '320' : inspection.bitrates[0])
        setStatus('idle')
        return
      }

      setAnalysisStep(t('downloader.analysis.ready'))
      setVideoPreview(inspection)
      setStatus('idle')
    } catch {
      setStatus('error')
      setErrorMsg(t('error.connection'))
    }
  }

  async function processDownload(mode: DownloadMode, format?: string, bitrate?: string) {
    const settings = getDownloadSettings()
    
    const targetUrl = (music?.resolvedUrl || url).trim()
    const data = await requestDownload({
      url: targetUrl,
      downloadMode: mode,
      videoQuality: settings.videoQuality,
      audioFormat: format || settings.audioFormat,
      audioBitrate: bitrate || settings.audioBitrate,
      youtubeVideoCodec: settings.youtubeVideoCodec,
      filenameStyle: settings.filenameStyle,
      convertGif: settings.convertGif,
      disableMetadata: settings.disableMetadata,
      tiktokFullAudio: settings.tiktokFullAudio,
      
      ...(music && music.title ? {
        overrideMetadata: {
          title: music.title,
          artist: music.artist,
          album: music.album,
        }
      } : {}),
    })

    if (data.status === 'error') {
      setStatus('error')
      setErrorMsg(translateApiError(data.error?.code || 'error.unknown', t))
      return
    }

    setResult(data)
    setVideoPreview(null)
    if (mode === 'audio' && music) {
      setCompletedMusic(music)
      setMusic(null)
    }
    setStatus('success')
  }

  async function confirmMusic() {
    if (!music?.processable) return

    const steps = ['Identificando música…', 'Fonte encontrada', 'Preparando áudio…', 'Convertendo formato…', 'Adicionando capa e metadados…', 'Finalizando…']
    let index = 0
    setStatus('loading')
    setErrorMsg('')
    setMusicStep(steps[index])
    const interval = window.setInterval(() => {
      index = Math.min(index + 1, steps.length - 1)
      setMusicStep(steps[index])
    }, 900)

    try {
      await processDownload('audio', musicFormat, musicBitrate)
    } catch {
      setStatus('error')
      setErrorMsg(t('error.connection'))
    } finally {
      window.clearInterval(interval)
      setMusicStep('')
    }
  }

  async function confirmVideoDownload() {
    setStatus('loading')
    setErrorMsg('')
    setAnalysisStep(t('downloader.analysis.preparing'))

    try {
      await processDownload(downloadMode)
    } catch {
      setStatus('error')
      setErrorMsg(t('error.connection'))
    }
  }

  function startDownload() {
    if (!result?.url) return
    
    triggerBrowserDownload(result.url, result.filename)
  }

  function reset() {
    setUrl('')
    setStatus('idle')
    setResult(null)
    setErrorMsg('')
    setMusic(null)
    setVideoPreview(null)
    setCompletedMusic(null)
    setMusicStep('')
    setAnalysisStep('')
  }

  const showForm = (status === 'idle' || status === 'error') && !music
  const duration = music?.duration ? `${Math.floor(music.duration / 60)}:${String(music.duration % 60).padStart(2, '0')}` : '—'

  return (
    <section className="hero downloader-hero" id="top">
      <div className="container downloader-layout">
        <div className="downloader-centered">
          <div className="downloader-intro">
            <div className="eyebrow">
              <Sparkles size={12} /> {t('downloader.kicker')}
            </div>
            <h1>
              <span>{t('downloader.title.first')}</span> <em>{t('downloader.title.second')}</em>
            </h1>
            <p className="hero-description">
              {t('downloader.lead')}
            </p>
          </div>

          <div className="download-workspace">
            <img className="downloader-character" src={shappireDownload} alt="" aria-hidden="true" />
            <div className="download-workspace-header">
              <div><span>{t('downloader.workspaceLabel')}</span><strong>{t('downloader.workspaceTitle')}</strong></div>
              <LinkIcon size={17} aria-hidden="true" />
            </div>
            {music ? (
              <section className="music-preview" aria-live="polite">
                <div className="music-preview-art">{music.artwork ? <img src={music.artwork} alt={`Capa de ${music.title}`} /> : <Disc3 size={34} />}</div>
                <div className="music-preview-info"><span>{music.provider} · MÚSICA</span><h2>{music.title}</h2><p>{music.artist}</p><small>{music.album} · {duration}</small></div>
                {music.notice && <p className="music-notice">{music.notice}</p>}

                {music.processable && <>
                  <div className="music-option-group"><span>Formato</span><div>{music.formats.map((format) => <button type="button" className={musicFormat === format ? 'is-selected' : ''} onClick={() => setMusicFormat(format)} key={format}>{format.toUpperCase()}</button>)}</div></div>
                  <div className="music-option-group"><span>Qualidade</span><div>{music.bitrates.map((bitrate) => <button type="button" className={musicBitrate === bitrate ? 'is-selected' : ''} onClick={() => setMusicBitrate(bitrate)} key={bitrate}>{bitrate} kbps</button>)}</div></div>
                  {status === 'loading' ? <div className="music-progress"><Loader2 size={15} className="spin" /><span>{musicStep}</span></div> : <button type="button" className="music-process-button" onClick={() => void confirmMusic()}><Download size={16} />Processar áudio</button>}
                  {status === 'error' && <p className="form-error">{errorMsg}</p>}
                </>}
                <button type="button" className="music-back-button" onClick={reset}>Usar outro link</button>
              </section>
            ) : status === 'loading' ? (
              <section className="download-analysis" aria-live="polite">
                <div className="download-analysis-orbit"><Loader2 size={22} className="spin" /></div>
                <div>
                  <span>{t('downloader.analysis.label')}</span>
                  <h2>{t('downloader.analysis.title')}</h2>
                  <p>{analysisStep || t('downloader.analysis.identifying')}</p>
                </div>
              </section>
            ) : videoPreview && status === 'success' ? (
              <section className="download-video-preview" aria-live="polite">
                <div className="video-preview-art">
                  {videoPreview.thumbnail ? <img src={videoPreview.thumbnail} alt="" /> : <LinkIcon size={28} />}
                </div>
                <div className="video-preview-info">
                  <span>{videoPreview.provider} · {t('home.features.detected')}</span>
                  <h2 title={videoPreview.title}>{shortPreviewTitle(videoPreview.title)}</h2>
                  {videoPreview.author && <p>{videoPreview.author}</p>}
                </div>
                <div className="video-preview-actions">
                  <button type="button" className="music-process-button" onClick={() => void confirmVideoDownload()}><Download size={16} />{t('hero.download')}</button>
                  <button type="button" className="music-back-button" onClick={reset}>{t('downloader.preview.change')}</button>
                </div>
              </section>
            ) : showForm ? (
              <>
                <form className="download-form" onSubmit={submit} id="baixar">
                  <label>
                    <LinkIcon size={17} />
                    <input
                      aria-label={t('hero.inputLabel')}
                      type="url"
                      placeholder={t('hero.placeholder')}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </label>
                  <button type="submit">
                    {t('hero.process')} <ArrowRight size={16} />
                  </button>
                </form>

                <div className="download-options">
                  <ModeButton
                    active={downloadMode === 'auto'}
                    onClick={() => setDownloadMode('auto')}
                  >
                    <Sparkles size={12} /> {t('hero.auto')}
                  </ModeButton>
                  <ModeButton
                    active={downloadMode === 'audio'}
                    onClick={() => setDownloadMode('audio')}
                  >
                    ♪ {t('hero.audio')}
                  </ModeButton>
                  <ModeButton
                    active={downloadMode === 'mute'}
                    onClick={() => setDownloadMode('mute')}
                  >
                    {t('hero.mute')}
                  </ModeButton>
                </div>

                {status === 'error' && <p className="form-error">{errorMsg}</p>}
              </>
            ) : (
              <div className="download-result">
                {completedMusic?.artwork && <img className="result-thumbnail" src={completedMusic.artwork} alt={`Capa de ${completedMusic.title}`} />}
                <div className="result-info">
                  <h3>{result?.filename || t('hero.ready')}</h3>
                  <span className="result-badge">{result?.status}</span>
                </div>
                <div className="result-actions">
                  <button className="download-btn" onClick={startDownload}>
                    <Download size={16} /> {t('hero.download')}
                  </button>
                  <button className="reset-btn" onClick={reset}>
                    {t('hero.newLink')}
                  </button>
                </div>

                {result?.picker && (
                  <div className="picker-grid">
                    {result.picker.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="picker-item"
                      >
                        {item.thumb && (
                          <img src={item.thumb} alt={`Item ${i + 1}`} />
                        )}
                        <span>
                          {item.type === 'photo' ? t('hero.photo') : t('hero.video')} {i + 1}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
            <p className="download-workspace-footnote">{t('downloader.temporary')}</p>
          </div>

          {videoPreview && status !== 'loading' && (
            <section className="download-video-preview" aria-live="polite">
              <div className="video-preview-art">
                {videoPreview.thumbnail ? <img src={videoPreview.thumbnail} alt="" /> : <LinkIcon size={28} />}
              </div>
              <div className="video-preview-info">
                <span>{videoPreview.provider} · {t('home.features.detected')}</span>
                <h2 title={videoPreview.title}>{shortPreviewTitle(videoPreview.title)}</h2>
                {videoPreview.author && <p>{videoPreview.author}</p>}
              </div>
              <div className="video-preview-actions">
                <button type="button" className="music-process-button" onClick={() => void confirmVideoDownload()}><Download size={16} />{t('hero.download')}</button>
                <button type="button" className="music-back-button" onClick={reset}>{t('downloader.preview.change')}</button>
              </div>
            </section>
          )}

          <div className="downloader-intro-note"><span />{t('downloader.compatible')}</div>
        </div>
      </div>
    </section>
  )
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={`mode-btn ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function shortPreviewTitle(title: string) {
  const normalized = title.replace(/\s+/g, ' ').trim()
  return normalized.length > 42 ? `${normalized.slice(0, 41).trimEnd()}…` : normalized
}
