import { useEffect } from 'react'
import { Footer, Header } from './components/layout'
import { BetaBanner } from './components/layout/BetaBanner'
import { Hero, Home } from './components/home'
import { About, Base64Tool, ColorConverter, DiscordSuite, EmojiCopier, FAQ, FaviconGenerator, GoogleLensSearch, HashGenerator, ImageConverter, JsonTools, JwtDecoder, Legal, LinkShortener, MediaConverter, PaletteGenerator, PasswordGenerator, PDFTools, QRTools, RegexTester, Settings, Tools, UrlTool, UuidGenerator } from './components/pages'
import { getCurrentRoute, getPageShellClass } from './lib/routing'

function MainContent() {
  const route = getCurrentRoute()

  switch (route) {
    case 'downloader':
      return <Hero />
    case 'faq':
      return <FAQ />
    case 'settings':
      return <Settings />
    case 'about':
      return <About />
    case 'terms':
      return <Legal type="terms" />
    case 'ethics':
      return <Legal type="ethics" />
    case 'tools':
      return <Tools />
    case 'password-generator':
      return <PasswordGenerator />
    case 'link-shortener':
      return <LinkShortener />
    case 'pdf-tools':
      return <PDFTools />
    case 'image-converter':
      return <ImageConverter />
    case 'google-lens':
      return <GoogleLensSearch />
    case 'emoji-copier':
      return <EmojiCopier />
    case 'media-converter':
      return <MediaConverter />
    case 'json-tools':
      return <JsonTools />
    case 'jwt-decoder':
      return <JwtDecoder />
    case 'regex-tester':
      return <RegexTester />
    case 'uuid-generator':
      return <UuidGenerator />
    case 'hash-generator':
      return <HashGenerator />
    case 'base64-tool':
      return <Base64Tool />
    case 'url-tool':
      return <UrlTool />
    case 'qr-tools':
      return <QRTools />
    case 'palette-generator':
      return <PaletteGenerator />
    case 'color-converter':
      return <ColorConverter />
    case 'favicon-generator':
      return <FaviconGenerator />
    case 'discord-components': return <DiscordSuite kind="components" />
    case 'discord-embed': return <DiscordSuite kind="embed" />
    default:
      return <Home />
  }
}

export default function App() {
  const route = getCurrentRoute()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [route])

  return (

    <div className={getPageShellClass(route)}>
      <BetaBanner />
      <Header />
      <main>
        <MainContent />
      </main>
      <Footer />
    </div>
  )
}
