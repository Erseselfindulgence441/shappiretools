import { useState } from 'react'
import { ArrowDownUp, Check, Copy } from 'lucide-react'

export function UrlTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  function process() {
    setOutput('')
    if (!input.trim()) return
    if (mode === 'encode') {
      setOutput(encodeURIComponent(input))
    } else {
      try { setOutput(decodeURIComponent(input)) }
      catch { setOutput('URL inválida para decodificar.') }
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
        <h1>URL Encoder / Decoder</h1>
        <p>Codifique ou decodifique URLs.</p>
      </div>

      <div className="tool-modes">
        <button type="button" className={mode === 'encode' ? 'is-selected' : ''} onClick={() => setMode('encode')}>Encode</button>
        <button type="button" className={mode === 'decode' ? 'is-selected' : ''} onClick={() => setMode('decode')}>Decode</button>
      </div>

      <div className="tool-grid">
        <div className="tool-panel">
          <label>Entrada</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? 'https://exemplo.com/path com espaços' : 'https%3A%2F%2Fexemplo.com'} spellCheck={false} />
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header">
            <label>Resultado</label>
            {output && <button type="button" className="tool-copy" onClick={copy}>{copied ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}</button>}
          </div>
          <textarea value={output} readOnly />
        </div>
      </div>

      <button className="tool-action-button" type="button" onClick={process}>
        <ArrowDownUp size={15} /> {mode === 'encode' ? 'Codificar' : 'Decodificar'}
      </button>
    </section>
  )
}
