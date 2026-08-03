export type Language = 'pt' | 'en' | 'es' | 'ru'

export type TranslationMap = Record<string, string>

export type LanguagePreferences = {
  autoLanguage: boolean
  language: Language
}

export type I18nContextValue = {
  language: Language
  preferredLanguage: Language
  autoLanguage: boolean
  setLanguage: (language: Language) => void
  setAutoLanguage: (autoLanguage: boolean) => void
  t: (key: string) => string
}
