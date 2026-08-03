import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import {
  getBrowserLanguage,
  getLanguagePreferences,
  saveLanguagePreferences,
} from './preferences'
import { translations } from './translations'
import type { I18nContextValue, Language, LanguagePreferences } from './types'

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<LanguagePreferences>(
    getLanguagePreferences,
  )

  const language = preferences.autoLanguage
    ? getBrowserLanguage()
    : preferences.language

  function setLanguage(nextLanguage: Language) {
    const nextPreferences = { ...preferences, language: nextLanguage }
    saveLanguagePreferences(nextPreferences)
    setPreferences(nextPreferences)
  }

  function setAutoLanguage(autoLanguage: boolean) {
    const nextPreferences = { ...preferences, autoLanguage }
    saveLanguagePreferences(nextPreferences)
    setPreferences(nextPreferences)
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      preferredLanguage: preferences.language,
      autoLanguage: preferences.autoLanguage,
      setLanguage,
      setAutoLanguage,
      t: (key: string) =>
        translations[language][key] || translations.en[key] || key,
    }),
    [language, preferences],
  )

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}
