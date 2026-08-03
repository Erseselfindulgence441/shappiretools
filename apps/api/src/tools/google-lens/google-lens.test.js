import assert from 'node:assert/strict'
import test from 'node:test'
import sharp from 'sharp'
import { createPublicImageURL, createTemporaryObjectPath, uploadTemporaryImage } from './bunny-temporary-image.js'
import { GoogleLensError } from './errors.js'
import { sanitizeGoogleLensImage } from './image-validation.js'
import { createGoogleLensURL } from './service.js'

test('creates a random object path inside the isolated temporary prefix', () => {
  const path = createTemporaryObjectPath()
  assert.match(path, /^temporary\/google-lens\/[0-9a-f-]{36}\.jpg$/)
})

test('creates a public URL only for the Google Lens prefix', () => {
  const url = createPublicImageURL(new URL('https://cdn.example.test'), 'temporary/google-lens/file.jpg')
  assert.equal(url, 'https://cdn.example.test/temporary/google-lens/file.jpg')
  assert.throws(() => createPublicImageURL(new URL('https://cdn.example.test'), 'other/file.jpg'), GoogleLensError)
})

test('creates a safe Google Lens URL', () => {
  const url = new URL(createGoogleLensURL('https://cdn.example.test/temporary/google-lens/file.jpg'))
  assert.equal(url.origin, 'https://lens.google.com')
  assert.equal(url.searchParams.get('url'), 'https://cdn.example.test/temporary/google-lens/file.jpg')
})

test('sanitizes a valid PNG and removes metadata', async () => {
  const source = await sharp({ create: { width: 8, height: 8, channels: 3, background: '#ff0000' } }).withMetadata({ exif: { IFD0: { Copyright: 'private' } } }).png().toBuffer()
  const sanitized = await sanitizeGoogleLensImage({ buffer: source, mimetype: 'application/octet-stream' })
  const metadata = await sharp(sanitized.data).metadata()
  assert.equal(metadata.format, 'jpeg')
  assert.equal(metadata.exif, undefined)
})

test('does not expose Bunny failures', async () => {
  const originalFetch = global.fetch
  const original = Object.fromEntries(['BUNNY_STORAGE_ZONE', 'BUNNY_STORAGE_SECRET_KEY', 'BUNNY_STORAGE_ENDPOINT', 'BUNNY_PUBLIC_URL'].map((key) => [key, process.env[key]]))
  Object.assign(process.env, { BUNNY_STORAGE_ZONE: 'zone', BUNNY_STORAGE_SECRET_KEY: 'secret', BUNNY_STORAGE_ENDPOINT: 'https://storage.example.test', BUNNY_PUBLIC_URL: 'https://cdn.example.test' })
  global.fetch = async () => new Response('', { status: 401 })
  await assert.rejects(() => uploadTemporaryImage(Buffer.from('image')), (error) => error instanceof GoogleLensError && error.code === 'temporary_upload_failed')
  global.fetch = originalFetch
  for (const [key, value] of Object.entries(original)) { if (value === undefined) delete process.env[key]; else process.env[key] = value }
})
