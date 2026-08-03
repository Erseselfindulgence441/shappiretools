import { useState } from 'react'
import { Search } from 'lucide-react'

export function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('gi')
  const [testStr, setTestStr] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState('')

  function test() {
    setError('')
    setMatches([])
    if (!pattern || !testStr) return

    try {
      const regex = new RegExp(pattern, flags)
      const found = testStr.match(regex)
      setMatches(found || [])
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <section className="container tool-section">
      <div className="tool-heading">
        <span>FERRAMENTAS</span>
        <h1>Regex Tester</h1>
        <p>Teste expressões regulares em tempo real.</p>
      </div>

      <div className="tool-inline-row">
        <div className="tool-panel" style={{ flex: 2 }}>
          <label>Expressão Regular</label>
          <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="[a-z]+" spellCheck={false} />
        </div>
        <div className="tool-panel" style={{ flex: 0, minWidth: 90 }}>
          <label>Flags</label>
          <input type="text" value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi" />
        </div>
      </div>

      <div className="tool-single-panel">
        <label>Texto de teste</label>
        <textarea value={testStr} onChange={e => setTestStr(e.target.value)} placeholder="Cole o texto para testar aqui..." />
      </div>

      <button className="tool-action-button" type="button" onClick={test}>
        <Search size={15} /> Testar
      </button>

      {error && <p className="tool-error">{error}</p>}

      {matches.length > 0 && (
        <div className="tool-result-box">
          <label>{matches.length} match{matches.length > 1 ? 'es' : ''}</label>
          <div className="tool-matches">
            {matches.map((m, i) => <span key={i} className="tool-match-tag">{m}</span>)}
          </div>
        </div>
      )}

      {matches.length === 0 && pattern && testStr && !error && (
        <p className="tool-hint">Nenhum match encontrado.</p>
      )}
    </section>
  )
}
