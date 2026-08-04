import { useState } from 'react'
import { Menu, Settings, X } from 'lucide-react'
import { useI18n } from '../../i18n'
import { getCurrentRoute } from '../../lib/routing'
import { GitHubIcon } from '../icons/BrandIcons'
import { Logo } from './Logo'

export function Header() {
  const { t } = useI18n()
  const route = getCurrentRoute()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { key: 'downloader', href: '/downloader', label: t('nav.downloader') || 'Downloader' },
    { key: 'tools', href: '/tools', label: t('nav.tools') || 'Ferramentas' },
    { key: 'settings', href: '/settings', label: t('nav.settings') || 'Configurações' },
    { key: 'faq', href: '/servicos', label: 'FAQ' },
    { key: 'about', href: '/about', label: t('nav.about') || 'Sobre' },
  ]

  return (
    <header className="site-header-sticky">
      <div className="container">
        <nav className="header-nav">
          <Logo />

          <div className="nav-links-desktop">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`nav-link ${route === item.key ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="header-actions">
            <a
              href="/settings"
              className={`header-icon-btn ${route === 'settings' ? 'is-active' : ''}`}
              aria-label="Configurações"
              title="Configurações"
            >
              <Settings size={17} />
            </a>
            <a
              href="https://github.com/vassilievz/shappiretools"
              target="_blank"
              rel="noopener noreferrer"
              className="header-icon-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon size={17} />
            </a>

            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`mobile-nav-link ${route === item.key ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com/vassilievz/shappiretools"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
