import { ArrowDownUp, ArrowUpRight, Braces, FileText, Film, Fingerprint, Hash, ImageIcon, KeyRound, Link2, MessageSquare, Palette, Pipette, QrCode, Search, SmilePlus, Stamp } from 'lucide-react'
import { useI18n } from '../../i18n'

const categories = [
  { title: 'tools.category.media', tools: [
    { href: '/tools/image-converter', icon: ImageIcon, name: 'tools.image.name', description: 'tools.image.description', image: 'https://i.imgur.com/Zbcr5R1.png' },
    { href: '/tools/media-converter', icon: Film, name: 'tools.media.name', description: 'tools.media.description', image: 'https://i.imgur.com/mkZWAU9.png' },
    { href: '/tools/pdf-tools', icon: FileText, name: 'tools.pdf.name', description: 'tools.pdf.description', image: 'https://i.imgur.com/jsog8FY.png' },
  ] },
  { title: 'tools.category.utilities', tools: [
    { href: '/tools/password-generator', icon: KeyRound, name: 'tools.password.name', description: 'tools.password.description', image: 'https://i.imgur.com/LM17R9P.png' },
    { href: '/tools/link-shortener', icon: Link2, name: 'tools.shortener.name', description: 'tools.shortener.description', image: 'https://i.imgur.com/hRH8yRw.png' },
    { href: '/tools/qr-tools', icon: QrCode, name: 'tools.qr.name', description: 'tools.qr.description', image: 'https://i.imgur.com/AV0Zbot.png' },
    { href: '/tools/emoji-copier', icon: SmilePlus, name: 'tools.emoji.name', description: 'tools.emoji.description', image: 'https://i.imgur.com/HY4A0Dr.png' },
  ] },
  { title: 'tools.category.design', tools: [
    { href: '/tools/palette-generator', icon: Palette, name: 'tools.palette.name', description: 'tools.palette.description', image: 'https://i.imgur.com/QwIKejW.png' },
    { href: '/tools/color-converter', icon: Pipette, name: 'tools.color.name', description: 'tools.color.description', image: 'https://i.imgur.com/F0cNYvW.png' },
    { href: '/tools/favicon-generator', icon: Stamp, name: 'tools.favicon.name', description: 'tools.favicon.description', image: 'https://i.imgur.com/a3xr5Cj.png' },
    { href: '/tools/google-lens', icon: Search, name: 'tools.googleLens.name', description: 'tools.googleLens.description' },
  ] },
  { title: 'tools.category.discord', tools: [
    { href:'/tools/discord-components', icon:MessageSquare,name:'discord.components.title',description:'discord.components.lead', image: 'https://i.imgur.com/GZtP6cx.png' },
    { href:'/tools/discord-embed', icon:MessageSquare,name:'discord.embed.title',description:'discord.embed.lead', image: 'https://i.imgur.com/ARLMOga.png' },
  ] },
  { title: 'tools.category.developer', tools: [
    { href: '/tools/json', icon: Braces, name: 'tools.json.name', description: 'tools.json.description', image: 'https://i.imgur.com/jcmZ3CD.png' },
    { href: '/tools/jwt', icon: KeyRound, name: 'tools.jwt.name', description: 'tools.jwt.description', image: 'https://i.imgur.com/ZeIBXpy.png' },
    { href: '/tools/regex', icon: Search, name: 'tools.regex.name', description: 'tools.regex.description', image: 'https://i.imgur.com/6ljNSr2.png' },
    { href: '/tools/uuid', icon: Fingerprint, name: 'tools.uuid.name', description: 'tools.uuid.description', image: 'https://i.imgur.com/0tJn5t9.png' },
    { href: '/tools/hash', icon: Hash, name: 'tools.hash.name', description: 'tools.hash.description', image: 'https://i.imgur.com/BEvLyBA.png' },
    { href: '/tools/base64', icon: ArrowDownUp, name: 'tools.base64.name', description: 'tools.base64.description', image: 'https://i.imgur.com/jsi6Qz5.png' },
    { href: '/tools/url', icon: Link2, name: 'tools.url.name', description: 'tools.url.description', image: 'https://i.imgur.com/gGxGWLN.png' },
  ] },
]

export function Tools() {
  const { t } = useI18n()

  return (
    <section className="container tools-directory-section">
      <div className="tools-directory-heading">
        <span>{t('tools.directory.kicker')}</span>
        <h1>{t('tools.directory.title')}</h1>
        <p>{t('tools.directory.lead')}</p>
      </div>

      <div className="tools-directory-categories">
        {categories.map((category) => <section className="tools-directory-category" key={category.title}>
          <header>{t(category.title)}</header>
          <div className="tools-directory-grid">
            {category.tools.map((tool) => {
              const Icon = tool.icon
              return <a className={`tool-directory-card${tool.image ? ' has-image' : ''}`} href={tool.href} key={tool.href}>
                {tool.image && <img className="tool-directory-image" src={tool.image} alt="" />}
                <span className="tool-directory-icon"><Icon size={19} /></span>
                <div><strong>{t(tool.name)}</strong><p>{t(tool.description)}</p></div>
                <ArrowUpRight className="tool-directory-arrow" size={16} />
              </a>
            })}
          </div>
        </section>)}
      </div>
    </section>
  )
}
