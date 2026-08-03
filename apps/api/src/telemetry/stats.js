import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STATS_FILE = join(__dirname, '..', '..', 'data', 'stats.json')

const defaultStats = {
  totalActions: 0,
  downloads: 0,
  conversions: 0,
  history: [],
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

await load()

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

  if (stats.history.length > 50) stats.history.length = 50

  save()
}

export function getStats() {
  return {
    totalActions: stats.totalActions,
    downloads: stats.downloads,
    conversions: stats.conversions,
    recentCount: stats.history.length,
  }
}
