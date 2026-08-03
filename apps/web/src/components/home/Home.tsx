import { ArrowRight, Bot, Code2, Download, FileText, Image, Lock, ShieldCheck, Sparkles, Wrench, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '../../i18n'
import { Features } from './Features'
import { Services } from './Services'

export function Home() {
  const { t } = useI18n()

  const categories = [
    {
      id: 'downloader',
      href: '/downloader',
      icon: Download,
      badge: 'POPULAR',
      title: t('home.media.title') || 'Download de Mídia',
      description: 'Baixe vídeos, áudios e clipes em alta resolução de mais de 20 plataformas suportadas.',
      tags: ['TikTok', 'Instagram', 'Twitter/X', 'SoundCloud', 'Spotify'],
    },
    {
      id: 'converter',
      href: '/image-converter',
      icon: Image,
      badge: 'SHARP & FFMPEG',
      title: 'Conversor de Imagens & Mídia',
      description: 'Converta formatos (PNG, WebP, AVIF, MP4, MP3), recorte, redimensione e ajuste a qualidade.',
      tags: ['PNG', 'WebP', 'AVIF', 'MP4', 'GIF'],
    },
    {
      id: 'dev',
      href: '/json-tools',
      icon: Code2,
      badge: 'DEV SUITE',
      title: 'Ferramentas de Dev',
      description: 'Formatador JSON, decodificador JWT, testador Regex, gerador de hashes e UUIDs v4.',
      tags: ['JSON', 'JWT', 'Regex', 'Base64', 'Hash'],
    },
    {
      id: 'pdf',
      href: '/pdf-tools',
      icon: FileText,
      badge: 'PDF STUDIO',
      title: 'PDF & Documentos',
      description: 'Junte múltiplos PDFs (Merge), divida páginas (Split) e extraia partes do documento com rapidez.',
      tags: ['Merge PDF', 'Split PDF', 'Page Extract'],
    },
    {
      id: 'discord',
      href: '/discord-embed',
      icon: Bot,
      badge: 'DISCORD BUILDER',
      title: 'Discord Suite',
      description: 'Crie Rich Embeds interativos, gere marcações de tempo dinâmicas (Timestamps) e textos estilizados.',
      tags: ['Embed Builder', 'Timestamps', 'Formatters'],
    },
    {
      id: 'utilities',
      href: '/link-shortener',
      icon: Wrench,
      badge: 'UTILITÁRIOS',
      title: t('home.utility.title') || 'Utilitários & Design',
      description: 'Encurtador de links com estatísticas, gerador de QR Codes, paletas de cores e senhas seguras.',
      tags: ['Shortener', 'QR Code', 'Paletas', 'Senhas'],
    },
  ]

  const platforms = [
    'TikTok', 'Twitter / X', 'Instagram', 'Bluesky', 'SoundCloud',
    'Spotify (Info)', 'YouTube Music (Info)', 'Vimeo', 'Twitch',
    'Bilibili', 'Facebook', 'Snapchat', 'Rutube', 'Loom', 'Dailymotion', 'Newgrounds'
  ]

  return (
    <div className="home-wrapper">
      {/* Brand Hero Banner (Presentation only - No Downloader Input) */}
      <section className="container home-hero-presentation">
        <motion.div
          className="home-presentation-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="home-presentation-eyebrow">
            <span className="pulse-dot" />
            <span>SHAPPIRE TOOLS • PLATAFORMA OPEN SOURCE</span>
          </div>

          <h1 className="home-presentation-title">
            Ferramentas simples para a internet de todos os dias.
          </h1>

          <p className="home-presentation-lead">
            Downloads de mídia, conversores de arquivos, utilitários para devs, documentos e suite para Discord em um único lugar — sem conta, sem anúncios e sem complicações.
          </p>

          <div className="home-presentation-actions">
            <a className="home-btn-primary" href="/downloader">
              <Download size={17} />
              <span>Downloader de Mídia</span>
              <ArrowRight size={16} />
            </a>
            <a className="home-btn-secondary" href="/tools">
              <Wrench size={16} />
              <span>Explorar Ferramentas</span>
            </a>
          </div>

          <div className="home-presentation-stats-pills">
            <div className="stat-pill">
              <span className="pill-dot" />
              <span>+20 Plataformas</span>
            </div>
            <div className="stat-pill">
              <span className="pill-dot" />
              <span>Sharp & FFmpeg Native</span>
            </div>
            <div className="stat-pill">
              <span className="pill-dot" />
              <span>100% Grátis & Privado</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pillars Section */}
      <section className="container home-pillars-section">
        <div className="home-pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">
              <Lock size={18} />
            </div>
            <div>
              <h3>Zero Cadastro & Anúncios</h3>
              <p>Ferramentas livres e privadas. Sem logins, sem rastreadores e sem distrações.</p>
            </div>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon">
              <Zap size={18} />
            </div>
            <div>
              <h3>Processamento Ultra-Rápido</h3>
              <p>Conversões locais e no servidor otimizadas com Sharp, FFmpeg e streaming.</p>
            </div>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3>Qualidade Preservada</h3>
              <p>Mídias e arquivos mantêm a qualidade máxima original sem perda de bitrate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Directory Showcase Grid */}
      <section className="container home-tools-section" id="ferramentas">
        <div className="home-section-header">
          <div className="header-badge">
            <Sparkles size={13} />
            <span>ECOSSISTEMA COMPLETO</span>
          </div>
          <h2>Tudo o que você precisa em um só lugar.</h2>
          <p>Explore o catálogo completo de utilitários de mídia, conversores, documentos e recursos para devs.</p>
        </div>

        <div className="home-tools-grid">
          {categories.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.id}
                href={item.href}
                className="home-tool-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="tool-card-top">
                  <div className="tool-card-icon">
                    <Icon size={20} />
                  </div>
                  <span className="tool-card-badge">{item.badge}</span>
                </div>
                <h3 className="tool-card-title">
                  {item.title}
                  <ArrowRight size={15} className="tool-card-arrow" />
                </h3>
                <p className="tool-card-desc">{item.description}</p>
                <div className="tool-card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tool-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            )
          })}
        </div>
      </section>

      {/* Supported Platforms Cloud */}
      <section className="container home-platforms-section">
        <div className="platforms-container">
          <span className="platforms-title">SUPORTE A +20 PLATAFORMAS & FONTES DE MÍDIA</span>
          <div className="platforms-cloud">
            {platforms.map((platform) => (
              <span key={platform} className="platform-pill">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Demonstrations */}
      <Features />

      {/* Frequently Asked Questions */}
      <Services />
    </div>
  )
}
