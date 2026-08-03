
export const API_URL = import.meta.env.VITE_API_URL || ''

export const STORAGE_KEYS = {
  settings: 'shappire-settings',
  languagePreferences: 'shappire-language-preferences',
  
  languageLegacy: 'shappire-language',
} as const

export const SETTINGS_CHANGED_EVENT = 'shappire-settings-changed'
