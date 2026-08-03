import { useEffect, useMemo, useState } from 'react'
import { Check, Copy, Search } from 'lucide-react'
import { useI18n } from '../../i18n'

type EmojiSource = {
  category: string
  name: string
  short_name: string
  short_names: string[]
  sort_order: number
  unified: string
}

type EmojiEntry = {
  category: string
  emoji: string
  key: string
  keywords: string
  name: string
}

const categoryOrder = [
  'Smileys & Emotion',
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Travel & Places',
  'Activities',
  'Objects',
  'Symbols',
  'Flags',
  'Component',
]

const allCategory = '__all__'

const categoryLabels: Record<string, string> = {
  [allCategory]: 'emoji.categories.all',
  'Smileys & Emotion': 'emoji.categories.smileys',
  'People & Body': 'emoji.categories.people',
  'Animals & Nature': 'emoji.categories.animals',
  'Food & Drink': 'emoji.categories.food',
  'Travel & Places': 'emoji.categories.travel',
  Activities: 'emoji.categories.activities',
  Objects: 'emoji.categories.objects',
  Symbols: 'emoji.categories.symbols',
  Flags: 'emoji.categories.flags',
  Component: 'emoji.categories.components',
}

const pageSize = 144

function toNativeEmoji(unified: string) {
  return String.fromCodePoint(...unified.split('-').map((codePoint) => Number.parseInt(codePoint, 16)))
}

function normalizeEmojiData(data: EmojiSource[]) {
  return data
    .map((entry): EmojiEntry | null => {
      try {
        return {
          category: entry.category,
          emoji: toNativeEmoji(entry.unified),
          key: entry.unified,
          keywords: `${entry.name} ${entry.short_name} ${entry.short_names.join(' ')}`.toLocaleLowerCase(),
          name: entry.name,
        }
      } catch {
        return null
      }
    })
    .filter((entry): entry is EmojiEntry => entry !== null)
}

async function copyEmoji(emoji: string) {
  try {
    await navigator.clipboard.writeText(emoji)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = emoji
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }
}

export function EmojiCopier() {
  const { t } = useI18n()
  const [entries, setEntries] = useState<EmojiEntry[]>([])
  const [activeCategory, setActiveCategory] = useState(allCategory)
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    void import('emoji-datasource/emoji.json').then(({ default: source }) => {
      if (isActive) setEntries(normalizeEmojiData(source as EmojiSource[]))
    })

    return () => {
      isActive = false
    }
  }, [])

  const categories = useMemo(
    () => [allCategory, ...categoryOrder.filter((category) => entries.some((entry) => entry.category === category))],
    [entries],
  )

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const entriesInCategory = activeCategory === allCategory ? entries : entries.filter((entry) => entry.category === activeCategory)
    return normalizedQuery
      ? entriesInCategory.filter((entry) => entry.keywords.includes(normalizedQuery))
      : entriesInCategory
  }, [activeCategory, entries, query])

  const visibleEntries = filteredEntries.slice(0, visibleCount)

  function changeCategory(category: string) {
    setActiveCategory(category)
    setQuery('')
    setVisibleCount(pageSize)
  }

  async function handleCopy(emoji: string) {
    await copyEmoji(emoji)
    setCopied(emoji)
    window.setTimeout(() => setCopied(null), 1100)
  }

  return (
    <section className="container emoji-copier-section">
      <div className="emoji-copier-heading">
        <span>{t('emoji.kicker')}</span>
        <h1>{t('emoji.title')}</h1>
        <p>{t('emoji.lead')}</p>
      </div>

      <div className="emoji-copier-board">
        <div className="emoji-browser-tools">
          <label className="emoji-search">
            <Search size={15} />
            <input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(pageSize) }} placeholder={t('emoji.search')} />
          </label>
          <span>{entries.length ? `${entries.length} ${t('emoji.total')}` : t('emoji.loading')}</span>
        </div>

        <div className="emoji-category-nav" aria-label={t('emoji.categories')}>
          {categories.map((category) => (
            <button key={category} type="button" className={activeCategory === category ? 'is-active' : ''} onClick={() => changeCategory(category)}>
              {t(categoryLabels[category])}
            </button>
          ))}
        </div>

        <section className="emoji-group" aria-live="polite">
          <div className="emoji-group-heading">
            <h2>{t(categoryLabels[activeCategory])}</h2>
            <span>{filteredEntries.length} {t('emoji.total')}</span>
          </div>
          {entries.length ? (
            <div className="emoji-grid">
              {visibleEntries.map((entry) => {
                const isCopied = copied === entry.key
                const isFlag = entry.category === 'Flags'
                return (
                  <button key={entry.key} type="button" className={`${isCopied ? 'is-copied ' : ''}${isFlag ? 'has-flag' : ''}`} onClick={() => void handleCopy(entry.emoji)} aria-label={`${t('emoji.title')}: ${entry.name}`} title={entry.name}>
                    {isFlag && <img className="emoji-flag" src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${entry.key.toLocaleLowerCase()}.svg`} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling?.removeAttribute('hidden') }} />}
                    <span hidden={isFlag}>{entry.emoji}</span>
                    {isCopied ? <Check size={12} /> : <Copy size={11} />}
                  </button>
                )
              })}
            </div>
          ) : <div className="emoji-loading">{t('emoji.loading')}</div>}

          {visibleCount < filteredEntries.length && (
            <button type="button" className="emoji-show-more" onClick={() => setVisibleCount((count) => count + pageSize)}>
              {t('emoji.showMore')} <span>{Math.min(pageSize, filteredEntries.length - visibleCount)}</span>
            </button>
          )}
        </section>

        <div className="emoji-copy-status" aria-live="polite">{copied && <><Check size={13} /> {t('emoji.copied')}: {entries.find((entry) => entry.key === copied)?.emoji}</>}</div>
      </div>
    </section>
  )
}
