import logo from '../../assets/images/logo.png'

export function Logo() {
  return (
    <a className="brand" href="/" aria-label="Shappire">
      <img className="brand-logo" src={logo} alt="Shappire" />
      Shappire
    </a>
  )
}
