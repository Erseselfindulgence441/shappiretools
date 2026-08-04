import logo from '../../assets/images/logo.png'

export function Logo() {
  return (
    <a className="brand" href="/" aria-label="Shappire Tools">
      <div className="brand-logo-wrapper">
        <img className="brand-logo" src={logo} alt="Shappire" />
      </div>
      <div className="brand-text">
        <span className="brand-name">Shappire</span>
        <span className="brand-badge">TOOLS</span>
      </div>
    </a>
  )
}
