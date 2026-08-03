import { useState, useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'

const STORAGE_KEY = 'shappire-beta-seen'

export function BetaBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="beta-overlay" onClick={dismiss}>
      <div className="beta-popup" onClick={(e) => e.stopPropagation()}>
        <button className="beta-close" type="button" onClick={dismiss} aria-label="Fechar">
          <X size={18} />
        </button>
        <div className="beta-icon">
          <AlertTriangle size={28} />
        </div>
        <h2>Beta Version</h2>
        <p>
          Shappire is currently in <strong>open beta</strong>. You may encounter bugs, 
          incomplete features, or temporary service interruptions.
        </p>
        <p>
          We're actively improving the platform. Thanks for being an early user.
        </p>
        <button className="beta-dismiss" type="button" onClick={dismiss}>
          I understand, continue
        </button>
      </div>
    </div>
  )
}
