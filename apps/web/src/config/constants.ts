/** Backend API base URL. Uses VITE_API_URL env var in production, falls back to localhost for dev. */
export const API_URL = import.meta.env.VITE_API_URL || 'https://shappiretools.shardweb.app'

/** localStorage keys used by the app. */
export const STORAGE_KEYS = {
  settings: 'shappire-settings',
  languagePreferences: 'shappire-language-preferences',
  /** Legacy key kept for migration only. */
  languageLegacy: 'shappire-language',
} as const

/** Custom event name when download settings change. */
export const SETTINGS_CHANGED_EVENT = 'shappire-settings-changed'
