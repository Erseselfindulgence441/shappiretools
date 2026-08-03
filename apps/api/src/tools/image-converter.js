import { basename, extname } from 'node:path'
import multer from 'multer'
import sharp from 'sharp'

const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_INPUT_PIXELS = 50_000_000

const inputFormats = new Set(['png', 'jpeg', 'webp', 'gif', 'tiff', 'svg', 'bmp'])
const inputMimeTypes = new Set([
  'image/png', 'image/jpeg', 'image/webp', 'image/gif',
  'image/bmp', 'image/tiff', 'image/x-tiff', 'image/svg+xml',
])
const extensionFormats = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp',
  '.tif', '.tiff', '.svg', '.ico', '.heic', '.heif',
])

const outputFormats = new Set([
  'png', 'jpeg', 'webp', 'avif', 'gif', 'tiff', 'bmp', 'ico',
])
const outputMimeTypes = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  avif: 'image/avif',
  gif: 'image/gif',
  tiff: 'image/tiff',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
}

function normalizeFormat(format) {
  if (format === 'jpg') return 'jpeg'
  if (format === 'tif') return 'tiff'
  return format
}

async function toBmp(pipeline) {
  const { data, info } = await pipeline.flatten({ background: '#ffffff' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const rowLength = Math.ceil((info.width * 3) / 4) * 4
  const fileSize = 54 + rowLength * info.height
  const bitmap = Buffer.alloc(fileSize)

  bitmap.write('BM', 0, 'ascii')
  bitmap.writeUInt32LE(fileSize, 2)
  bitmap.writeUInt32LE(54, 10)
  bitmap.writeUInt32LE(40, 14)
  bitmap.writeInt32LE(info.width, 18)
  bitmap.writeInt32LE(info.height, 22)
  bitmap.writeUInt16LE(1, 26)
  bitmap.writeUInt16LE(24, 28)
  bitmap.writeUInt32LE(rowLength * info.height, 34)

  for (let row = 0; row < info.height; row += 1) {
    const sourceRow = info.height - row - 1
    for (let column = 0; column < info.width; column += 1) {
      const sourceOffset = (sourceRow * info.width + column) * info.channels
      const targetOffset = 54 + row * rowLength + column * 3
      bitmap[targetOffset] = data[sourceOffset + 2]
      bitmap[targetOffset + 1] = data[sourceOffset + 1]
      bitmap[targetOffset + 2] = data[sourceOffset]
    }
  }

  return { data: bitmap, info: { width: info.width, height: info.height, size: bitmap.length } }
}

async function toIco(pipeline) {
  const sizes = [16, 32, 48, 64]
  const images = []

  for (const size of sizes) {
    const png = await pipeline.clone().resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
    images.push(png)
  }

  const headerSize = 6 + images.length * 16
  let dataOffset = headerSize
  const totalSize = headerSize + images.reduce((sum, img) => sum + img.length, 0)
  const ico = Buffer.alloc(totalSize)

  ico.writeUInt16LE(0, 0)
  ico.writeUInt16LE(1, 2)
  ico.writeUInt16LE(images.length, 4)

  for (let i = 0; i < images.length; i++) {
    const size = sizes[i]
    const offset = 6 + i * 16
    ico.writeUInt8(size === 256 ? 0 : size, offset)
    ico.writeUInt8(size === 256 ? 0 : size, offset + 1)
    ico.writeUInt8(0, offset + 2)
    ico.writeUInt8(0, offset + 3)
    ico.writeUInt16LE(1, offset + 4)
    ico.writeUInt16LE(32, offset + 6)
    ico.writeUInt32LE(images[i].length, offset + 8)
    ico.writeUInt32LE(dataOffset, offset + 12)
    dataOffset += images[i].length
  }

  let writePos = headerSize
  for (const img of images) {
    img.copy(ico, writePos)
    writePos += img.length
  }

  return { data: ico, info: { width: 64, height: 64, size: ico.length } }
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
  fileFilter: (_req, file, callback) => {
    const extension = extname(file.originalname).toLowerCase()
    if (!extensionFormats.has(extension) && !inputMimeTypes.has(file.mimetype)) {
      callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'image'))
      return
    }
    callback(null, true)
  },
}).single('image')

export function uploadImage(req, res, next) {
  upload(req, res, (error) => {
    if (!error) return next()
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'O arquivo deve ter no máximo 20 MB.'
      : 'Envie uma imagem compatível (PNG, JPG, WebP, GIF, SVG, BMP, TIFF, ICO).'
    return res.status(400).json({ error: message })
  })
}

