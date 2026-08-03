/**
 * Music Resolver — Sistema multi-provider com fallback.
 *
 * Tenta encontrar uma fonte de áudio em múltiplas plataformas.
 * Ordem: SoundCloud → YouTube (Piped) → Bandcamp → Jamendo → Audiomack → Internet Archive → Deezer
 *
 * Para adicionar um novo provider: crie em ./providers/ e adicione no array abaixo.
 */

import { soundcloud } from './providers/soundcloud.js'
import { piped } from './providers/piped.js'
import { bandcamp } from './providers/bandcamp.js'
import { jamendo } from './providers/jamendo.js'
import { audiomack } from './providers/audiomack.js'
import { internetarchive } from './providers/internetarchive.js'
import { deezer } from './providers/deezer.js'

// Ordem de prioridade
const providers = [
  soundcloud,
  piped,
  bandcamp,
  jamendo,
  audiomack,
  internetarchive,
  deezer,
]

/**
 * Busca uma fonte de áudio em todos os providers.
 * Retorna a primeira com confiança >= 0.6, ou a melhor encontrada.
 *
 * @param {string} title
 * @param {string} artist
 * @returns {Promise<{ url: string, provider: string, confidence: number } | null>}
 */
export async function resolveAudioSource(title, artist) {
  if (!title && !artist) return null

  const results = []

  for (const provider of providers) {
    try {
      console.log(`[resolver] tentando ${provider.name}...`)
      const result = await provider.search(title, artist)

      if (result && result.url) {
        console.log(`[resolver] ✓ ${provider.name} encontrou (conf: ${result.confidence})`)
        const entry = { ...result, provider: provider.name }
        results.push(entry)

        // Confiança alta = retorna direto
        if (result.confidence >= 0.8) {
          return entry
        }
      } else {
        console.log(`[resolver] ✗ ${provider.name} — nada encontrado`)
      }
    } catch (err) {
      console.log(`[resolver] ✗ ${provider.name} erro: ${err.message || err}`)
    }
  }

  // Retorna o melhor resultado (maior confiança, mínimo 0.3)
  if (results.length > 0) {
    results.sort((a, b) => b.confidence - a.confidence)
    if (results[0].confidence >= 0.3) {
      return results[0]
    }
  }

  return null
}

export function listProviders() {
  return providers.map(p => p.name)
}
