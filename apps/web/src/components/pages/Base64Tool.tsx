import { useState } from 'react'
import { ArrowDownUp, Check, Copy } from 'lucide-react'

export function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function process() {
    setError('')
    setOutput('')
    if (!input.trim()) return

    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
    } catch {
      setError(mode === 'decode' ? 'Base64 inválido.' : 'Erro ao codificar.')
    }
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="container tool-section">
      <div className="tool-heading">
        <span>FERRAMENTAS</span>
        <h1>Base64</h1>
        <p>Codifique ou decodifique texto em Base64.</p>
      </div>

      <div className="tool-modes">
        <button type="button" className={mode === 'encode' ? 'is-selected' : ''} onClick={() => setMode('encode')}>Encode</button>
        <button type="button" className={mode === 'decode' ? 'is-selected' : ''} onClick={() => setMode('decode')}>Decode</button>
      </div>

      <div className="tool-grid">
        <div className="tool-panel">
          <label>{mode === 'encode' ? 'Texto' : 'Base64'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Texto para codificar...' : 'Base64 para decodificar...'} spellCheck={false} />
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header">
            <label>{mode === 'encode' ? 'Base64' : 'Texto'}</label>
            {output && <button type="button" className="tool-copy" onClick={copy}>{copied ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}</button>}
          </div>
          <textarea value={output || error} readOnly className={error ? 'has-error' : ''} />
        </div>
      </div>

      <button className="tool-action-button" type="button" onClick={process}>
        <ArrowDownUp size={15} /> {mode === 'encode' ? 'Codificar' : 'Decodificar'}
      </button>
    </section>
  )
}