export async function convertImage(req, res) {
  if (!req.file) return res.status(400).json({ error: 'Selecione uma imagem para converter.' })

  const requestedFormat = normalizeFormat(String(req.body.format || '').toLowerCase())
  const quality = Number(req.body.quality)
  const resizeEnabled = req.body.resizeEnabled === 'true'
  const keepAspect = req.body.keepAspect !== 'false'
  const resizeWidth = Number(req.body.width || 0)
  const resizeHeight = Number(req.body.height || 0)
  const cropEnabled = req.body.cropEnabled === 'true'
  const cropX = Number(req.body.cropX || 0)
  const cropY = Number(req.body.cropY || 0)
  const cropW = Number(req.body.cropW || 0)
  const cropH = Number(req.body.cropH || 0)
  const customFilename = req.body.filename || ''

  if (!outputFormats.has(requestedFormat)) return res.status(400).json({ error: 'Formato de saída inválido.' })
  if (!Number.isInteger(quality) || quality < 1 || quality > 100) return res.status(400).json({ error: 'A qualidade deve estar entre 1 e 100.' })
  if (resizeEnabled && (!Number.isInteger(resizeWidth) || !Number.isInteger(resizeHeight) || resizeWidth < 1 || resizeHeight < 1 || resizeWidth > 10000 || resizeHeight > 10000)) {
    return res.status(400).json({ error: 'As dimensões devem estar entre 1 e 10000 pixels.' })
  }

  try {
    const isSvg = req.file.mimetype === 'image/svg+xml' ||
                  extname(req.file.originalname).toLowerCase() === '.svg'

    const sharpOptions = {
      limitInputPixels: MAX_INPUT_PIXELS,
      animated: false,
      failOn: 'warning',
    }

    if (isSvg) {
      sharpOptions.density = 300
    }

    const probe = sharp(req.file.buffer, sharpOptions)
    const metadata = await probe.metadata()

    const detectedFormat = isSvg ? 'svg' : metadata.format
    if (!detectedFormat || !inputFormats.has(detectedFormat)) {
      return res.status(415).json({ error: 'O conteúdo do arquivo não é uma imagem compatível.' })
    }

    let pipeline = sharp(req.file.buffer, sharpOptions).rotate()

    if (cropEnabled && cropW > 0 && cropH > 0) {
      pipeline = pipeline.extract({
        left: Math.max(0, Math.round(cropX)),
        top: Math.max(0, Math.round(cropY)),
        width: Math.round(cropW),
        height: Math.round(cropH),
      })
    }

    if (resizeEnabled) {
      pipeline = pipeline.resize({
        width: resizeWidth,
        height: resizeHeight,
        fit: keepAspect ? 'inside' : 'fill',
        withoutEnlargement: false,
      })
    }

    let data, info

    switch (requestedFormat) {
      case 'jpeg':
        ({ data, info } = await pipeline.flatten({ background: '#ffffff' }).jpeg({ quality, mozjpeg: true }).toBuffer({ resolveWithObject: true }))
        break
      case 'png':
        ({ data, info } = await pipeline.png({ quality, compressionLevel: Math.round((100 - quality) * 0.09) }).toBuffer({ resolveWithObject: true }))
        break
      case 'webp':
        ({ data, info } = await pipeline.webp({ quality }).toBuffer({ resolveWithObject: true }))
        break
      case 'avif':
        ({ data, info } = await pipeline.avif({ quality }).toBuffer({ resolveWithObject: true }))
        break
      case 'gif':
        ({ data, info } = await pipeline.gif().toBuffer({ resolveWithObject: true }))
        break
      case 'tiff':
        ({ data, info } = await pipeline.tiff({ quality, compression: 'lzw' }).toBuffer({ resolveWithObject: true }))
        break
      case 'bmp':
        ({ data, info } = await toBmp(pipeline))
        break
      case 'ico':
        ({ data, info } = await toIco(pipeline))
        break
      default:
        return res.status(400).json({ error: 'Formato não suportado.' })
    }

    const baseName = (customFilename || basename(req.file.originalname, extname(req.file.originalname)))
      .replace(/[^a-z0-9_-]/gi, '-').replace(/-+/g, '-').slice(0, 80) || 'shappire-image'
    const extension = requestedFormat === 'jpeg' ? 'jpg' : requestedFormat === 'tiff' ? 'tif' : requestedFormat

    res.set({
      'Content-Type': outputMimeTypes[requestedFormat],
      'Content-Disposition': `attachment; filename="${baseName}-shappire.${extension}"`,
      'X-Original-Size': String(req.file.size),
      'X-Original-Width': String(metadata.width || 0),
      'X-Original-Height': String(metadata.height || 0),
      'X-Original-Format': detectedFormat,
      'X-Output-Size': String(data.length || info.size),
      'X-Output-Width': String(info.width),
      'X-Output-Height': String(info.height),
      'Cache-Control': 'no-store',
    })
    return res.status(200).send(data)
  } catch (error) {
    console.error('[image-converter] erro:', error)
    return res.status(415).json({ error: 'Não foi possível processar esta imagem.' })
  }
}
