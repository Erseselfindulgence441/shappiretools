import { ExternalLink, ImagePlus, Loader2, Search, ShieldCheck, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { DragEvent } from 'react'
import { API_URL } from '../../config/constants'
import { useI18n } from '../../i18n'

const maxSize = 10 * 1024 * 1024
const extensions = /\.(jpe?g|png|webp)$/i

export function GoogleLensSearch() {
  const { t } = useI18n()
  const input = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lensUrl, setLensUrl] = useState('')

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  function select(next?: File) {
    if (!next) return
    if (!extensions.test(next.name) || next.size > maxSize) { setError(t('googleLens.errors.unsupported_image')); return }
    if (preview) URL.revokeObjectURL(preview)
    setFile(next); setPreview(URL.createObjectURL(next)); setError(''); setLensUrl('')
  }

  function drop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault(); setDragging(false); select(event.dataTransfer.files?.[0])
  }

  function clear() {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null); setPreview(''); setError(''); setLensUrl('')
    if (input.current) input.current.value = ''
  }

  async function search() {
    if (!file) return
    setLoading(true); setError(''); setLensUrl('')
    try {
      const form = new FormData(); form.append('image', file)
      const response = await fetch(`${API_URL}/tools/google-lens`, { method: 'POST', body: form })
      const body = await response.json().catch(() => null)
      if (!response.ok) {
        const code = body?.error?.code as string | undefined
        throw new Error(code ? t(`googleLens.errors.${code}`) : (body?.error?.message || t('googleLens.errors.internal_error')))
      }
      setLensUrl(body.lensUrl)
      window.open(body.lensUrl, '_blank', 'noopener,noreferrer')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t('googleLens.errors.internal_error'))
    } finally { setLoading(false) }
  }

  return <section className="container google-lens-section">
    <div className="google-lens-heading"><span>{t('googleLens.kicker')}</span><h1>{t('googleLens.title')}</h1><p>{t('googleLens.lead')}</p></div>
    {!file ? <button className={`google-lens-dropzone${dragging ? ' is-dragging' : ''}`} type="button" onClick={() => input.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={drop}>
      <ImagePlus size={30} /><strong>{t('googleLens.dropTitle')}</strong><span>{t('googleLens.dropLead')}</span><small>{t('googleLens.formats')}</small><em>{t('googleLens.choose')}</em>
    </button> : <div className="google-lens-selected">
      <div className="google-lens-preview"><img src={preview} alt="" /><button onClick={clear} type="button" aria-label={t('googleLens.clear')}><X size={16} /></button></div>
      <div><strong>{file.name}</strong><small>{(file.size / 1024 / 1024).toFixed(1)} MB</small></div>
      <button className="google-lens-search" type="button" disabled={loading} onClick={() => void search()}>{loading ? <><Loader2 className="spin" size={16} /> {t('googleLens.loading')}</> : <><Search size={16} /> {t('googleLens.search')}</>}</button>
    </div>}
    <input ref={input} hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => select(event.target.files?.[0])} />
    {error && <p className="google-lens-error">{error}</p>}
    {lensUrl && <a className="google-lens-open" href={lensUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} />{t('googleLens.open')}</a>}
    <div className="google-lens-privacy"><ShieldCheck size={16} /><p>{t('googleLens.privacy')}</p></div>
  </section>
}
