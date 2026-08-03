import { useState } from 'react'
import { Braces, Check, Copy } from 'lucide-react'

type Mode = 'format' | 'minify' | 'validate' | 'yaml'

export function JsonTools() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<Mode>('format')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function process() {
    setError('')
    setOutput('')
    if (!input.trim()) return

    try {
      const parsed = JSON.parse(input)

      switch (mode) {
        case 'format':
          setOutput(JSON.stringify(parsed, null, 2))
          break
        case 'minify':
          setOutput(JSON.stringify(parsed))
          break
        case 'validate':
          setOutput('✓ JSON válido')
          break
        case 'yaml':
          setOutput(jsonToYaml(parsed))
          break
      }
    } catch (e) {
      if (mode === 'validate') {
        setError(`✗ JSON inválido: ${(e as Error).message}`)
      } else {
        setError((e as Error).message)
      }
    }
  }

  function copy() {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="container tool-section">
      <div className="tool-heading">
        <span>FERRAMENTAS</span>
        <h1>JSON Tools</h1>
        <p>Formate, minifique, valide ou converta JSON para YAML.</p>
      </div>

      <div className="tool-modes">
        {(['format', 'minify', 'validate', 'yaml'] as Mode[]).map(m => (
          <button key={m} type="button" className={mode === m ? 'is-selected' : ''} onClick={() => setMode(m)}>
            {m === 'format' ? 'Formatar' : m === 'minify' ? 'Minificar' : m === 'validate' ? 'Validar' : 'JSON → YAML'}
          </button>
        ))}
      </div>

      <div className="tool-grid">
        <div className="tool-panel">
          <label>Entrada</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"exemplo": "cole seu JSON aqui"}' spellCheck={false} />
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header">
            <label>Saída</label>
            {output && <button type="button" className="tool-copy" onClick={copy}>{copied ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}</button>}
          </div>
          <textarea value={output || error} readOnly className={error ? 'has-error' : ''} placeholder="Resultado" />
        </div>
      </div>

      <button className="tool-action-button" type="button" onClick={process}>
        <Braces size={15} /> Processar
      </button>
    </section>
  )
}

function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = '  '.repeat(indent)
  if (obj === null) return `${pad}null`
  if (typeof obj === 'string') return `${pad}${obj}`
  if (typeof obj === 'number' || typeof obj === 'boolean') return `${pad}${obj}`
  if (Array.isArray(obj)) {
    return obj.map(item => {
      const val = typeof item === 'object' && item !== null
        ? '\n' + jsonToYaml(item, indent + 1)
        : ' ' + jsonToYaml(item, 0).trim()
      return `${pad}-${val}`
    }).join('\n')
  }
  if (typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>).map(([key, val]) => {
      if (typeof val === 'object' && val !== null) {
        return `${pad}${key}:\n${jsonToYaml(val, indent + 1)}`
      }
      return `${pad}${key}: ${jsonToYaml(val, 0).trim()}`
    }).join('\n')
  }
  return String(obj)
}
