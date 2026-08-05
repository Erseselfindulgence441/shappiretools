import { useI18n } from '../../i18n'
import shappireHmm from '../../assets/images/shappirehmm.png'

export function Services() {
  const { t } = useI18n()
  const questions = Array.from({ length: 6 }, (_, index) => ({
    question: t(`faq.q${index + 1}.question`),
    answer: t(`faq.q${index + 1}.answer`),
  }))

  return (
    <section className="container services faq" id="servicos">
      <div className="faq-intro">
        <div className="section-heading">
          <span>{t('faq.kicker')}</span>
          <h2>
            {t('faq.title')}
          </h2>
        </div>
        <div className="faq-visual" aria-hidden="true">
          <img src={shappireHmm} alt="Shappire" className="faq-character" />
          <div className="visual-lines">
            <i />
            <i />
            <i />
          </div>
          <span>{t('faq.helpTitle')}</span>
        </div>
      </div>
      <div className="faq-list">
        {questions.map(({ question, answer }, index) => (
          <details key={question}>
            <summary>
              <span>0{index + 1}</span>
              {question}
              <b>+</b>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
