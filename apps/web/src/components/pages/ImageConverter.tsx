import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowRight, Check, Crop, FileImage, ImageIcon, Loader2, SlidersHorizontal, Upload, X } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactCrop, { type Crop as CropType } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useI18n } from '../../i18n'
import { API_URL } from '../../config/constants'
const MAX_FILE_SIZE = 20 * 1024 * 1024
const acceptedExtensions = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'tif', 'tiff', 'svg', 'ico', 'heic', 'heif'])

type ImageFormat = 'png' | 'jpeg' | 'webp' | 'avif' | 'gif' | 'bmp' | 'tiff' | 'ico'
type Dimensions = { width: number; height: number }
type Result = { url: string; size: number; filename: string; type: string; dimensions: Dimensions }

type FormatCategory = 'image'

const formatCategories: Array<{ id: FormatCategory; label: string; formats: Array<{ value: ImageFormat; label: string }> }> = [
  {
    id: 'image',
    label: 'Imagem',
    formats: [
      { value: 'png', label: 'PNG' },
      { value: 'jpeg', label: 'JPEG' },
      { value: 'webp', label: 'WebP' },
      { value: 'avif', label: 'AVIF' },
      { value: 'gif', label: 'GIF' },
      { value: 'ico', label: 'ICO' },
      { value: 'bmp', label: 'BMP' },
      { value: 'tiff', label: 'TIFF' },
    ],
  },
]

const imageFormats = formatCategories[0].formats

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getExtension(file: File) {
  return file.name.split('.').pop()?.toLowerCase() || ''
}

function readableType(file: File) {
  const extension = getExtension(file)
  const map: Record<string, string> = { jpg: 'JPEG', jpeg: 'JPEG', png: 'PNG', webp: 'WebP', gif: 'GIF', bmp: 'BMP', tif: 'TIFF', tiff: 'TIFF', svg: 'SVG', ico: 'ICO', heic: 'HEIC', heif: 'HEIF', avif: 'AVIF' }
  return map[extension] || extension.toUpperCase()
}

function readDimensions(url: string): Promise<Dimensions | null> {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight })
    image.onerror = () => resolve(null)
    image.src = url
  })
}

