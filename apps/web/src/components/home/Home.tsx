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
      badge: t('home.badges.popular'),
      title: t('home.media.title'),
      description: t('home.media.description'),
      tags: ['TikTok', 'Instagram', 'Twitter/X', 'SoundCloud', 'Spotify'],
    },
    {
      id: 'converter',
      href: '/tools/image-converter',
      icon: Image,
      badge: t('home.badges.converter'),
      title: t('home.tools.converter.title'),
      description: t('home.tools.converter.description'),
      tags: ['PNG', 'WebP', 'AVIF', 'MP4', 'GIF'],
    },
    {
      id: 'dev',
      href: '/tools/json',
      icon: Code2,
      badge: t('home.badges.dev'),
      title: t('home.tools.dev.title'),
      description: t('home.tools.dev.description'),
      tags: ['JSON', 'JWT', 'Regex', 'Base64', t('home.tags.hash')],
    },
    {
      id: 'pdf',
      href: '/tools/pdf-tools',
      icon: FileText,
      badge: t('home.badges.pdf'),
      title: t('home.tools.pdf.title'),
      description: t('home.tools.pdf.description'),
      tags: [t('home.tags.mergePdf'), t('home.tags.splitPdf'), t('home.tags.extract')],
    },
    {
      id: 'discord',
      href: '/tools/discord-embed',
      icon: Bot,
      badge: t('home.badges.discord'),
      title: t('home.tools.discord.title'),
      description: t('home.tools.discord.description'),
      tags: [t('home.tags.embedBuilder'), t('home.tags.timestamps')],
    },
    {
      id: 'utilities',
      href: '/tools/link-shortener',
      icon: Wrench,
      badge: t('home.badges.utilities'),
      title: t('home.utility.title'),
      description: t('home.utility.description'),
      tags: [t('home.tags.shortener'), 'QR Code', t('home.tags.palettes'), t('home.tags.passwords')],
    },
  ]

  const platforms = [
    'TikTok', 'Twitter / X', 'Instagram', 'Bluesky', 'SoundCloud',
    'Spotify', 'YouTube Music', 'Vimeo', 'Twitch', 'Facebook'
  ]

  const pillars = [
    {
      icon: Lock,
      title: t('home.pillars.zero.title'),
      desc: t('home.pillars.zero.desc'),
    },
    {
      icon: Zap,
      title: t('home.pillars.fast.title'),
      desc: t('home.pillars.fast.desc'),
    },
    {
      icon: ShieldCheck,
      title: t('home.pillars.quality.title'),
      desc: t('home.pillars.quality.desc'),
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
                    {t('home.persona.bubble')}
                  </p>
                  <div className="bubble-arrow" />
                </motion.div>
              )}
            </AnimatePresence>

            <img className="home-persona-img" src={persona} alt={t('home.persona.alt')} />
            <div className="home-persona-line" />
          </div>

          <motion.h1 className="home-presentation-title" variants={fadeUp} custom={1}>
            SHAPPIRE TOOLS
          </motion.h1>

          <motion.p className="home-presentation-lead" variants={fadeUp} custom={2}>
            {t('home.lead')}
          </motion.p>

          <motion.div className="home-presentation-actions" variants={fadeUp} custom={3}>
            <a className="home-btn-primary" href="/downloader">
              <Download size={16} />
              <span>{t('home.downloader')}</span>
              <ArrowRight size={15} />
            </a>
            <a className="home-btn-secondary" href="/tools">
              <Wrench size={15} />
              <span>{t('home.tools')}</span>
            </a>
          </motion.div>

          <motion.div className="home-presentation-stats-pills" variants={fadeUp} custom={4}>
            <span className="stat-pill-clean">{t('home.stats.platforms')}</span>
            <span className="stat-pill-dot">•</span>
            <span className="stat-pill-clean">{t('home.stats.local')}</span>
            <span className="stat-pill-dot">•</span>
            <span className="stat-pill-clean">{t('home.stats.free')}</span>
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
            <span>{t('home.tools.badge')}</span>
          </div>
          <h2>{t('home.tools.sectionTitle')}</h2>
          <p>{t('home.tools.sectionLead')}</p>
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
          <span className="platforms-title">{t('home.platforms.title')}</span>
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
