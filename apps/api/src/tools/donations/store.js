import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const directory = dirname(fileURLToPath(import.meta.url))
const file = join(directory, '..', '..', '..', 'data', 'donations.json')
const records = new Map()

async function persist() {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, JSON.stringify([...records.values()], null, 2), 'utf8')
}

async function load() {
  try {
    const parsed = JSON.parse(await readFile(file, 'utf8'))
    if (Array.isArray(parsed)) {
      parsed.forEach((entry) => {
        if (entry?.id && entry?.paymentId) records.set(entry.id, entry)
      })
    }
  } catch {}
}

await load()

export function createDonation(record) {
  records.set(record.id, record)
  return persist()
}

export function getDonation(id) {
  return records.get(id) || null
}

export function completeDonation(id) {
  const record = records.get(id)
  if (!record) return null
  record.status = 'COMPLETED'
  record.completedAt = new Date().toISOString()
  records.set(id, record)
  return persist().then(() => record)
}

export function listAcknowledgements() {
  const supporters = new Map()

  for (const record of records.values()) {
    if (record.status !== 'COMPLETED' || !record.public || !record.name) continue
    const identity = record.name.normalize('NFKC').trim().toLocaleLowerCase('pt-BR')
    const current = supporters.get(identity)
    const amount = Number(record.amount) || 0

    if (!current) {
      supporters.set(identity, {
        id: identity,
        name: record.name,
        avatarUrl: record.avatarUrl || null,
        amount,
        completedAt: record.completedAt,
      })
      continue
    }

    current.amount += amount
    if (new Date(record.completedAt || 0) >= new Date(current.completedAt || 0)) {
      current.avatarUrl = record.avatarUrl || current.avatarUrl
      current.completedAt = record.completedAt
    }
  }

  return [...supporters.values()]
    .sort((a, b) => b.amount - a.amount || new Date(b.completedAt || 0) - new Date(a.completedAt || 0))
    .slice(0, 120)
}
