import multer from 'multer'
import sharp from 'sharp'
import { env } from '../../config/index.js'
import { GoogleLensError } from './errors.js'

const acceptedFormats = new Set(['jpeg', 'png', 'webp'])
const maxDimension = 6000

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.googleLensMaxFileMb * 1024 * 1024, files: 1 },
}).single('image')

export function uploadGoogleLensImage(req, res, next) {
  upload(req, res, (error) => {
    if (!error) return next()
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 415
    const code = error.code === 'LIMIT_FILE_SIZE' ? 'image_too_large' : 'unsupported_image'
    const message = error.code === 'LIMIT_FILE_SIZE' ? `A imagem deve ter no máximo ${env.googleLensMaxFileMb} MB.` : 'Envie uma imagem JPEG, PNG ou WebP.'
    return res.status(status).json({ error: { code, message } })
  })
}

export async function sanitizeGoogleLensImage(file) {
  if (!file) throw new GoogleLensError('image_required', 'Selecione uma imagem para pesquisar.')

  let metadata
  try {
    metadata = await sharp(file.buffer, { limitInputPixels: env.googleLensMaxPixels, failOn: 'warning' }).metadata()
  } catch {
    throw new GoogleLensError('invalid_image', 'O arquivo enviado não é uma imagem válida.', 415)
  }

  if (!acceptedFormats.has(metadata.format)) {
    throw new GoogleLensError('unsupported_image', 'Envie uma imagem JPEG, PNG ou WebP.', 415)
  }

  const pixels = (metadata.width || 0) * (metadata.height || 0)
  if (!metadata.width || !metadata.height || pixels > env.googleLensMaxPixels) {
    throw new GoogleLensError('image_too_large', 'A imagem excede o limite de resolução permitido.', 413)
  }

  const data = await sharp(file.buffer, { limitInputPixels: env.googleLensMaxPixels, failOn: 'warning' })
    .rotate()
    .flatten({ background: '#f2f2f2' })
    .resize({ width: maxDimension, height: maxDimension, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toBuffer()

  return { data, width: metadata.width, height: metadata.height }
}
