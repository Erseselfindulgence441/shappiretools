import { createHash, createHmac, randomUUID } from 'node:crypto'
import { GoogleLensError } from './errors.js'

const prefix = 'temporary/google-lens/'
const timeoutMs = 15_000

function asURL(value) {
  const normalized = String(value || '').trim()
  if (!normalized) return null
  try { return new URL(/^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`) } catch { return null }
}

function getConfig() {
  const storageEndpoint = asURL(process.env.BUNNY_STORAGE_ENDPOINT)
  const publicBase = asURL(process.env.BUNNY_PUBLIC_URL)
  const zone = String(process.env.BUNNY_STORAGE_ZONE || '').trim()
  const accessKeyId = String(process.env.BUNNY_STORAGE_ACCESS_KEY || '').trim()
  const secretAccessKey = String(process.env.BUNNY_STORAGE_SECRET_KEY || '').trim()
  const usesS3 = Boolean(storageEndpoint?.hostname.includes('-s3.storage.bunnycdn.com'))

  if (!storageEndpoint || !publicBase || !zone || !secretAccessKey || (usesS3 && !accessKeyId)) {
    throw new GoogleLensError('storage_not_configured', 'A busca visual não está disponível neste servidor.', 503)
  }

  return { storageEndpoint, publicBase, zone, accessKeyId, secretAccessKey, usesS3 }
}

function storageURL(config, objectPath) {
  return new URL(`${encodeURIComponent(config.zone)}/${objectPath}`, config.storageEndpoint.href.endsWith('/') ? config.storageEndpoint : `${config.storageEndpoint}/`)
}

function hash(value) { return createHash('sha256').update(value).digest('hex') }
function hmac(key, value, encoding) { return createHmac('sha256', key).update(value).digest(encoding) }

function s3Headers(config, url, method, body = '') {
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)
  const region = config.storageEndpoint.hostname.split('-s3.')[0] || 'ny'
  const payloadHash = hash(body)
  const canonicalHeaders = `host:${url.host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date'
  const canonicalRequest = `${method}\n${url.pathname}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`
  const scope = `${dateStamp}/${region}/s3/aws4_request`
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${scope}\n${hash(canonicalRequest)}`
  const dateKey = hmac(`AWS4${config.secretAccessKey}`, dateStamp)
  const regionKey = hmac(dateKey, region)
  const serviceKey = hmac(regionKey, 's3')
  const signingKey = hmac(serviceKey, 'aws4_request')
  const signature = hmac(signingKey, stringToSign, 'hex')
  return { Authorization: `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`, 'x-amz-content-sha256': payloadHash, 'x-amz-date': amzDate }
}

async function request(url, options) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try { return await fetch(url, { ...options, signal: controller.signal }) } catch { throw new GoogleLensError('temporary_upload_failed', 'Não foi possível enviar a imagem temporária.', 502) } finally { clearTimeout(timer) }
}

function headersFor(config, url, method, body) {
  return config.usesS3 ? s3Headers(config, url, method, body) : { AccessKey: config.secretAccessKey }
}

export function createTemporaryObjectPath() { return `${prefix}${randomUUID()}.jpg` }

export function createPublicImageURL(publicBase, objectPath) {
  if (!objectPath.startsWith(prefix)) throw new GoogleLensError('internal_error', 'Não foi possível preparar a imagem.', 500)
  return new URL(objectPath, publicBase.href.endsWith('/') ? publicBase : `${publicBase}/`).toString()
}

export async function uploadTemporaryImage(data) {
  const config = getConfig()
  const objectPath = createTemporaryObjectPath()
  const url = storageURL(config, objectPath)
  const response = await request(url, { method: 'PUT', headers: { ...headersFor(config, url, 'PUT', data), 'Content-Type': 'image/jpeg', 'Content-Length': String(data.length) }, body: data })
  if (!response.ok) throw new GoogleLensError('temporary_upload_failed', 'Não foi possível enviar a imagem temporária.', 502)
  return { objectPath, publicURL: createPublicImageURL(config.publicBase, objectPath) }
}

export async function deleteTemporaryImage(objectPath) {
  if (!objectPath.startsWith(prefix)) return false
  try {
    const config = getConfig()
    const url = storageURL(config, objectPath)
    const response = await request(url, { method: 'DELETE', headers: headersFor(config, url, 'DELETE') })
    if (!response.ok) console.warn(`[google-lens] cleanup failed for ${objectPath.slice(prefix.length)}`)
    return response.ok
  } catch {
    console.warn(`[google-lens] cleanup failed for ${objectPath.slice(prefix.length)}`)
    return false
  }
}
