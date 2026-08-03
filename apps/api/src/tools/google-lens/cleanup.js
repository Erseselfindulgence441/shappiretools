import { deleteTemporaryImage } from './bunny-temporary-image.js'

const pending = new Map()
const maxPending = 30
const maxAttempts = 3
const retryDelayMs = 60_000
let timer

function scheduleNext() {
  clearTimeout(timer)
  const next = [...pending.entries()].sort((a, b) => a[1].expiresAt - b[1].expiresAt)[0]
  if (!next) return
  timer = setTimeout(runCleanup, Math.max(0, next[1].expiresAt - Date.now()))
}

async function runCleanup() {
  const now = Date.now()
  const due = [...pending.entries()].filter(([, entry]) => entry.expiresAt <= now)
  for (const [objectPath, entry] of due) {
    const deleted = await deleteTemporaryImage(objectPath)
    if (deleted || entry.attempts + 1 >= maxAttempts) {
      pending.delete(objectPath)
      continue
    }
    pending.set(objectPath, { expiresAt: Date.now() + retryDelayMs, attempts: entry.attempts + 1 })
  }
  scheduleNext()
}

export function scheduleTemporaryImageCleanup(objectPath, ttlSeconds) {
  if (pending.size >= maxPending) throw new Error('cleanup queue is full')
  pending.set(objectPath, { expiresAt: Date.now() + Math.max(30, ttlSeconds) * 1000, attempts: 0 })
  scheduleNext()
}
