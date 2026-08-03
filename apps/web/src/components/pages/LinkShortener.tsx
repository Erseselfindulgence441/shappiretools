import { Check, Copy, Link2, Loader2, Scissors } from 'lucide-react'
import { useEffect, useState } from 'react'
import { API_URL } from '../../config/constants'
import { useI18n } from '../../i18n'

const HISTORY_KEY = 'shappire-short-links'
type LinkItem = { shortUrl: string; url: string }

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    const area = document.createElement('textarea')
    area.value = value
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
}

export function LinkShortener() {
  const { t } = useI18n()
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [result, setResult] = useState<LinkItem | null>(null)
  const [history, setHistory] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
      if (Array.isArray(stored)) setHistory(stored.slice(0, 5))
    } catch {}
  }, [])

  function addHistory(item: LinkItem) {
    setHistory((items) => {
      const next = [item, ...items.filter((entry) => entry.shortUrl !== item.shortUrl)].slice(0, 5)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
      return next
    })
  }

  async function shorten(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setCopied(false)

    try {
      const response = await fetch(`${API_URL}/tools/link-shortener`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url, slug }),
      })
      const body = await response.json().catch(() => null)
      if (!response.ok) throw new Error(body?.error || t('shortener.failed'))
      const item = { shortUrl: body.shortUrl as string, url: body.url as string }
      setResult(item)
      addHistory(item)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t('shortener.failed'))
    } finally {
      setLoading(false)
    }
  }

  async function copyLink(value: string) {
    await copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <section className="container link-shortener-section">
      <div className="link-shortener-heading">
        <span>{t('shortener.kicker')}</span>
        <h1>{t('shortener.title')}</h1>
        <p>{t('shortener.lead')}</p>
      </div>

      <form className="link-shortener-board" onSubmit={shorten}>
        <label className="link-url-field">
          <Link2 size={18} />
          <input type="url" required value={url} onChange={(event) => setUrl(event.target.value)} placeholder={t('shortener.placeholder')} />
        </label>
        <div className="link-slug-field">
          <span>{t('shortener.customPrefix')}</span>
          <input value={slug} maxLength={32} onChange={(event) => setSlug(event.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))} placeholder={t('shortener.customPlaceholder')} />
        </div>
        <button type="submit" disabled={loading}>{loading ? <><Loader2 className="spin" size={16} /> {t('shortener.creating')}</> : <><Scissors size={16} /> {t('shortener.create')}</>}</button>
      </form>

      {error && <p className="link-shortener-error">{error}</p>}

      {result && <section className="link-shortener-result">
        <span>{t('shortener.ready')}</span>
        <div><strong>{result.shortUrl}</strong><button type="button" onClick={() => void copyLink(result.shortUrl)}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? t('shortener.copied') : t('shortener.copy')}</button></div>
        <small>{result.url}</small>
      </section>}

      {history.length > 0 && <section className="link-shortener-history">
        <header>{t('shortener.history')}</header>
        {history.map((item) => <button type="button" key={item.shortUrl} onClick={() => void copyLink(item.shortUrl)}><span><strong>{item.shortUrl}</strong><small>{item.url}</small></span><Copy size={13} /></button>)}
      </section>}
    </section>
  )
}
