import { ChevronDown, CircleHelp, MessageCircle } from 'lucide-react'
import { useI18n } from '../../i18n'

export function FAQ() {
  const { t } = useI18n()

  return (
    <section className="container faq-page">
      <header className="faq-page-header">
        <span>{t('faq.kicker')}</span>
        <h1>{t('faq.title')}</h1>
        <p>{t('faq.lead')}</p>
      </header>

      <div className="faq-page-layout">
        <aside className="faq-page-aside">
          <div className="faq-aside-icon"><CircleHelp size={24} /></div>
          <strong>{t('faq.helpTitle')}</strong>
          <p>{t('faq.helpLead')}</p>
          <a href="/#baixar"><MessageCircle size={14} />{t('faq.downloadLink')}</a>
        </aside>

        <div className="faq-page-list">
          {Array.from({ length: 6 }, (_, index) => (
            <details key={index}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{t(`faq.q${index + 1}.question`)}</strong>
                <ChevronDown size={16} />
              </summary>
              <p>{t(`faq.q${index + 1}.answer`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
