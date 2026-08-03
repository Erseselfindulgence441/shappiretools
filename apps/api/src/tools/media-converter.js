import { basename, extname } from 'node:path'
import { spawn } from 'node:child_process'
import multer from 'multer'

let ffmpegPath
try {
  const ffmpegStatic = await import('ffmpeg-static')
  ffmpegPath = ffmpegStatic.default
} catch {
  ffmpegPath = 'ffmpeg'
}

const MAX_FILE_SIZE = 200 * 1024 * 1024
const allowedInputMimes = new Set([
  'video/mp4', 'video/webm', 'video/x-matroska', 'video/avi',
  'video/x-msvideo', 'video/quicktime', 'video/x-flv', 'video/ogg',
  'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/flac', 'audio/aac',
  'audio/mp4', 'audio/webm',
])
const allowedExtensions = new Set([
  '.mp4', '.webm', '.mkv', '.avi', '.mov', '.flv', '.ogg',
  '.mp3', '.wav', '.flac', '.aac', '.m4a', '.opus',
])

const outputConfigs = {
  mp4:  { ext: 'mp4',  mime: 'video/mp4',       args: ['-f', 'mp4', '-movflags', 'frag_keyframe+empty_moov+faststart'] },
  webm: { ext: 'webm', mime: 'video/webm',      args: ['-f', 'webm'] },
  mkv:  { ext: 'mkv',  mime: 'video/x-matroska', args: ['-f', 'matroska'] },
  avi:  { ext: 'avi',  mime: 'video/x-msvideo',  args: ['-f', 'avi'] },
  mov:  { ext: 'mov',  mime: 'video/quicktime',  args: ['-f', 'mov', '-movflags', 'frag_keyframe+empty_moov+faststart'] },
  flv:  { ext: 'flv',  mime: 'video/x-flv',       args: ['-f', 'flv'] },
  gif:  { ext: 'gif',  mime: 'image/gif',         args: ['-f', 'gif'] },
  mp3:  { ext: 'mp3',  mime: 'audio/mpeg',       args: ['-f', 'mp3'] },
  wav:  { ext: 'wav',  mime: 'audio/wav',        args: ['-f', 'wav'] },
  ogg:  { ext: 'ogg',  mime: 'audio/ogg',        args: ['-f', 'ogg'] },
  flac: { ext: 'flac', mime: 'audio/flac',       args: ['-f', 'flac'] },
  aac:  { ext: 'aac',  mime: 'audio/aac',        args: ['-f', 'adts'] },
  opus: { ext: 'opus', mime: 'audio/opus',       args: ['-f', 'opus'] },
}

function cropFilterFromRequest(body) {
  const x = Number(body.cropX)
  const y = Number(body.cropY)
  const width = Number(body.cropWidth)
  const height = Number(body.cropHeight)
  if (![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) return null

  const safeX = Math.min(99, Math.max(0, x))
  const safeY = Math.min(99, Math.max(0, y))
  const safeWidth = Math.min(100 - safeX, Math.max(1, width))
  const safeHeight = Math.min(100 - safeY, Math.max(1, height))
  return `crop=iw*${safeWidth / 100}:ih*${safeHeight / 100}:iw*${safeX / 100}:ih*${safeY / 100}`
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase()
    if (!allowedExtensions.has(ext) && !allowedInputMimes.has(file.mimetype)) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'media'))
    }
    cb(null, true)
  },
}).single('media')

export function uploadMedia(req, res, next) {
  upload(req, res, (error) => {
    if (!error) return next()
    const msg = error.code === 'LIMIT_FILE_SIZE'
      ? 'O arquivo deve ter no máximo 200 MB.'
      : 'Envie um arquivo de vídeo ou áudio válido.'
    return res.status(400).json({ error: msg })
  })
}

export async function convertMedia(req, res) {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' })

  const format = String(req.body.format || '').toLowerCase()
  const config = outputConfigs[format]
  if (!config) return res.status(400).json({ error: 'Formato de saída inválido.' })

  const mode = req.body.mode || 'convert'
  const customFilename = req.body.filename || ''

  const args = ['-loglevel', 'error', '-i', 'pipe:0']

  switch (mode) {
    case 'audio':
      args.push('-vn')
      if (req.body.audioBitrate) args.push('-b:a', `${req.body.audioBitrate}k`)
      break

    case 'compress':
      const crf = Math.min(51, Math.max(0, Number(req.body.crf) || 28))
      args.push('-c:v', 'libx264', '-crf', String(crf), '-preset', 'fast', '-c:a', 'aac')
      break

    case 'resize':
      const resizeCropFilter = cropFilterFromRequest(req.body)
      const width = Number(req.body.width) || -2
      const height = Number(req.body.height) || -2
      args.push('-vf', resizeCropFilter || `scale=${width}:${height}`, '-c:a', 'copy')
      break

    default:
      args.push('-c:v', 'copy', '-c:a', 'copy')
  }

  if (format === 'gif') {
    args.length = 0
    args.push(
      '-loglevel', 'error', '-i', 'pipe:0',
      '-vf', 'fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
      '-loop', '0',
      ...config.args, 'pipe:1'
    )
  } else {
    args.push(...config.args, 'pipe:1')
  }

  const baseName = (customFilename || basename(req.file.originalname, extname(req.file.originalname)))
    .replace(/[^a-z0-9_-]/gi, '-').replace(/-+/g, '-').slice(0, 80) || 'shappire-media'
  const filename = `${baseName}.${config.ext}`

  return runFfmpeg(args, req.file.buffer, res, config.mime, filename)
}

function runFfmpeg(args, inputBuffer, res, contentType, filename) {
  const process = spawn(ffmpegPath, args, { windowsHide: true })

  const chunks = []
  let stderr = ''

  process.stdout.on('data', (chunk) => chunks.push(chunk))
  process.stderr.on('data', (data) => { stderr += data.toString() })

  process.on('close', (code) => {
    if (code !== 0 || chunks.length === 0) {
      console.error('[media-converter] ffmpeg erro:', stderr)
      if (!res.headersSent) {
        return res.status(500).json({ error: 'Falha ao converter mídia.' })
      }
      return
    }

    const output = Buffer.concat(chunks)
    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'X-Output-Size': String(output.length),
      'Cache-Control': 'no-store',
    })
    res.status(200).send(output)
  })

  process.on('error', (err) => {
    console.error('[media-converter] spawn erro:', err)
    if (!res.headersSent) {
      res.status(500).json({ error: 'FFmpeg não encontrado no sistema.' })
    }
  })

  process.stdin.write(inputBuffer)
  process.stdin.end()

  const timeout = setTimeout(() => {
    process.kill('SIGTERM')
    if (!res.headersSent) {
      res.status(504).json({ error: 'Conversão excedeu o tempo limite.' })
    }
  }, 5 * 60 * 1000)

  process.on('close', () => clearTimeout(timeout))
}
