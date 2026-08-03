export type AppRoute = 'home' | 'downloader' | 'faq' | 'settings' | 'about' | 'terms' | 'ethics' | 'tools' | 'password-generator' | 'link-shortener' | 'pdf-tools' | 'image-converter' | 'google-lens' | 'emoji-copier' | 'media-converter' | 'json-tools' | 'jwt-decoder' | 'regex-tester' | 'uuid-generator' | 'hash-generator' | 'base64-tool' | 'url-tool' | 'qr-tools' | 'palette-generator' | 'color-converter' | 'favicon-generator' | 'discord-components' | 'discord-embed'

export function getCurrentRoute(pathname = window.location.pathname): AppRoute {
  const path = pathname.replace(/\/+$/, '')

  switch (path) {
    case '/downloader':
      return 'downloader'
    case '/servicos':
      return 'faq'
    case '/settings':
      return 'settings'
    case '/about':
      return 'about'
    case '/terms':
      return 'terms'
    case '/ethics':
      return 'ethics'
    case '/tools':
      return 'tools'
    case '/tools/password-generator':
      return 'password-generator'
    case '/tools/link-shortener':
      return 'link-shortener'
    case '/tools/pdf-tools':
      return 'pdf-tools'
    case '/tools/image-converter':
      return 'image-converter'
    case '/tools/google-lens':
      return 'google-lens'
    case '/tools/emoji-copier':
      return 'emoji-copier'
    case '/tools/media-converter':
      return 'media-converter'
    case '/tools/json':
      return 'json-tools'
    case '/tools/jwt':
      return 'jwt-decoder'
    case '/tools/regex':
      return 'regex-tester'
    case '/tools/uuid':
      return 'uuid-generator'
    case '/tools/hash':
      return 'hash-generator'
    case '/tools/base64':
      return 'base64-tool'
    case '/tools/url':
      return 'url-tool'
    case '/tools/qr-tools':
      return 'qr-tools'
    case '/tools/palette-generator':
      return 'palette-generator'
    case '/tools/color-converter':
      return 'color-converter'
    case '/tools/favicon-generator':
      return 'favicon-generator'
    case '/tools/discord-components': return 'discord-components'
    case '/tools/discord-embed': return 'discord-embed'
    default:
      return 'home'
  }
}

export function getPageShellClass(route: AppRoute): string {
  const classes = ['page-shell']

  if (route === 'downloader') classes.push('downloader-page')
  if (route === 'settings') classes.push('settings-page')
  if (route === 'faq') classes.push('faq-page-shell')
  if (route === 'about') classes.push('about-page')
  if (route === 'terms' || route === 'ethics') classes.push('legal-page')
  if (route === 'tools') classes.push('tools-page')
  if (route === 'password-generator') classes.push('password-generator-page')
  if (route === 'link-shortener') classes.push('link-shortener-page')
  if (route === 'pdf-tools') classes.push('pdf-tools-page')
  if (route === 'image-converter') classes.push('image-converter-page')
  if (route === 'google-lens') classes.push('google-lens-page')
  if (route === 'emoji-copier') classes.push('emoji-copier-page')
  if (route === 'media-converter') classes.push('media-converter-page')
  if (route === 'qr-tools') classes.push('qr-tools-page')
  if (route === 'palette-generator') classes.push('palette-generator-page')
  if (route === 'color-converter') classes.push('color-converter-page')
  if (route === 'favicon-generator') classes.push('favicon-generator-page')

  return classes.join(' ')
}
