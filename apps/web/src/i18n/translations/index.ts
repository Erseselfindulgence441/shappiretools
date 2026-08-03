import type { Language, TranslationMap } from '../types'
import en from './en'
import es from './es'
import pt from './pt'
import ru from './ru'

export const translations: Record<Language, TranslationMap> = {
  pt,
  en,
  es,
  ru,
}
