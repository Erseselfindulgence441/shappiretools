export class GoogleLensError extends Error {
  constructor(code, message, status = 400) {
    super(message)
    this.code = code
    this.status = status
  }
}

export function sendGoogleLensError(res, error) {
  if (error instanceof GoogleLensError) {
    return res.status(error.status).json({ error: { code: error.code, message: error.message } })
  }
  console.error('[google-lens] request failed')
  return res.status(500).json({ error: { code: 'internal_error', message: 'Não foi possível preparar a busca agora.' } })
}
