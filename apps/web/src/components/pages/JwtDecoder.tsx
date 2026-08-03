import { useState } from 'react'
import { KeyRound } from 'lucide-react'

export function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  function decode() {
    setError('')
    setHeader('')
    setPayload('')
    if (!token.trim()) return

    try {
      const parts = token.trim().split('.')
      if (parts.length !== 3) throw new Error('Token JWT deve ter 3 partes separadas por ponto.')

      const decodeBase64 = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(atob(base64))
      }

      setHeader(JSON.stringify(decodeBase64(parts[0]), null, 2))
      setPayload(JSON.stringify(decodeBase64(parts[1]), null, 2))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <section className="container tool-section">
      <div className="tool-heading">
        <span>FERRAMENTAS</span>
        <h1>JWT Decoder</h1>
        <p>Decodifique tokens JWT para visualizar header e payload.</p>
      </div>

      <div className="tool-single-panel">
        <label>Token JWT</label>
        <textarea value={token} onChange={e => setToken(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIs..." spellCheck={false} />
      </div>

      <button className="tool-action-button" type="button" onClick={decode}>
        <KeyRound size={15} /> Decodificar
      </button>

      {error && <p className="tool-error">{error}</p>}

      {header && (
        <div className="tool-grid">
          <div className="tool-panel">
            <label>Header</label>
            <textarea value={header} readOnly />
          </div>
          <div className="tool-panel">
            <label>Payload</label>
            <textarea value={payload} readOnly />
          </div>
        </div>
      )}
    </section>
  )
}
