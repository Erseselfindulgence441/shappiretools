import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STATS_FILE = join(__dirname, '..', 'data', 'stats.json')

const defaultStats = {
  totalActions: 0,
  downloads: 0,
  conversions: 0,
  history: [], // últimas 50 ações
}

let stats = { ...defaultStats }

async function load() {
  try {
    const data = await readFile(STATS_FILE, 'utf8')
    stats = { ...defaultStats, ...JSON.parse(data) }
  } catch {
    stats = { ...defaultStats }
  }
}

async function save() {
  try {
    await mkdir(dirname(STATS_FILE), { recursive: true })
    await writeFile(STATS_FILE, JSON.stringify(stats, null, 2))
  } catch (err) {
    console.error('[stats] erro ao salvar:', err.message)
  }
}

// Carregar ao iniciar
await load()

/**
 * Registra uma ação (download ou conversão).
 * @param {'download' | 'conversion'} type
 * @param {string} service - Ex: 'tiktok', 'youtube', 'image', 'media'
 * @param {string} detail - Ex: 'mp4', 'png→webp'
 */
export function trackAction(type, service, detail = '') {
  stats.totalActions++
  if (type === 'download') stats.downloads++
  if (type === 'conversion') stats.conversions++

  stats.history.unshift({
    type,
    service,
    detail,
    time: Date.now(),
  })

  // Manter apenas as últimas 50
  if (stats.history.length > 50) stats.history.length = 50

  // Salvar async (não bloqueia)
  save()
}

/** Retorna as estatísticas atuais. */
export function getStats() {
  return {
    totalActions: stats.totalActions,
    downloads: stats.downloads,
    conversions: stats.conversions,
    recentCount: stats.history.length,
  }
}