export function ImageConverter() {
  const { t } = useI18n()
  const fileInput = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [sourceUrl, setSourceUrl] = useState<string | null>(null)
  const [sourceDimensions, setSourceDimensions] = useState<Dimensions | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [format, setFormat] = useState<ImageFormat>('webp')
  const [quality, setQuality] = useState(85)
  const [resizeEnabled, setResizeEnabled] = useState(false)
  const [keepAspect, setKeepAspect] = useState(true)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [sourcePreviewFailed, setSourcePreviewFailed] = useState(false)
  const [resultPreviewFailed, setResultPreviewFailed] = useState(false)
  const [customFilename, setCustomFilename] = useState('')
  const [cropEnabled, setCropEnabled] = useState(false)
  const [crop, setCrop] = useState<CropType>()
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => () => {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl)
  }, [sourceUrl])

  useEffect(() => () => {
    if (result) URL.revokeObjectURL(result.url)
  }, [result])

  function clearResult() {
    if (result) URL.revokeObjectURL(result.url)
    setResult(null)
    setResultPreviewFailed(false)
  }

  function selectFile(nextFile?: File) {
    if (!nextFile || nextFile.size > MAX_FILE_SIZE || !acceptedExtensions.has(getExtension(nextFile))) {
      setError(t('image.invalid'))
      return
    }

    if (sourceUrl) URL.revokeObjectURL(sourceUrl)
    clearResult()
    const nextUrl = URL.createObjectURL(nextFile)
    setFile(nextFile)
    setSourceUrl(nextUrl)
    setSourceDimensions(null)
    setSourcePreviewFailed(false)
    setResizeEnabled(false)
    setCropEnabled(false)
    setError('')
    const nameWithoutExt = nextFile.name.replace(/\.[^.]+$/, '')
    setCustomFilename(nameWithoutExt)

    void readDimensions(nextUrl).then((dimensions) => {
      if (!dimensions) return
      setSourceDimensions(dimensions)
      setWidth(dimensions.width)
      setHeight(dimensions.height)
    })
  }

  function reset() {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl)
    clearResult()
    setFile(null)
    setSourceUrl(null)
    setSourceDimensions(null)
    setSourcePreviewFailed(false)
    setResizeEnabled(false)
    setError('')
    if (fileInput.current) fileInput.current.value = ''
  }

  function changeWidth(nextWidth: number) {
    setWidth(nextWidth)
    if (keepAspect && sourceDimensions && nextWidth > 0) setHeight(Math.max(1, Math.round(nextWidth * sourceDimensions.height / sourceDimensions.width)))
  }

  function changeHeight(nextHeight: number) {
    setHeight(nextHeight)
    if (keepAspect && sourceDimensions && nextHeight > 0) setWidth(Math.max(1, Math.round(nextHeight * sourceDimensions.width / sourceDimensions.height)))
  }

  async function convert() {
    if (!file || (resizeEnabled && (!width || !height))) return
    setIsConverting(true)
    setError('')
    clearResult()

    try {
      const payload = new FormData()
      payload.append('image', file)
      payload.append('format', format)
      payload.append('quality', String(quality))
      payload.append('resizeEnabled', String(resizeEnabled))
      payload.append('keepAspect', String(keepAspect))
      payload.append('width', String(width))
      payload.append('height', String(height))
      payload.append('cropEnabled', String(cropEnabled && !!crop))
      if (cropEnabled && crop && sourceDimensions) {
        
        const pixelCropX = Math.round((crop.x / 100) * sourceDimensions.width)
        const pixelCropY = Math.round((crop.y / 100) * sourceDimensions.height)
        const pixelCropW = Math.round((crop.width / 100) * sourceDimensions.width)
        const pixelCropH = Math.round((crop.height / 100) * sourceDimensions.height)
        payload.append('cropX', String(pixelCropX))
        payload.append('cropY', String(pixelCropY))
        payload.append('cropW', String(pixelCropW))
        payload.append('cropH', String(pixelCropH))
      } else {
        payload.append('cropX', '0')
        payload.append('cropY', '0')
        payload.append('cropW', '0')
        payload.append('cropH', '0')
      }
      if (customFilename.trim()) payload.append('filename', customFilename.trim())

      const response = await fetch(`${API_URL}/tools/image-converter`, { method: 'POST', body: payload })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error || t('image.invalid'))
      }

      const blob = await response.blob()
      const disposition = response.headers.get('content-disposition') || ''
      const filename = disposition.match(/filename="?([^";]+)"?/i)?.[1] || `shappire-image.${format === 'jpeg' ? 'jpg' : format}`
      const originalDimensions = {
        width: Number(response.headers.get('x-original-width') || sourceDimensions?.width || 0),
        height: Number(response.headers.get('x-original-height') || sourceDimensions?.height || 0),
      }
      if (!sourceDimensions && originalDimensions.width && originalDimensions.height) setSourceDimensions(originalDimensions)
      setResult({
        url: URL.createObjectURL(blob),
        size: Number(response.headers.get('x-output-size') || blob.size),
        filename,
        type: blob.type,
        dimensions: { width: Number(response.headers.get('x-output-width') || 0), height: Number(response.headers.get('x-output-height') || 0) },
      })
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t('image.invalid'))
    } finally {
      setIsConverting(false)
    }
  }

  function download() {
    if (!result) return
    const anchor = document.createElement('a')
    anchor.href = result.url
    anchor.download = result.filename
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }

  const savings = result && file ? Math.round((1 - result.size / file.size) * 100) : null

  return (
    <section className="container image-converter-section">
      <div className="image-converter-heading">
        <span>{t('image.kicker')}</span>
        <h1>{t('image.title')}</h1>
        <p>{t('image.lead')}</p>
      </div>

      {!file ? (
        <motion.div
          className={`image-dropzone${isDragging ? ' is-dragging' : ''}`}
          onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => { event.preventDefault(); setIsDragging(false); selectFile(event.dataTransfer.files[0]) }}
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
          <motion.strong
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >{t('image.drop')}</motion.strong>
          <small>{t('image.dropHint')}</small>
          <span className="image-format-list">{t('image.formats')}: PNG · JPG · WebP · GIF · SVG · BMP · TIFF · ICO</span>
          <motion.button
            type="button"
            onClick={() => fileInput.current?.click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          ><Upload size={14} /> {t('image.select')}</motion.button>
          <input ref={fileInput} type="file" accept=".png,.jpg,.jpeg,.webp,.gif,.bmp,.tif,.tiff,.svg,.ico,.heic,.heif,image/png,image/jpeg,image/webp,image/gif,image/bmp,image/tiff,image/svg+xml,image/x-icon" onChange={(event) => selectFile(event.target.files?.[0])} />
        </motion.div>
      ) : (
        <div className="image-workspace">
          <div className="image-source-card">
            <div className="image-source-preview">
              {sourceUrl && !sourcePreviewFailed ? (
                cropEnabled ? (
                  <ReactCrop crop={crop} onChange={(_, c) => setCrop(c)}>
                    <img ref={imgRef} src={sourceUrl} alt="" onError={() => setSourcePreviewFailed(true)} />
                  </ReactCrop>
                ) : (
                  <img src={sourceUrl} alt="" onError={() => setSourcePreviewFailed(true)} />
                )
              ) : (
                <p>{t('image.previewUnavailable')}</p>
              )}
            </div>
            <div className="image-source-info">
              <div className="image-source-title"><FileImage size={16} /><span>{file.name}</span><button type="button" onClick={reset} aria-label={t('image.remove')}><X size={14} /></button></div>
              <dl><div><dt>{t('image.type')}</dt><dd>{readableType(file)}</dd></div><div><dt>{t('image.original')}</dt><dd>{formatBytes(file.size)}</dd></div><div><dt>{t('image.dimensions')}</dt><dd>{sourceDimensions ? `${sourceDimensions.width} × ${sourceDimensions.height}` : '—'}</dd></div></dl>
            </div>
          </div>

          <section className="image-settings-panel">
            <header><span>{t('image.settings')}</span><ImageIcon size={15} /></header>
            <div className="image-output-stage">
              <div><span>{t('image.output')}</span><strong>{readableType(file)} <ArrowRight size={13} /> {imageFormats.find((option) => option.value === format)?.label}</strong></div>
              <div className="image-output-grid">{imageFormats.map((option) => <button key={option.value} type="button" className={format === option.value ? 'is-selected' : ''} onClick={() => setFormat(option.value)}>{option.label}</button>)}</div>
            </div>
            <div className="image-quality-control"><label htmlFor="image-quality">{t('image.quality')} <b>{quality}%</b></label><input id="image-quality" type="range" min="1" max="100" value={quality} onChange={(event) => setQuality(Number(event.target.value))} /><div><span>0%</span><span>100%</span></div></div>
            <div className="image-extra-options"><label><input type="checkbox" checked={keepAspect} onChange={(event) => setKeepAspect(event.target.checked)} /><span>{t('image.keepAspect')}</span></label><label><input type="checkbox" checked={resizeEnabled} onChange={(event) => setResizeEnabled(event.target.checked)} /><span>{t('image.resize')}</span></label><label><input type="checkbox" checked={cropEnabled} onChange={(event) => { setCropEnabled(event.target.checked); if (!event.target.checked) setCrop(undefined) }} /><span><Crop size={12} /> {t('image.crop')}</span></label></div>
            {resizeEnabled && <div className="image-dimension-controls"><label>{t('image.width')}<input type="number" min="1" max="10000" value={width || ''} onChange={(event) => changeWidth(Number(event.target.value))} /></label><span>×</span><label>{t('image.height')}<input type="number" min="1" max="10000" value={height || ''} onChange={(event) => changeHeight(Number(event.target.value))} /></label></div>}

            {cropEnabled && <p className="image-crop-hint">{t('image.cropHint')}</p>}

            <div className="image-filename-control"><label>{t('image.filename')}<input type="text" value={customFilename} onChange={(e) => setCustomFilename(e.target.value)} placeholder={t('image.filenamePlaceholder')} /></label></div>

            <button className="image-convert-button" type="button" onClick={convert} disabled={isConverting || (resizeEnabled && (!width || !height))}>{isConverting ? <><Loader2 className="spin" size={15} /> {t('image.converting')}</> : <><SlidersHorizontal size={15} /> {t('image.convert')}</>}</button>
          </section>

          {isConverting && <div className="image-processing"><Loader2 className="spin" size={16} /> {t('image.processing')}</div>}
          {error && <p className="image-error">{error}</p>}
          {result && <section className="image-result-card"><header><span><Check size={14} /> {t('image.ready')}</span>{savings !== null && <small>{savings > 0 ? `${savings}% ${t('image.savings')}` : '—'}</small>}</header><div className="image-comparison"><Preview label={t('image.before')} src={sourceUrl} size={file.size} dimensions={sourceDimensions} unavailable={sourcePreviewFailed} onError={() => setSourcePreviewFailed(true)} fallback={t('image.previewUnavailable')} /><Preview label={t('image.after')} src={result.url} size={result.size} dimensions={result.dimensions} unavailable={resultPreviewFailed} onError={() => setResultPreviewFailed(true)} fallback={t('image.previewUnavailable')} /></div><footer><button type="button" onClick={download}><ArrowDownToLine size={15} /> {t('image.download')}</button><button type="button" className="image-reset" onClick={reset}>{t('image.reset')}</button></footer></section>}
        </div>
      )}
      {!file && error && <p className="image-error">{error}</p>}
    </section>
  )
}

function Preview({ label, size, dimensions, src, unavailable, onError, fallback }: { label: string; size: number; dimensions: Dimensions | null; src: string | null; unavailable: boolean; onError: () => void; fallback: string }) {
  return <article className="image-preview"><header><span>{label}</span><small>{formatBytes(size)}</small></header><div>{src && !unavailable ? <img src={src} alt="" onError={onError} /> : <p>{fallback}</p>}</div><footer>{dimensions ? `${dimensions.width} × ${dimensions.height}` : '—'}</footer></article>
}
