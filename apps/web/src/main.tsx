import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { I18nProvider } from './i18n'
import './styles/index.css'

console.log(
  '%c⚠ Ei, sei que você está aqui, bobinho.',
  'color: #ff6b6b; font-size: 18px; font-weight: bold; padding: 8px 0;'
)
console.log(
  '%cCuidado onde você acessa e o que cola aqui.\nSe alguém pediu pra colar algo, pode ser golpe.',
  'color: #aaa; font-size: 13px; padding: 4px 0;'
)
console.log(
  '%cShappire Tools — https://shappire.com',
  'color: #666; font-size: 11px;'
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
