import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'https://shappiretools.shardweb.app'

export function StatsCounter() {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch(`${API_URL}/stats`)
      .then(r => r.json())
      .then(data => setTotal(data.totalActions || 0))
      .catch(() => {})
  }, [])

  if (total === 0) return null

  return (
    <p className="stats-line">
      <span className="stats-number">{total.toLocaleString('pt-BR')}</span> arquivos processados
    </p>
  )
}
