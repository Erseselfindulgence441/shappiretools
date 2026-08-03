import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n'
import { API_URL } from '../../config/constants'

export function Footer() {
  const { t } = useI18n()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch(`${API_URL}/stats`)
      .then(r => r.json())
      .then(data => setTotal(data.totalActions || 0))
      .catch(() => {})
  }, [])

  return (
    <footer className="site-footer">
      <p>Made in Brazil with ❤ by <a href="https://www.instagram.com/vassilievz/" target="_blank" rel="noopener noreferrer">Vassiliev</a> for the community.</p>
      {total > 0 && (
        <p className="footer-stats">
          <span className="footer-stats-number">{total.toLocaleString()}</span> {t('footer.processed')}
        </p>
      )}
    </footer>
  )
}
