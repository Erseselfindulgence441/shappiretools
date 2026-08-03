import { useI18n } from '../../i18n'
import { Logo } from './Logo'

export function Header() {
  const { t } = useI18n()

  return (
    <header className="container">
      <nav className="nav">
        <Logo />
        <div className="nav-links">
          <a href="/downloader">{t('nav.downloader')}</a>
          <a href="/tools">{t('nav.tools')}</a>
          <a href="/servicos">FAQ</a>
          <a href="/settings">{t('nav.settings')}</a>
          <a href="/about">{t('nav.about')}</a>
        </div>
      </nav>
    </header>
  )
}
