import { useI18n } from '../../i18n'

export function About() {
  const { t } = useI18n()

  return (
    <section className="container about-section" id="sobre">
      <div className="about-kicker">{t('about.kicker')}</div>
      <h1>
        {t('about.title.1')}
        <br />
        {t('about.title.2')}
      </h1>
      <p className="about-lead">{t('about.lead')}</p>

      <div className="about-points">
        <article>
          <span>01</span>
          <h2>{t('about.one.title')}</h2>
          <p>{t('about.one.body')}</p>
        </article>
        <article>
          <span>02</span>
          <h2>{t('about.two.title')}</h2>
          <p>{t('about.two.body')}</p>
        </article>
        <article>
          <span>03</span>
          <h2>{t('about.three.title')}</h2>
          <p>{t('about.three.body')}</p>
        </article>
      </div>

      <section className="about-inspiration">
        <span>04</span>
        <div>
          <h2>{t('about.inspiration.title')}</h2>
          <p>
            {t('about.inspiration.one')}{' '}
            <a href="https://cobalt.tools/" target="_blank" rel="noreferrer">
              Cobalt
            </a>
            .
          </p>
          <p>{t('about.inspiration.two')}</p>
          <p>{t('about.inspiration.three')}</p>
        </div>
      </section>

      <section className="about-inspiration about-community">
        <span>05</span>
        <div>
          <h2>{t('about.community.title')}</h2>
          <p>{t('about.community.one')}</p>
          <p>{t('about.community.two')}</p>
        </div>
      </section>
    </section>
  )
}
