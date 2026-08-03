import rateLimit from 'express-rate-limit'
import { env } from '../../config/index.js'
import { hashHmac } from '../../security/secrets.js'
import { getIP } from '../../processing/request.js'
import { sendGoogleLensError } from './errors.js'
import { uploadGoogleLensImage } from './image-validation.js'
import { prepareGoogleLensSearch } from './service.js'

export const googleLensLimiter = rateLimit({
  windowMs: env.googleLensRateLimitWindowMs,
  limit: env.googleLensRateLimitMax,
  standardHeaders: 'draft-6',
  legacyHeaders: false,
  keyGenerator: (req) => hashHmac(getIP(req), 'google-lens').toString('base64url'),
  handler: (_req, res) => res.status(429).json({ error: { code: 'rate_limited', message: 'Limite de buscas visuais atingido. Tente mais tarde.' } }),
})

export { uploadGoogleLensImage }

export async function searchWithGoogleLens(req, res) {
  try {
    return res.json(await prepareGoogleLensSearch(req.file))
  } catch (error) {
    return sendGoogleLensError(res, error)
  }
}
