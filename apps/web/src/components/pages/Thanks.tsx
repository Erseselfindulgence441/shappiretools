import { Heart, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { API_URL } from '../../config/constants'
import { useI18n } from '../../i18n'

type Acknowledgement = { id: string; name: string; avatarUrl?: string | null; amount: number; completedAt: string }

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(value)
}

export function Thanks() {
  const { language, t } = useI18n()
  const [people, setPeople] = useState<Acknowledgement[]>([])
  const [loading, setLoading] = useState(true)
  const currencyLocale = ({ pt: 'pt-BR', en: 'en-US', es: 'es-ES', ru: 'ru-RU' } as const)[language]

  useEffect(() => {
    fetch(`${API_URL}/donations/acknowledgements`)
      .then((response) => response.json())
      .then((body) => setPeople(Array.isArray(body?.acknowledgements) ? body.acknowledgements : []))
      .catch(() => setPeople([]))
      .finally(() => setLoading(false))
  }, [])

  return <section className="container thanks-section">
    <span>{t('thanks.kicker')}</span>
    <h1>{t('thanks.title.first')}<br /><em>{t('thanks.title.second')}</em></h1>
    <p>{t('thanks.lead')}</p>
    {loading ? <div className="thanks-loading"><Loader2 className="spin" size={18} /> {t('thanks.loading')}</div> : people.length ? <div className="thanks-grid">{people.map((person, index) => <article className={index < 3 ? 'is-top-supporter' : ''} key={person.id}><span className="thanks-rank">#{String(index + 1).padStart(2, '0')}</span><div className="thanks-avatar">{person.avatarUrl ? <img src={person.avatarUrl} alt="" /> : <Heart size={18} />}</div><div><strong>{person.name}</strong><small>{t('thanks.total')}: {formatCurrency(person.amount, currencyLocale)}</small></div></article>)}</div> : <div className="thanks-empty"><Heart size={18} /> {t('thanks.empty')}</div>}
    <a className="thanks-donate-link" href="/donate">{t('thanks.cta')}</a>
  </section>
}
