import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowRight, Film, Loader2, Music, Upload, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '../../i18n'
import { API_URL } from '../../config/constants'
const MAX_FILE_SIZE = 200 * 1024 * 1024

type ConvertMode = 'convert' | 'audio' | 'compress' | 'resize'
type OutputFormat = 'mp4' | 'webm' | 'mkv' | 'avi' | 'mov' | 'flv' | 'gif' | 'mp3' | 'wav' | 'ogg' | 'flac' | 'aac' | 'opus'
type Result = { url: string; size: number; filename: string }
type Crop = { x: number; y: number; width: number; height: number }
type CropGesture = { action: 'move' | 'resize'; startX: number; startY: number; crop: Crop; stageWidth: number; stageHeight: number }

const videoFormats: Array<{ value: OutputFormat; label: string }> = [
  { value: 'mp4', label: 'MP4' },
  { value: 'webm', label: 'WebM' },
  { value: 'mkv', label: 'MKV' },
  { value: 'avi', label: 'AVI' },
  { value: 'mov', label: 'MOV' },
  { value: 'flv', label: 'FLV' },
  { value: 'gif', label: 'GIF' },
]

const audioFormats: Array<{ value: OutputFormat; label: string }> = [
  { value: 'mp3', label: 'MP3' },
  { value: 'wav', label: 'WAV' },
  { value: 'ogg', label: 'OGG' },
  { value: 'flac', label: 'FLAC' },
  { value: 'aac', label: 'AAC' },
  { value: 'opus', label: 'OPUS' },
]

const modes: Array<{ value: ConvertMode; icon: typeof Film }> = [
  { value: 'convert', icon: ArrowRight },
  { value: 'audio', icon: Music },
  { value: 'compress', icon: ArrowDownToLine },
  { value: 'resize', icon: Film },
]

const acceptedExtensions = new Set(['mp4', 'webm', 'mkv', 'avi', 'mov', 'flv', 'ogg', 'mp3', 'wav', 'flac', 'aac', 'm4a', 'opus'])

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getExtension(file: File) {
  return file.name.split('.').pop()?.toLowerCase() || ''
}

