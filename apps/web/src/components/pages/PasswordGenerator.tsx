import { Check, Copy, KeyRound, RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../../i18n'

const groups = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%&*+-_=?.',
}

type Options = { lower: boolean; upper: boolean; numbers: boolean; symbols: boolean; avoidAmbiguous: boolean }

function randomIndex(limit: number) {
  const value = new Uint32Array(1)
  const max = Math.floor(0x100000000 / limit) * limit
  do crypto.getRandomValues(value)
  while (value[0] >= max)
  return value[0] % limit
}

function shuffle(values: string[]) {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const target = randomIndex(index + 1)
    ;[values[index], values[target]] = [values[target], values[index]]
  }
  return values.join('')
}

function createPassword(length: number, options: Options) {
  const selected = (Object.keys(groups) as Array<keyof typeof groups>)
    .filter((key) => options[key])
    .map((key) => options.avoidAmbiguous ? groups[key].replace(/[Il1O0o]/g, '') : groups[key])
    .filter(Boolean)
  const available = selected.length ? selected : [groups.lower]
  const characters = available.join('')
  const value = available.map((group) => group[randomIndex(group.length)])

  while (value.length < length) value.push(characters[randomIndex(characters.length)])
  return shuffle(value)
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    const area = document.createElement('textarea')
    area.value = value
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
}

export function PasswordGenerator() {
  const { t } = useI18n()
  const [length, setLength] = useState(18)
  const [options, setOptions] = useState<Options>({ lower: true, upper: true, numbers: true, symbols: true, avoidAmbiguous: false })
  const [password, setPassword] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const poolSize = useMemo(() => (Object.keys(groups) as Array<keyof typeof groups>)
    .filter((key) => options[key])
    .reduce((total, key) => total + (options.avoidAmbiguous ? groups[key].replace(/[Il1O0o]/g, '').length : groups[key].length), 0) || groups.lower.length, [options])
  const entropy = Math.round(Math.log2(poolSize) * length)
  const strength = entropy < 48 ? 'weak' : entropy < 80 ? 'good' : 'strong'

  function generate() {
    const next = createPassword(length, options)
    setPassword(next)
    setHistory((items) => [next, ...items.filter((item) => item !== next)].slice(0, 4))
    setCopied(false)
  }

  useEffect(() => { generate() }, [length, options])

  async function copyPassword(value = password) {
    await copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  function toggle(option: keyof Options) {
    if (option !== 'avoidAmbiguous' && options[option] && Object.entries(options).filter(([key, active]) => key !== 'avoidAmbiguous' && active).length === 1) return
    setOptions((current) => ({ ...current, [option]: !current[option] }))
  }

  return (
    <section className="container password-generator-section">
      <div className="password-generator-heading">
        <span>{t('password.kicker')}</span>
        <h1>{t('password.title')}</h1>
        <p>{t('password.lead')}</p>
      </div>

      <div className="password-generator-board">
        <div className="password-display" aria-live="polite">
          <KeyRound size={21} />
          <output>{password}</output>
          <button type="button" onClick={() => void copyPassword()} aria-label={t('password.copy')}>{copied ? <Check size={17} /> : <Copy size={17} />}</button>
        </div>

        <div className="password-strength" data-strength={strength}>
          <span className="password-strength-bars"><i /><i /><i /></span>
          <strong>{t(`password.${strength}`)}</strong>
          <small>{entropy} bits</small>
        </div>

        <div className="password-length-control">
          <label><span>{t('password.length')}</span><b>{length}</b></label>
          <input type="range" min="8" max="64" value={length} onChange={(event) => setLength(Number(event.target.value))} />
        </div>

        <div className="password-options">
          {(['upper', 'lower', 'numbers', 'symbols'] as Array<keyof Options>).map((option) => (
            <button type="button" className={options[option] ? 'is-active' : ''} key={option} onClick={() => toggle(option)}>
              <span>{options[option] ? <Check size={12} /> : null}</span>{t(`password.${option}`)}
            </button>
          ))}
        </div>

        <button type="button" className={`password-ambiguous${options.avoidAmbiguous ? ' is-active' : ''}`} onClick={() => toggle('avoidAmbiguous')}>
          <span>{options.avoidAmbiguous ? <Check size={12} /> : null}</span>{t('password.avoidAmbiguous')}
        </button>

        <button type="button" className="password-generate" onClick={generate}><RefreshCw size={16} /> {t('password.generate')}</button>
      </div>

      <section className="password-history">
        <header><span>{t('password.history')}</span></header>
        <div>{history.map((item) => <button type="button" key={item} onClick={() => void copyPassword(item)}>{item}<Copy size={12} /></button>)}</div>
      </section>
    </section>
  )
}
