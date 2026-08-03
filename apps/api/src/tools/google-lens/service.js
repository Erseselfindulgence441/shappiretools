import { env } from '../../config/index.js'
import { deleteTemporaryImage, uploadTemporaryImage } from './bunny-temporary-image.js'
import { scheduleTemporaryImageCleanup } from './cleanup.js'
import { GoogleLensError } from './errors.js'
import { sanitizeGoogleLensImage } from './image-validation.js'

export function createGoogleLensURL(publicImageURL) {
  const lensURL = new URL('https://lens.google.com/uploadbyurl')
  lensURL.searchParams.set('url', publicImageURL)
  return lensURL.toString()
}

export async function prepareGoogleLensSearch(file) {
  const image = await sanitizeGoogleLensImage(file)
  let temporary
  try {
    temporary = await uploadTemporaryImage(image.data)
    const lensUrl = createGoogleLensURL(temporary.publicURL)
    scheduleTemporaryImageCleanup(temporary.objectPath, env.googleLensImageTtlSeconds)
    return { lensUrl, expiresInSeconds: env.googleLensImageTtlSeconds }
  } catch (error) {
    if (temporary?.objectPath) await deleteTemporaryImage(temporary.objectPath)
    if (error instanceof GoogleLensError) throw error
    throw new GoogleLensError('temporary_upload_failed', 'Não foi possível preparar a imagem temporária.', 502)
  }
}
