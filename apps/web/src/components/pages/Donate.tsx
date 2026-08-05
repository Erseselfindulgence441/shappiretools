import { Check, Copy, Heart, Loader2, QrCode, UserRound } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { API_URL } from '../../config/constants'
import { useI18n } from '../../i18n'

type Donation = {
  id: string
  amount: number
  status: string
  expiresAt?: string | null
  public: boolean
}

type PixCheckout = {
  donation: Donation
  pix: { copyPaste: string; qrCodeImage: string | null }
}

const values = [5, 10, 25, 50]

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(value)
}

async function copy(value: string) {
  await navigator.clipboard.writeText(value)
}

export function Donate() {
  const { language, t } = useI18n()
  const [amount, setAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')
  const [publicAcknowledgement, setPublicAcknowledgement] = useState(false)
  const [name, setName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [checkout, setCheckout] = useState<PixCheckout | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [paid, setPaid] = useState(false)
  const currencyLocale = ({ pt: 'pt-BR', en: 'en-US', es: 'es-ES', ru: 'ru-RU' } as const)[language]

  const selectedAmount = useMemo(() => {
    const parsed = Number(customAmount.replace(',', '.'))
    return customAmount ? parsed : amount
  }, [amount, customAmount])

  useEffect(() => {
    if (!checkout || paid) return

    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/donations/${checkout.donation.id}/status`)
        const body = await response.json().catch(() => null)
        if (response.ok && body?.donation?.status === 'COMPLETED') setPaid(true)
      } catch {}
    }, 4000)

    return () => window.clearInterval(timer)
  }, [checkout, paid])

  async function createPix(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/donations/pix`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ amount: selectedAmount, publicAcknowledgement, name, avatarUrl }),
      })
      const body = await response.json().catch(() => null)
      if (!response.ok) throw new Error(body?.error || t('donate.errors.create'))
      setCheckout(body)
      setPaid(body.donation.status === 'COMPLETED')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t('donate.errors.create'))
    } finally {
      setLoading(false)
    }
  }

  async function copyPix() {
    if (!checkout?.pix.copyPaste) return
    try {
      await copy(checkout.pix.copyPaste)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setError(t('donate.errors.copy'))
    }
  }

  return (
    <section className="container donate-section">
      <div className="donate-page-grid">
      <div className="donate-intro">
        <span>{t('donate.kicker')}</span>
        <h1>{t('donate.title.first')}<br /><em>{t('donate.title.second')}</em></h1>
        <p>{t('donate.lead')}</p>
        <div className="donate-impact-list" aria-label="Como o apoio ajuda o Shappire">
          <article><span>01</span><div><strong>{t('donate.impact.infrastructure.title')}</strong><p>{t('donate.impact.infrastructure.description')}</p></div></article>
          <article><span>02</span><div><strong>{t('donate.impact.development.title')}</strong><p>{t('donate.impact.development.description')}</p></div></article>
          <article><span>03</span><div><strong>{t('donate.impact.open.title')}</strong><p>{t('donate.impact.open.description')}</p></div></article>
        </div>
        <a className="donate-ranking-link" href="/thanks">{t('donate.ranking')} <span>↗</span></a>
      </div>

      <div className="donate-checkout-column">
      {!checkout ? (
        <form className="donate-checkout" onSubmit={createPix}>
          <section className="donate-checkout-main">
            <div className="donate-checkout-label"><Heart size={15} /> {t('donate.checkout.label')}</div>
            <h2>{t('donate.checkout.title')}</h2>
            <div className="donate-values">
              {values.map((value) => <button key={value} type="button" className={!customAmount && amount === value ? 'is-selected' : ''} onClick={() => { setAmount(value); setCustomAmount('') }}>{formatCurrency(value, currencyLocale)}</button>)}
            </div>
            <label className="donate-custom-value">
              <span>{t('donate.checkout.other')}</span>
              <div><b>R$</b><input inputMode="decimal" value={customAmount} onChange={(event) => setCustomAmount(event.target.value.replace(/[^\d,.]/g, ''))} placeholder="0,00" /></div>
            </label>
          </section>

          <section className="donate-identity">
            <label className="donate-public-toggle">
              <input type="checkbox" checked={publicAcknowledgement} onChange={(event) => setPublicAcknowledgement(event.target.checked)} />
              <span><UserRound size={16} /> {t('donate.checkout.public')}</span>
            </label>
            {publicAcknowledgement && <div className="donate-profile-fields">
              <label>{t('donate.checkout.nickname')}<input maxLength={40} required value={name} onChange={(event) => setName(event.target.value)} placeholder={t('donate.checkout.nicknamePlaceholder')} /></label>
              <label>{t('donate.checkout.photo')} <small>{t('donate.checkout.optional')}</small><input type="url" value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} placeholder="https://..." /></label>
            </div>}
            <p>{t('donate.checkout.privacy')}</p>
          </section>

          {error && <p className="donate-error">{error}</p>}
          <button className="donate-submit" type="submit" disabled={loading || !Number.isFinite(selectedAmount) || selectedAmount < 1}>
            {loading ? <><Loader2 className="spin" size={16} /> {t('donate.checkout.creating')}</> : <><QrCode size={16} /> {t('donate.checkout.submit')} {Number.isFinite(selectedAmount) ? formatCurrency(selectedAmount, currencyLocale) : ''}</>}
          </button>
        </form>
      ) : paid ? (
        <section className="donate-complete">
          <Check size={26} />
          <span>{t('donate.success.kicker')}</span>
          <h2>{t('donate.success.title')}</h2>
          <p>{checkout.donation.public ? t('donate.success.public') : t('donate.success.private')}</p>
          <a href="/thanks">{t('donate.success.link')}</a>
        </section>
      ) : (
        <section className="pix-checkout">
          <div className="pix-checkout-head"><div><span>{t('donate.pix.kicker')}</span><h2>{formatCurrency(checkout.donation.amount, currencyLocale)}</h2></div><button type="button" onClick={() => setCheckout(null)}>{t('donate.pix.change')}</button></div>
          <div className="pix-payment-layout">
            <div className="pix-qr">{checkout.pix.qrCodeImage ? <img src={checkout.pix.qrCodeImage} alt="QR Code PIX" /> : <QrCode size={76} />}</div>
            <div className="pix-instructions"><strong>{t('donate.pix.instructions')}</strong><p>{t('donate.pix.lead')}</p><button type="button" onClick={() => void copyPix()}>{copied ? <><Check size={15} /> {t('donate.pix.copied')}</> : <><Copy size={15} /> {t('donate.pix.copy')}</>}</button></div>
          </div>
          <div className="pix-status"><Loader2 className="spin" size={14} /> {t('donate.pix.waiting')}</div>
        </section>
      )}
      </div>
      </div>

      <section className="donate-details" aria-label="Detalhes sobre as doações">
        <article><span>{t('donate.details.voluntary.title')}</span><p>{t('donate.details.voluntary.description')}</p></article>
        <article><span>{t('donate.details.pix.title')}</span><p>{t('donate.details.pix.description')}</p></article>
        <article><span>{t('donate.details.ranking.title')}</span><p>{t('donate.details.ranking.description')}</p></article>
      </section>
    </section>
  )
}
