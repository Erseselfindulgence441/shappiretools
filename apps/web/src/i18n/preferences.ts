import { STORAGE_KEYS } from '../config/constants'
import type { Language, LanguagePreferences } from './types'

export const languageOptions: Array<{ value: Language; label: string }> = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'ru', label: 'Русский' },
]

export function isLanguage(value: unknown): value is Language {
  return value === 'pt' || value === 'en' || value === 'es' || value === 'ru'
}

export function getBrowserLanguage(): Language {
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  const match = candidates
    .map((candidate) => candidate.toLowerCase().split('-')[0])
    .find(isLanguage)

  return match || 'en'
}

export function getLanguagePreferences(): LanguagePreferences {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.languagePreferences) || 'null',
    )
    if (
      saved &&
      typeof saved.autoLanguage === 'boolean' &&
      isLanguage(saved.language)
    ) {
      return saved
    }

    const legacyLanguage = localStorage.getItem(STORAGE_KEYS.languageLegacy)
    if (isLanguage(legacyLanguage)) {
      return { autoLanguage: false, language: legacyLanguage }
    }
  } catch {
    
  }

  return { autoLanguage: true, language: 'en' }
}

export function saveLanguagePreferences(preferences: LanguagePreferences): void {
  localStorage.setItem(
    STORAGE_KEYS.languagePreferences,
    JSON.stringify(preferences),
  )
}
