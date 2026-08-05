import {
  Code2,
  Download,
  ExternalLink,
  Heart,
  Shield,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { TelegramIcon, DiscordIcon, GitHubIcon } from '../icons/BrandIcons'
import logo from '../../assets/images/logo.png'

export function Footer() {
  return (
    <footer className="site-footer-v2">
      <div className="container">
        {/* Top Divider */}
        <div className="footer-divider" />

        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <a className="footer-brand" href="/" aria-label="Shappire Tools">
              <div className="footer-brand-icon">
                <img src={logo} alt="Shappire" />
              </div>
              <div>
                <div className="footer-brand-name">
                  Shappire <span>Tools</span>
                </div>
                <p className="footer-brand-tagline">
                  Ferramentas simples para a internet.
                </p>
              </div>
            </a>

            <div className="footer-socials">
              <a
                href="https://t.me/shappiretools"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="footer-social-btn"
              >
                <TelegramIcon size={16} />
              </a>
              <a
                href="https://discord.gg/rWpepgrsHn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="footer-social-btn"
              >
                <DiscordIcon size={16} />
              </a>
              <a
                href="https://github.com/vassilievz/shappiretools"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="footer-social-btn"
              >
                <GitHubIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Plataforma</h4>
            <a href="/downloader"><Download size={13} /> Downloader</a>
            <a href="/tools"><Wrench size={13} /> Ferramentas</a>
            <a href="/tools/image-converter"><Sparkles size={13} /> Conversor de Imagem</a>
            <a href="/tools/media-converter"><Sparkles size={13} /> Conversor de Mídia</a>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Dev & Utilitários</h4>
            <a href="/tools/json"><Code2 size={13} /> JSON Tools</a>
            <a href="/tools/pdf-tools"><Code2 size={13} /> PDF Tools</a>
            <a href="/tools/discord-embed"><Code2 size={13} /> Discord Embed</a>
            <a href="/tools/link-shortener"><Code2 size={13} /> Link Shortener</a>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Suporte</h4>
            <a href="/servicos"><ExternalLink size={13} /> FAQ</a>
            <a href="/donate"><Heart size={13} /> Doar</a>
            <a href="/thanks"><Heart size={13} /> Agradecimentos</a>
            <a href="/about"><ExternalLink size={13} /> Sobre</a>
            <a href="/terms"><Shield size={13} /> Termos</a>
            <a href="/ethics"><Shield size={13} /> Ética</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} Shappire Tools
          </span>
          <span className="footer-made">
            Made with <Heart size={12} className="footer-heart" /> in Brazil by{' '}
            <a
              href="https://t.me/shappiretools"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vassiliev
            </a>
          </span>
          <span className="footer-oss">Open Source Project</span>
        </div>
      </div>
    </footer>
  )
}
