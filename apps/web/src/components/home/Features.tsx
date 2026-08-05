import { AudioLines, Image, Maximize2 } from 'lucide-react'
import { useI18n } from '../../i18n'

export function Features() {
  const { t } = useI18n()

  return (
    <section className="container features" id="recursos">
      <div className="section-heading">
        <span>{t('home.features.kicker')}</span>
        <h2>{t('home.features.title')}</h2>
      </div>
      <div className="features-grid">
        <article className="glass-card feature-card formats">
          <div className="feature-top">
            <div className="feature-icon">
              <Maximize2 size={17} />
            </div>
            <span>{t('home.features.format.eyebrow')}</span>
          </div>
          <h3>{t('home.features.format.title')}</h3>
          <p>{t('home.features.format.description')}</p>
          <div className="format-preview">
            <div className="preview-screen">
              <span>{t('home.features.original')}</span>
              <b>01:42</b>
              <i>▶</i>
            </div>
            <div className="preview-copy">
              <span>{t('home.features.format.previewLabel')}</span>
              <b>{t('home.features.format.previewTitle')}</b>
              <small>{t('home.features.quality.title')}</small>
            </div>
          </div>
          <div className="format-studio">
            <div className="studio-file">
              <span>{t('home.features.detected')}</span>
              <b>{t('home.features.mediaFile')}</b>
              <i />
            </div>
            <div className="studio-arrow">→</div>
            <div className="format-list">
              <b>
                MP4 <small>{t('home.features.video')}</small>
              </b>
              <b>
                MP3 <small>{t('home.features.audio')}</small>
              </b>
              <b>
                JPG <small>{t('home.features.image')}</small>
              </b>
              <b>
                GIF <small>{t('home.features.loop')}</small>
              </b>
            </div>
          </div>
        </article>
        <article className="glass-card feature-card sound">
          <div className="feature-icon">
            <AudioLines size={17} />
          </div>
          <h3>{t('home.features.quality.title')}</h3>
          <p>{t('home.features.quality.description')}</p>
          <div className="wave-panel">
            <div className="audio-bars">
              {[20, 58, 35, 85, 47, 70, 28, 53, 42, 76, 32, 61].map(
                (height, i) => (
                  <i key={i} style={{ height: `${height}%` }} />
                ),
              )}
            </div>
          </div>
        </article>
        <article className="glass-card feature-card clean">
          <div className="feature-icon">
            <Image size={17} />
          </div>
          <h3>{t('home.features.clean.title')}</h3>
          <p>{t('home.features.clean.description')}</p>
          <div className="image-stack">
            <i />
          </div>
        </article>
      </div>
    </section>
  )
}