export function MediaConverter() {
  const { t } = useI18n()
  const fileInput = useRef<HTMLInputElement>(null)
  const previewVideo = useRef<HTMLVideoElement>(null)
  const cropGesture = useRef<CropGesture | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [sourceUrl, setSourceUrl] = useState<string | null>(null)
  const [mode, setMode] = useState<ConvertMode>('convert')
  const [format, setFormat] = useState<OutputFormat>('mp4')
  const [result, setResult] = useState<Result | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [customFilename, setCustomFilename] = useState('')

  const [crf, setCrf] = useState(28)
  const [audioBitrate, setAudioBitrate] = useState('128')
  const [crop, setCrop] = useState<Crop>({ x: 8, y: 8, width: 84, height: 84 })

  useEffect(() => () => {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl)
  }, [sourceUrl])

  function selectFile(nextFile?: File) {
    if (!nextFile || nextFile.size > MAX_FILE_SIZE || !acceptedExtensions.has(getExtension(nextFile))) {
      setError(t('media.invalid'))
      return
    }
    if (sourceUrl) URL.revokeObjectURL(sourceUrl)
    setFile(nextFile)
    setSourceUrl(URL.createObjectURL(nextFile))
    setCrop({ x: 8, y: 8, width: 84, height: 84 })
    setCustomFilename(nextFile.name.replace(/\.[^.]+$/, ''))
    setError('')
    setResult(null)
  }

  function reset() {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl)
    setFile(null)
    setSourceUrl(null)
    setResult(null)
    setError('')
    if (fileInput.current) fileInput.current.value = ''
  }

  async function convert() {
    if (!file) return
    setIsConverting(true)
    setError('')
    if (result) { URL.revokeObjectURL(result.url); setResult(null) }

    try {
      const payload = new FormData()
      payload.append('media', file)
      payload.append('format', format)
      payload.append('mode', mode)
      if (customFilename.trim()) payload.append('filename', customFilename.trim())

      if (mode === 'compress') payload.append('crf', String(crf))
      if (mode === 'resize') {
        payload.append('cropX', String(crop.x))
        payload.append('cropY', String(crop.y))
        payload.append('cropWidth', String(crop.width))
        payload.append('cropHeight', String(crop.height))
      }
      if (mode === 'audio') payload.append('audioBitrate', audioBitrate)

      const response = await fetch(`${API_URL}/tools/media-converter`, { method: 'POST', body: payload })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error || t('media.failed'))
      }

      const blob = await response.blob()
      const disposition = response.headers.get('content-disposition') || ''
      const filename = disposition.match(/filename="?([^";]+)"?/i)?.[1] || `shappire-media.${format}`

      setResult({
        url: URL.createObjectURL(blob),
        size: blob.size,
        filename,
      })
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t('media.failed'))
    } finally {
      setIsConverting(false)
    }
  }

  function download() {
    if (!result) return
    const a = document.createElement('a')
    a.href = result.url
    a.download = result.filename
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const currentFormats = (mode === 'audio') ? audioFormats : videoFormats
  const isAudioFile = file ? ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg', 'opus'].includes(getExtension(file)) : false
  const canEditPreview = !isAudioFile && mode === 'resize'

  function beginCrop(event: React.PointerEvent<HTMLElement>, action: CropGesture['action']) {
    event.preventDefault()
    event.stopPropagation()
    const stage = event.currentTarget.closest('.media-preview-visual')
    if (!stage) return
    const bounds = stage.getBoundingClientRect()
    cropGesture.current = { action, startX: event.clientX, startY: event.clientY, crop, stageWidth: bounds.width, stageHeight: bounds.height }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function updateCrop(event: React.PointerEvent<HTMLDivElement>) {
    const gesture = cropGesture.current
    if (!gesture) return
    const deltaX = ((event.clientX - gesture.startX) / gesture.stageWidth) * 100
    const deltaY = ((event.clientY - gesture.startY) / gesture.stageHeight) * 100

    if (gesture.action === 'move') {
      setCrop({
        ...gesture.crop,
        x: Math.max(0, Math.min(100 - gesture.crop.width, gesture.crop.x + deltaX)),
        y: Math.max(0, Math.min(100 - gesture.crop.height, gesture.crop.y + deltaY)),
      })
      return
    }

    setCrop({
      ...gesture.crop,
      width: Math.max(20, Math.min(100 - gesture.crop.x, gesture.crop.width + deltaX)),
      height: Math.max(20, Math.min(100 - gesture.crop.y, gesture.crop.height + deltaY)),
    })
  }

  function endCrop() {
    cropGesture.current = null
  }

  return (
    <section className="container media-converter-section">
      <div className="media-converter-heading">
        <span>{t('media.kicker')}</span>
        <h1>{t('media.title')}</h1>
        <p>{t('media.lead')}</p>
      </div>

      {!file ? (
        <motion.div
          className={`media-dropzone${isDragging ? ' is-dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); selectFile(e.dataTransfer.files[0]) }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.35)' }}
        >
          <motion.div
            className="dropzone-icon-wrap"
            animate={isDragging ? { scale: 1.2, rotate: -5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Upload size={32} />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>{t('media.drop')}</motion.p>
          <small>{t('media.dropHint')}</small>
          <motion.button
            type="button"
            onClick={() => fileInput.current?.click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload size={14} /> {t('media.select')}
          </motion.button>
          <input ref={fileInput} type="file" accept=".mp4,.webm,.mkv,.avi,.mov,.flv,.ogg,.mp3,.wav,.flac,.aac,.m4a,.opus" onChange={(e) => selectFile(e.target.files?.[0])} />
        </motion.div>
      ) : (
        <div className="media-workspace">
          <div className="media-file-card">
            <span className="media-file-kicker">{t('media.fileReady')}</span>
            <div className="media-file-info">
              <Film size={20} />
              <div>
                <strong>{file.name}</strong>
                <small>{formatBytes(file.size)} · {getExtension(file).toUpperCase()}</small>
              </div>
              <button type="button" onClick={reset} aria-label={t('media.remove')}><X size={14} /></button>
            </div>
            <div className="media-file-summary"><span>{getExtension(file).toUpperCase()}</span><i /> <span>{formatBytes(file.size)}</span><i /> <span>{t('media.readyToConvert')}</span></div>
          </div>

          {sourceUrl && <div className="media-preview-card">
            {isAudioFile ? <audio controls src={sourceUrl} /> : <>
              <div className={`media-preview-visual${canEditPreview ? ' is-editing' : ''}`} onPointerMove={updateCrop} onPointerUp={endCrop} onPointerCancel={endCrop}>
                <video ref={previewVideo} controls preload="metadata" src={sourceUrl} />
                {canEditPreview && <div className="media-crop-frame" style={{ left: `${crop.x}%`, top: `${crop.y}%`, width: `${crop.width}%`, height: `${crop.height}%` }} onPointerDown={(event) => beginCrop(event, 'move')}>
                  <span className="media-crop-handle" onPointerDown={(event) => beginCrop(event, 'resize')} />
                </div>}
              </div>
            </>}
          </div>}

          <section className="media-settings-panel">
            <header><div><span>{t('media.chooseAction')}</span><small>{t('media.chooseActionLead')}</small></div></header>

            <div className="media-modes">
              {modes.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  className={mode === m.value ? 'is-selected' : ''}
                  onClick={() => {
                    setMode(m.value)
                    setFormat(m.value === 'audio' ? 'mp3' : 'mp4')
                  }}
                >
                  <m.icon size={15} />
                  <span><strong>{t(`media.mode.${m.value}`)}</strong><small>{t(`media.mode.${m.value}.description`)}</small></span>
                </button>
              ))}
            </div>

            <div className="media-format-section">
                <label><span>{t('media.outputFormat')}</span><strong>{getExtension(file).toUpperCase()} <ArrowRight size={12} /> {format.toUpperCase()}</strong></label>
                <div className="media-format-grid">
                  {currentFormats.map((f) => (
                    <button key={f.value} type="button" className={format === f.value ? 'is-selected' : ''} onClick={() => setFormat(f.value)}>
                      {f.label}
                    </button>
                  ))}
                </div>
            </div>

            {mode === 'compress' && (
              <div className="media-option">
                <label>{t('media.compression')} (CRF): <b>{crf}</b></label>
                <input type="range" min="0" max="51" value={crf} onChange={(e) => setCrf(Number(e.target.value))} />
                <small>{t('media.compressionHint')}</small>
              </div>
            )}

            {mode === 'audio' && (
              <div className="media-option">
                <label>{t('media.audioBitrate')} (kbps)</label>
                <input type="text" value={audioBitrate} onChange={(e) => setAudioBitrate(e.target.value)} placeholder="128" />
              </div>
            )}

            <div className="media-filename">
              <label>{t('media.filename')}</label>
              <input type="text" value={customFilename} onChange={(e) => setCustomFilename(e.target.value)} placeholder="nome-do-arquivo" />
            </div>

            <button className="media-convert-button" type="button" onClick={convert} disabled={isConverting}>
              {isConverting ? <><Loader2 className="spin" size={15} /> {t('media.converting')}</> : <><Film size={15} /> {t('media.convert')}</>}
            </button>
          </section>

          {error && <p className="media-error">{error}</p>}

          {result && (
            <div className="media-result">
              <strong>{result.filename}</strong>
              <small>{formatBytes(result.size)}</small>
              <button type="button" onClick={download}><ArrowDownToLine size={15} /> {t('media.download')}</button>
              <button type="button" className="media-reset" onClick={reset}>{t('media.reset')}</button>
            </div>
          )}
        </div>
      )}
      {!file && error && <p className="media-error">{error}</p>}
    </section>
  )
}
