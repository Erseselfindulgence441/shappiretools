import { ArrowDownToLine, ChevronLeft, ChevronRight, FilePlus2, Files, RotateCw, Search, ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { PDFDocument, degrees } from 'pdf-lib'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { useI18n } from '../../i18n'

GlobalWorkerOptions.workerSrc = workerUrl

type PdfFile = { id: string; name: string; bytes: ArrayBuffer; pages: number }

function download(bytes: Uint8Array | Blob, filename: string, type = 'application/pdf') {
  const url = URL.createObjectURL(bytes instanceof Blob ? bytes : new Blob([bytes], { type }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function PDFTools() {
  const { t } = useI18n()
  const input = useRef<HTMLInputElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [files, setFiles] = useState<PdfFile[]>([])
  const [activeId, setActiveId] = useState('')
  const [page, setPage] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [order, setOrder] = useState<number[]>([])
  const [query, setQuery] = useState('')
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  const active = files.find((file) => file.id === activeId)

  async function selectFiles(list?: FileList | null) {
    if (!list?.length) return
    const next: PdfFile[] = []
    for (const file of Array.from(list)) {
      if (file.type !== 'application/pdf' || file.size > 40 * 1024 * 1024) continue
      const bytes = await file.arrayBuffer()
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
      next.push({ id: crypto.randomUUID(), name: file.name, bytes, pages: doc.getPageCount() })
    }
    if (!next.length) return
    setFiles((items) => [...items, ...next])
    setActiveId(next[0].id)
    setPage(1)
    setOrder(Array.from({ length: next[0].pages }, (_, index) => index))
  }

  useEffect(() => {
    if (!active || !canvas.current) return
    let cancelled = false
    void (async () => {
      const pdf = await getDocument({ data: new Uint8Array(active.bytes.slice(0)) }).promise
      const current = await pdf.getPage(page)
      const viewport = current.getViewport({ scale: zoom, rotation })
      const target = canvas.current
      if (!target || cancelled) return
      target.width = viewport.width
      target.height = viewport.height
      const context = target.getContext('2d')
      if (!context) return
      await current.render({ canvas: target, canvasContext: context, viewport }).promise
      const content = await current.getTextContent()
      if (!cancelled) setText(content.items.map((item) => 'str' in item ? item.str : '').join(' '))
    })().catch(() => setStatus(t('pdf.failed')))
    return () => { cancelled = true }
  }, [active, page, rotation, t, zoom])

  async function exportPages() {
    if (!active) return
    const source = await PDFDocument.load(active.bytes.slice(0), { ignoreEncryption: true })
    const output = await PDFDocument.create()
    const copied = await output.copyPages(source, order)
    copied.forEach((item) => { if (rotation) item.setRotation(degrees(rotation)); output.addPage(item) })
    download(await output.save(), `shappire-${active.name}`)
  }

  async function mergeFiles() {
    if (files.length < 2) return
    const output = await PDFDocument.create()
    for (const file of files) {
      const source = await PDFDocument.load(file.bytes.slice(0), { ignoreEncryption: true })
      const copied = await output.copyPages(source, source.getPageIndices())
      copied.forEach((item) => output.addPage(item))
    }
    download(await output.save(), 'shappire-merged.pdf')
  }

  function movePage(from: number, to: number) {
    setOrder((items) => {
      const next = [...items]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    })
  }

  return <section className="container pdf-tools-section">
    <div className="pdf-tools-heading"><span>{t('pdf.kicker')}</span><h1>{t('pdf.title')}</h1><p>{t('pdf.lead')}</p></div>
    {!files.length ? <button className="pdf-dropzone" type="button" onClick={() => input.current?.click()}><FilePlus2 size={28} /><strong>{t('pdf.open')}</strong><small>{t('pdf.openHint')}</small></button> : <div className="pdf-workspace">
      <aside className="pdf-sidebar"><button type="button" onClick={() => input.current?.click()}><FilePlus2 size={15} /> {t('pdf.add')}</button>{files.map((file) => <button key={file.id} type="button" className={activeId === file.id ? 'is-active' : ''} onClick={() => { setActiveId(file.id); setPage(1); setOrder(Array.from({ length: file.pages }, (_, index) => index)) }}><Files size={14} /><span>{file.name}</span><small>{file.pages}</small></button>)}</aside>
      <div className="pdf-viewer"><div className="pdf-toolbar"><button type="button" onClick={() => setZoom((value) => Math.max(.55, value - .15))}><ZoomOut size={15} /></button><button type="button" onClick={() => setZoom((value) => Math.min(2.2, value + .15))}><ZoomIn size={15} /></button><button type="button" onClick={() => setRotation((value) => (value + 90) % 360)}><RotateCw size={15} /></button><label><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('pdf.search')} /></label><button type="button" onClick={() => void exportPages()}><ArrowDownToLine size={15} /> {t('pdf.save')}</button></div><div className="pdf-canvas-wrap"><canvas ref={canvas} /></div><div className="pdf-pager"><button type="button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft size={15} /></button><span>{page} / {active?.pages}</span><button type="button" disabled={page === active?.pages} onClick={() => setPage((value) => value + 1)}><ChevronRight size={15} /></button></div>{query && <p className="pdf-search-result">{text.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ? t('pdf.found') : t('pdf.notFound')}</p>}</div>
      <aside className="pdf-pages"><header>{t('pdf.pages')}</header>{order.map((sourceIndex, index) => <button draggable key={`${sourceIndex}-${index}`} type="button" className={page === sourceIndex + 1 ? 'is-active' : ''} onDragStart={(event) => event.dataTransfer.setData('text/plain', String(index))} onDragOver={(event) => event.preventDefault()} onDrop={(event) => movePage(Number(event.dataTransfer.getData('text/plain')), index)} onClick={() => setPage(sourceIndex + 1)}><span>{index + 1}</span><small>{t('pdf.page')} {sourceIndex + 1}</small></button>)}<button className="pdf-merge" type="button" disabled={files.length < 2} onClick={() => void mergeFiles()}>{t('pdf.merge')}</button></aside>
    </div>}
    {status && <p className="pdf-error">{status}</p>}
    <input ref={input} hidden type="file" accept="application/pdf,.pdf" multiple onChange={(event) => void selectFiles(event.target.files)} />
  </section>
}
