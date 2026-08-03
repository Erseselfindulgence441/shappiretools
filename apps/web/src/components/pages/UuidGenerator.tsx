import { useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState(false)

  function generate() {
    const list: string[] = []
    for (let i = 0; i < Math.min(count, 50); i++) list.push(generateUUID())
    setUuids(list)
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="container tool-section">
      <div className="tool-heading">
        <span>FERRAMENTAS</span>
        <h1>UUID Generator</h1>
        <p>Gere UUIDs v4 aleatórios.</p>
      </div>

      <div className="tool-inline-row">
        <div className="tool-panel" style={{ flex: 0, minWidth: 120 }}>
          <label>Quantidade</label>
          <input type="number" min={1} max={50} value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <button className="tool-action-button" type="button" onClick={generate}>
          <RefreshCw size={15} /> Gerar
        </button>
        <button className="tool-action-button tool-secondary" type="button" onClick={copyAll}>
          {copied ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar</>}
        </button>
      </div>

      <div className="tool-result-box">
        {uuids.map((uuid, i) => (
          <code key={i} className="tool-uuid-line">{uuid}</code>
        ))}
      </div>
    </section>
  )
}
