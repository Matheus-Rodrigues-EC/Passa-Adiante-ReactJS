import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Header() {
  return (
    <header className="header">
      <nav className="menu">
        <Link to="/" className="menu__logo">
          <img src={logo} alt="PassaAdiante" />
        </Link>

        <ul className="menu__list">
          <li className="menu__item">
            <Link to="/" className="menu__link">Início</Link>
          </li>
          <li className="menu__item">
            <Link to="/sobre-o-projeto" className="menu__link">Sobre</Link>
          </li>
          <li className="menu__item">
            <Link to="/como-participar" className="menu__link">Como participar</Link>
          </li>
          <li className="menu__item">
            <Link to="/catalogo" className="menu__link">Catálogo</Link>
          </li>
          <li className="menu__item">
            <Link to="/contato" className="menu__link">Contato</Link>
          </li>
        </ul>

        <div className="menu__actions">
          <button type="button" className="btn btn--primary">Entrar</button>
          <button type="button" className="btn btn--secondary">Cadastre-se</button>
        </div>
      </nav>
    </header>
  )
}

export default Header
