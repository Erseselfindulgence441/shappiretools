import { randomBytes } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { env } from '../config/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STORE_FILE = join(__dirname, '..', '..', 'data', 'short-links.json')
const links = new Map()

function getPublicOrigin(req) {
  const configured = process.env.SHORT_URL_BASE || env.apiURL
  if (configured && /^https?:\/\//i.test(configured)) return configured.replace(/\/+$/, '')

  const protocol = req.get('x-forwarded-proto')?.split(',')[0]?.trim() || req.protocol
  return `${protocol}://${req.get('host')}`
}

async function load() {
  try {
    const data = JSON.parse(await readFile(STORE_FILE, 'utf8'))
    Object.entries(data).forEach(([slug, url]) => {
      if (typeof url === 'string') links.set(slug, url)
    })
  } catch {}
}

async function save() {
  await mkdir(dirname(STORE_FILE), { recursive: true })
  await writeFile(STORE_FILE, JSON.stringify(Object.fromEntries(links), null, 2))
}

function createSlug() {
  return randomBytes(5).toString('base64url')
}

function validUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

await load()

export async function shortenLink(req, res) {
  const url = validUrl(String(req.body?.url || '').trim())
  const requestedSlug = String(req.body?.slug || '').trim()

  if (!url || url.length > 2048) return res.status(400).json({ error: 'Envie uma URL válida.' })
  if (requestedSlug && !/^[a-zA-Z0-9_-]{4,32}$/.test(requestedSlug)) return res.status(400).json({ error: 'O código deve ter entre 4 e 32 caracteres.' })

  let slug = requestedSlug || createSlug()
  while (!requestedSlug && links.has(slug)) slug = createSlug()
  if (links.has(slug)) return res.status(409).json({ error: 'Este código já está em uso.' })

  links.set(slug, url)
  try {
    await save()
  } catch {
    links.delete(slug)
    return res.status(500).json({ error: 'Não foi possível salvar o link.' })
  }

  const origin = getPublicOrigin(req)
  return res.status(201).json({ slug, url, shortUrl: `${origin}/s/${slug}` })
}

export function redirectShortLink(req, res) {
  const url = links.get(req.params.slug)
  if (!url) return res.status(404).send('Link não encontrado.')
  return res.redirect(302, url)
}
