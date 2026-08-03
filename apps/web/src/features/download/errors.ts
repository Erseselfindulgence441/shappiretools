/** Maps Cobalt/Shappire API error codes to i18n keys. */
const API_ERROR_MAP: Record<string, string> = {
  'error.api.link.unsupported': 'error.unsupported',
  'error.api.link.invalid': 'error.invalid',
  'error.api.link.missing': 'error.missing',
  'error.api.invalid_body': 'error.request',
  'error.api.fetch.fail': 'error.fetch',
  'error.api.fetch.empty': 'error.empty',
  'error.api.content.video.unavailable': 'error.unavailable',
  'error.api.content.video.live': 'error.live',
  'error.api.content.too_long': 'error.long',
  'error.api.content.post.unavailable': 'error.post',
  'error.api.content.post.private': 'error.private',
  'error.api.youtube.login': 'error.login',
  'error.api.service.unsupported': 'error.service',
  'error.api.generic': 'error.generic',
}

export function translateApiError(
  code: string,
  t: (key: string) => string,
): string {
  return t(API_ERROR_MAP[code] || 'error.generic')
}
