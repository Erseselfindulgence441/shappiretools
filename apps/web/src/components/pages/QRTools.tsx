import { Check, Copy, Download, ImageUp, ScanLine } from 'lucide-react'
import jsQR from 'jsqr'
import QRCode from 'qrcode'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '../../i18n'

type Mode = 'text' | 'link' | 'wifi' | 'contact'

async function copy(value: string) { await navigator.clipboard.writeText(value) }

export function QRTools() {
  const { t } = useI18n()
  const [mode, setMode] = useState<Mode>('link')
  const [value, setValue] = useState('https://shappire.tools')
  const [wifi, setWifi] = useState({ ssid: '', password: '', security: 'WPA' })
  const [contact, setContact] = useState({ name: '', phone: '', email: '' })
  const [qr, setQr] = useState('')
  const [decoded, setDecoded] = useState('')
  const [copied, setCopied] = useState(false)
  const reader = useRef<HTMLInputElement>(null)

  const payload = useMemo(() => {
    if (mode === 'wifi') return `WIFI:T:${wifi.security};S:${wifi.ssid};P:${wifi.password};;`
    if (mode === 'contact') return `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL:${contact.phone}\nEMAIL:${contact.email}\nEND:VCARD`
    return value
  }, [contact, mode, value, wifi])

  useEffect(() => { void QRCode.toDataURL(payload || ' ', { width: 640, margin: 2, color: { dark: '#111111', light: '#f4f4f4' } }).then(setQr) }, [payload])

  async function readImage(file?: File) {
    if (!file) return
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const context = canvas.getContext('2d')
      if (!context) return
      context.drawImage(image, 0, 0)
      const code = jsQR(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height)
      setDecoded(code?.data || t('qr.notFound'))
      URL.revokeObjectURL(image.src)
    }
    image.src = URL.createObjectURL(file)
  }

  function download() { const anchor = document.createElement('a'); anchor.href = qr; anchor.download = 'shappire-qr.png'; anchor.click() }
  async function copyPayload() { await copy(payload); setCopied(true); window.setTimeout(() => setCopied(false), 1000) }

  return <section className="container qr-tools-section">
    <div className="qr-tools-heading"><span>{t('qr.kicker')}</span><h1>{t('qr.title')}</h1><p>{t('qr.lead')}</p></div>
    <div className="qr-workspace"><div className="qr-builder"><div className="qr-mode-tabs">{(['text', 'link', 'wifi', 'contact'] as Mode[]).map((item) => <button type="button" key={item} className={mode === item ? 'is-active' : ''} onClick={() => setMode(item)}>{t(`qr.${item}`)}</button>)}</div>
      {(mode === 'text' || mode === 'link') && <textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder={t(`qr.${mode}Placeholder`)} />}
      {mode === 'wifi' && <div className="qr-fields"><input value={wifi.ssid} onChange={(event) => setWifi({ ...wifi, ssid: event.target.value })} placeholder="WiFi" /><input value={wifi.password} onChange={(event) => setWifi({ ...wifi, password: event.target.value })} placeholder={t('qr.password')} /><select value={wifi.security} onChange={(event) => setWifi({ ...wifi, security: event.target.value })}><option>WPA</option><option>WEP</option><option>nopass</option></select></div>}
      {mode === 'contact' && <div className="qr-fields"><input value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} placeholder={t('qr.name')} /><input value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} placeholder={t('qr.phone')} /><input value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} placeholder="email@exemplo.com" /></div>}
      <div className="qr-actions"><button type="button" onClick={copyPayload}>{copied ? <Check size={15} /> : <Copy size={15} />}{t('qr.copy')}</button><button type="button" onClick={download}><Download size={15} />{t('qr.download')}</button></div>
    </div><div className="qr-preview"><img src={qr} alt="QR Code" /><span>{t('qr.preview')}</span></div></div>
    <div className="qr-lower"><section className="qr-reader"><header><ScanLine size={17} />{t('qr.reader')}</header><button type="button" onClick={() => reader.current?.click()}><ImageUp size={16} />{t('qr.upload')}</button>{decoded && <p>{decoded}</p>}<input ref={reader} hidden type="file" accept="image/*" onChange={(event) => void readImage(event.target.files?.[0])} /></section><section className="qr-social"><header>{t('qr.sharePreview')}</header><div className="qr-discord"><strong>shappire</strong><p>{payload || t('qr.empty')}</p><small>{t('qr.discord')}</small></div><div className="qr-twitter"><strong>Shappire Tools</strong><p>{payload || t('qr.empty')}</p><small>{t('qr.twitter')}</small></div></section></div>
  </section>
}
