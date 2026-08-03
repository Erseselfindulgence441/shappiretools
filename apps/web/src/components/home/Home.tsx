import { ArrowRight, Bot, Code2, Download, FileText, Image, Lock, ShieldCheck, Sparkles, Wrench, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '../../i18n'
import { Hero } from './Hero'
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
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      id: 'converter',
      href: '/image-converter',
      icon: Image,
      badge: 'SHARP & FFMPEG',
      title: 'Conversor de Imagens & Mídia',
      description: 'Converta formatos (PNG, WebP, AVIF, MP4, MP3), recorte, redimensione e ajuste a qualidade.',
      tags: ['PNG', 'WebP', 'AVIF', 'MP4', 'GIF'],
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 'dev',
      href: '/json-tools',
      icon: Code2,
      badge: 'DEV SUITE',
      title: 'Ferramentas de Dev',
      description: 'Formatador JSON, decodificador JWT, testador Regex, gerador de hashes e UUIDs v4.',
      tags: ['JSON', 'JWT', 'Regex', 'Base64', 'Hash'],
      color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      id: 'pdf',
      href: '/pdf-tools',
      icon: FileText,
      badge: 'PDF STUDIO',
      title: 'PDF & Documentos',
      description: 'Junte múltiplos PDFs (Merge), divida páginas (Split) e extraia partes do documento com rapidez.',
      tags: ['Merge PDF', 'Split PDF', 'Page Extract'],
      color: 'from-amber-500/20 to-orange-500/20',
    },
    {
      id: 'discord',
      href: '/discord-embed',
      icon: Bot,
      badge: 'DISCORD BUILDER',
      title: 'Discord Suite',
      description: 'Crie Rich Embeds interativos, gere marcações de tempo dinâmicas (Timestamps) e textos estilizados.',
      tags: ['Embed Builder', 'Timestamps', 'Formatters'],
      color: 'from-indigo-500/20 to-violet-500/20',
    },
    {
      id: 'utilities',
      href: '/link-shortener',
      icon: Wrench,
      badge: 'UTILITÁRIOS',
      title: t('home.utility.title') || 'Utilitários & Design',
      description: 'Encurtador de links com estatísticas, gerador de QR Codes, paletas de cores e senhas seguras.',
      tags: ['Shortener', 'QR Code', 'Paletas', 'Senhas'],
      color: 'from-rose-500/20 to-red-500/20',
    },
  ]

  const platforms = [
    'TikTok', 'Twitter / X', 'Instagram', 'Bluesky', 'SoundCloud',
    'Spotify (Info)', 'YouTube Music (Info)', 'Vimeo', 'Twitch',
    'Bilibili', 'Facebook', 'Snapchat', 'Rutube', 'Loom', 'Dailymotion', 'Newgrounds'
  ]

  return (
    <div className="home-wrapper">
      {/* Primary Interactive Downloader Hero */}
      <Hero />

      {/* Value Proposition Highlights Banner */}
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

      {/* Main Suite / Tools Categories Directory Grid */}
      <section className="container home-tools-section" id="ferramentas">
        <div className="home-section-header">
          <div className="header-badge">
            <Sparkles size={13} />
            <span>ECOSSISTEMA COMPLETO</span>
          </div>
          <h2>Todas as ferramentas em um só lugar.</h2>
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
          <span className="platforms-title">SUPORTE A +20 PLATAFORMAS & FONTES</span>
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
