import { SETTINGS_CHANGED_EVENT, STORAGE_KEYS } from '../../config/constants'
import { DEFAULT_DOWNLOAD_SETTINGS } from './defaults'
import type { DownloadSettings } from './types'

function readSettings(): DownloadSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.settings)
    if (stored) {
      return { ...DEFAULT_DOWNLOAD_SETTINGS, ...JSON.parse(stored) }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return DEFAULT_DOWNLOAD_SETTINGS
}

export function getDownloadSettings(): DownloadSettings {
  return readSettings()
}

export function saveDownloadSettings(settings: DownloadSettings): void {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings))
  window.dispatchEvent(new Event(SETTINGS_CHANGED_EVENT))
}
