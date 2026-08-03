import { API_URL } from '../../config/constants'
import type { DownloadRequestBody, DownloadResult, MediaInspection } from './types'

export async function requestDownload(
  body: DownloadRequestBody,
): Promise<DownloadResult> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return res.json() as Promise<DownloadResult>
}

export async function inspectMedia(url: string): Promise<MediaInspection> {
  const response = await fetch(`${API_URL}/media/inspect`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })

  const body = await response.json().catch(() => null)
  if (!response.ok) throw new Error(body?.error || 'Não foi possível identificar esta mídia.')
  return body as MediaInspection
}

export function resolveDownloadUrl(url: string): string {
  return url.startsWith('http') ? url : `${API_URL}${url}`
}

export function triggerBrowserDownload(url: string, filename?: string): void {
  const a = document.createElement('a')
  a.href = resolveDownloadUrl(url)
  a.download = filename || 'download'
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
