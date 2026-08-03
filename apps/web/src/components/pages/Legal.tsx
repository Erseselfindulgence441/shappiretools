import { useI18n } from '../../i18n'

type LegalPageProps = {
  type: 'terms' | 'ethics'
}

const SECTIONS = ['one', 'two', 'three'] as const

export function Legal({ type }: LegalPageProps) {
  const { t } = useI18n()

  return (
    <section className="container legal-section">
      <div className="legal-kicker">{t(`${type}.label`)}</div>
      <h1>{t(`${type}.title`)}</h1>
      <p className="legal-intro">{t(`${type}.intro`)}</p>
      <div className="legal-list">
        {SECTIONS.map((section, index) => (
          <article key={section}>
            <span>0{index + 1}</span>
            <div>
              <h2>{t(`${type}.${section}.title`)}</h2>
              <p>{t(`${type}.${section}.body`)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
