import { Check, Copy, ImageUp } from 'lucide-react'
import { useRef, useState } from 'react'
import { useI18n } from '../../i18n'

function toHex(value: number) { return value.toString(16).padStart(2, '0') }

export function PaletteGenerator() {
  const { t } = useI18n()
  const input = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [colors, setColors] = useState<string[]>([])
  const [copied, setCopied] = useState('')

  function load(file?: File) {
    if (!file?.type.startsWith('image/')) return
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const scale = Math.min(160 / image.naturalWidth, 160 / image.naturalHeight, 1)
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
      const context = canvas.getContext('2d'); if (!context) return
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      const buckets = new Map<string, number>()
      const data = context.getImageData(0, 0, canvas.width, canvas.height).data
      for (let index = 0; index < data.length; index += 16) { const r = Math.round(data[index] / 32) * 32; const g = Math.round(data[index + 1] / 32) * 32; const b = Math.round(data[index + 2] / 32) * 32; const key = `#${toHex(Math.min(255, r))}${toHex(Math.min(255, g))}${toHex(Math.min(255, b))}`; buckets.set(key, (buckets.get(key) || 0) + 1) }
      setColors([...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([color]) => color))
      setName(file.name); URL.revokeObjectURL(image.src)
    }
    image.src = URL.createObjectURL(file)
  }

  async function copy(color: string) { await navigator.clipboard.writeText(color); setCopied(color); window.setTimeout(() => setCopied(''), 900) }

  return <section className="container palette-section"><div className="palette-heading"><span>{t('palette.kicker')}</span><h1>{t('palette.title')}</h1><p>{t('palette.lead')}</p></div><button className="palette-upload" type="button" onClick={() => input.current?.click()}><ImageUp size={24} /><strong>{t('palette.upload')}</strong><small>{t('palette.uploadHint')}</small></button>{colors.length > 0 && <section className="palette-result"><header><span>{t('palette.image')}: <b>{name}</b></span></header><div className="palette-colors">{colors.map((color) => <button style={{ background: color }} type="button" key={color} onClick={() => void copy(color)}><span>{color}</span>{copied === color ? <Check size={14} /> : <Copy size={14} />}</button>)}</div><div className="palette-gradient" style={{ background: `linear-gradient(115deg, ${colors.join(', ')})` }} /></section>}<input hidden ref={input} type="file" accept="image/*" onChange={(event) => load(event.target.files?.[0])} /></section>
}
