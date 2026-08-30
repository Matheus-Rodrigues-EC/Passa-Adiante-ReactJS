import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import menuIcon from '../assets/menu-icon.png'

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/sobre-o-projeto', label: 'Sobre' },
  { to: '/como-participar', label: 'Como participar' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/contato', label: 'Contato' },
]

function Header() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  function goToEscolherPerfil() {
    closeMobileMenu()
    navigate('/escolher-perfil')
  }

  return (
    <header className="header">
      <nav className="menu">
        <Link to="/" className="menu__logo">
          <img src={logo} alt="" />
          <p>PassaAdiante</p>
        </Link>

        <button
          type="button"
          className="menu__mobile"
          aria-label="Abrir menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <img src={menuIcon} alt="Ícone Menu Mobile" />
        </button>

        <div
          className={
            mobileMenuOpen ? 'menu__overlay menu__overlay--open' : 'menu__overlay'
          }
          onClick={closeMobileMenu}
        />

        <ul
          className={
            mobileMenuOpen
              ? 'menu__list-mobile menu__list-mobile--open'
              : 'menu__list-mobile'
          }
        >
          <button
            type="button"
            className="menu__close"
            aria-label="Fechar menu"
            onClick={closeMobileMenu}
          >
            &times;
          </button>

          {NAV_LINKS.map((link) => (
            <li className="menu__item" key={link.to}>
              <Link to={link.to} className="menu__link" onClick={closeMobileMenu}>
                {link.label}
              </Link>
            </li>
          ))}

          <div className="menu__mobile-actions">
            <button type="button" className="btn btn--primary" onClick={goToEscolherPerfil}>Entrar</button>
            <button type="button" className="btn btn--secondary" onClick={goToEscolherPerfil}>Cadastre-se</button>
          </div>
        </ul>

        <ul className="menu__list">
          {NAV_LINKS.map((link) => (
            <li className="menu__item" key={link.to}>
              <Link to={link.to} className="menu__link">{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="menu__actions">
          <button type="button" className="btn btn--primary" onClick={goToEscolherPerfil}>Entrar</button>
          <button type="button" className="btn btn--secondary" onClick={goToEscolherPerfil}>Cadastre-se</button>
        </div>
      </nav>
    </header>
  )
}

export default Header
