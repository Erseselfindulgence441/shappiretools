import { useState } from 'react'
import { ArrowRight, Bot, Code2, Download, FileText, Image, Lock, ShieldCheck, Sparkles, Wrench, Zap } from 'lucide-react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useI18n } from '../../i18n'
import persona from '../../assets/images/persona.png'
import { Features } from './Features'
import { Services } from './Services'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export function Home() {
  const { t } = useI18n()
  const [showBubble, setShowBubble] = useState(false)

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setShowBubble(true)
    }
  }

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setShowBubble(false)
    }
  }

  const handleClick = () => {
    setShowBubble((prev) => !prev)
  }

  const categories = [
    {
      id: 'downloader',
      href: '/downloader',
      icon: Download,
      badge: 'POPULAR',
      title: t('home.media.title') || 'Download de Mídia',
      description: t('home.media.description') || 'Baixe vídeos, áudios e clipes de mais de 20 plataformas suportadas.',
      tags: ['TikTok', 'Instagram', 'Twitter/X', 'SoundCloud', 'Spotify'],
    },
    {
      id: 'converter',
      href: '/tools/image-converter',
      icon: Image,
      badge: 'SHARP & FFMPEG',
      title: t('home.tools.converter.title') || 'Conversor de Imagens & Mídia',
      description: t('home.tools.converter.description') || 'Converta formatos (PNG, WebP, AVIF, MP4, MP3), recorte e ajuste a qualidade.',
      tags: ['PNG', 'WebP', 'AVIF', 'MP4', 'GIF'],
    },
    {
      id: 'dev',
      href: '/tools/json',
      icon: Code2,
      badge: 'DEV SUITE',
      title: t('home.tools.dev.title') || 'Ferramentas de Dev',
      description: t('home.tools.dev.description') || 'Formatador JSON, decodificador JWT, testador Regex, gerador de hashes e UUIDs.',
      tags: ['JSON', 'JWT', 'Regex', 'Base64', 'Hash'],
    },
    {
      id: 'pdf',
      href: '/tools/pdf-tools',
      icon: FileText,
      badge: 'PDF STUDIO',
      title: t('home.tools.pdf.title') || 'PDF & Documentos',
      description: t('home.tools.pdf.description') || 'Junte múltiplos PDFs, divida páginas e extraia partes do documento.',
      tags: ['Merge PDF', 'Split PDF', 'Extract'],
    },
    {
      id: 'discord',
      href: '/tools/discord-embed',
      icon: Bot,
      badge: 'DISCORD BUILDER',
      title: t('home.tools.discord.title') || 'Discord Suite',
      description: t('home.tools.discord.description') || 'Crie Rich Embeds interativos, gerador de marcações de tempo e formatação.',
      tags: ['Embed Builder', 'Timestamps'],
    },
    {
      id: 'utilities',
      href: '/tools/link-shortener',
      icon: Wrench,
      badge: 'UTILITÁRIOS',
      title: t('home.utility.title') || 'Utilitários & Design',
      description: t('home.utility.description') || 'Encurtador de links, gerador de QR Codes, paletas de cores e senhas seguras.',
      tags: ['Shortener', 'QR Code', 'Paletas', 'Senhas'],
    },
  ]

  const platforms = [
    'TikTok', 'Twitter / X', 'Instagram', 'Bluesky', 'SoundCloud',
    'Spotify', 'YouTube Music', 'Vimeo', 'Twitch', 'Facebook'
  ]

  const pillars = [
    {
      icon: Lock,
      title: t('home.pillars.zero.title') || 'Zero Cadastro',
      desc: t('home.pillars.zero.desc') || '100% livre e privado. Sem logins nem rastreadores.',
    },
    {
      icon: Zap,
      title: t('home.pillars.fast.title') || 'Ultra-Rápido',
      desc: t('home.pillars.fast.desc') || 'Processamento local e servidor com Sharp e FFmpeg.',
    },
    {
      icon: ShieldCheck,
      title: t('home.pillars.quality.title') || 'Qualidade Máxima',
      desc: t('home.pillars.quality.desc') || 'Mídias e arquivos mantêm a qualidade original.',
    },
  ]

  return (
    <div className="home-wrapper">
      {/* ─── Hero Presentation ─── */}
      <section className="container home-hero-presentation">
        <motion.div
          className="home-presentation-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Persona Leaning on Line with Interactive Speech Bubble */}
          <div
            className="home-persona-spotlight"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  className="persona-speech-bubble"
                  initial={{ opacity: 0, x: -10, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                >
                  <p>
                    {t('home.persona.bubble') || 'Essa é a Shappire D. Ela usa um óculos muito fofo, e é a razão pela existência desse projeto — agradeça a ela.'}
                  </p>
                  <div className="bubble-arrow" />
                </motion.div>
              )}
            </AnimatePresence>

            <img className="home-persona-img" src={persona} alt="Shappire Mascot" />
            <div className="home-persona-line" />
          </div>

          <motion.h1 className="home-presentation-title" variants={fadeUp} custom={1}>
            SHAPPIRE TOOLS
          </motion.h1>

          <motion.p className="home-presentation-lead" variants={fadeUp} custom={2}>
            {t('home.lead') || 'Downloads de mídia, conversores de arquivos, utilitários para devs, documentos e suite para Discord em um só lugar.'}
          </motion.p>

          <motion.div className="home-presentation-actions" variants={fadeUp} custom={3}>
            <a className="home-btn-primary" href="/downloader">
              <Download size={16} />
              <span>{t('home.downloader') || 'Downloader de Mídia'}</span>
              <ArrowRight size={15} />
            </a>
            <a className="home-btn-secondary" href="/tools">
              <Wrench size={15} />
              <span>{t('home.tools') || 'Explorar Ferramentas'}</span>
            </a>
          </motion.div>

          <motion.div className="home-presentation-stats-pills" variants={fadeUp} custom={4}>
            <span className="stat-pill-clean">{t('home.stats.platforms') || '+20 Plataformas'}</span>
            <span className="stat-pill-dot">•</span>
            <span className="stat-pill-clean">{t('home.stats.local') || 'Processamento Local & Servidor'}</span>
            <span className="stat-pill-dot">•</span>
            <span className="stat-pill-clean">{t('home.stats.free') || '100% Grátis'}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Pillars Section ─── */}
      <section className="container home-pillars-section">
        <div className="home-pillars-grid">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <div key={i} className="pillar-card">
                <div className="pillar-icon">
                  <Icon size={17} />
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── Tools Grid Showcase ─── */}
      <section className="container home-tools-section" id="ferramentas">
        <div className="home-section-header">
          <div className="header-badge">
            <Sparkles size={12} />
            <span>{t('home.tools.badge') || 'FERRAMENTAS'}</span>
          </div>
          <h2>{t('home.tools.sectionTitle') || 'Tudo o que você precisa em um só lugar.'}</h2>
          <p>{t('home.tools.sectionLead') || 'Explore o catálogo completo de utilitários de mídia, conversores e dev tools.'}</p>
        </div>

        <div className="home-tools-grid">
          {categories.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                href={item.href}
                className="home-tool-card"
              >
                <div className="tool-card-top">
                  <div className="tool-card-icon">
                    <Icon size={18} />
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
              </a>
            )
          })}
        </div>
      </section>

      {/* ─── Platforms Cloud ─── */}
      <section className="container home-platforms-section">
        <div className="platforms-container">
          <span className="platforms-title">{t('home.platforms.title') || 'SUPORTE A PLATAFORMAS DE MÍDIA'}</span>
          <div className="platforms-cloud">
            {platforms.map((platform) => (
              <span key={platform} className="platform-pill">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <Features />

      {/* ─── FAQ ─── */}
      <Services />
    </div>
  )
}
