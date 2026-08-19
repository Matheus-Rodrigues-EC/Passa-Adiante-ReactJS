import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function Layout() {
  const { user, logout } = useAuth(); const navigate = useNavigate()
  const leave = () => { logout(); navigate('/') }
  return <div className="app-shell">
    <header className="header"><Link className="brand" to="/"><img src="/logo.png" alt=""/><span>Passa <b>Adiante</b></span></Link>
      <nav aria-label="Navegação principal"><NavLink to="/catalogo">Catálogo</NavLink>{user && <NavLink to="/doacoes">Minhas doações</NavLink>}{user && <NavLink to="/pedidos">Pedidos</NavLink>}{user?.type === 'ADMIN' && <NavLink to="/admin">Administração</NavLink>}</nav>
      <div className="header-actions">{user ? <><Link className="user-chip" to="/perfil"><span>{user.name?.[0] ?? 'U'}</span>{user.name?.split(' ')[0]}</Link><button className="link-button" onClick={leave}>Sair</button></> : <><Link to="/login">Entrar</Link><Link className="button small" to="/cadastro">Criar conta</Link></>}</div>
    </header>
    <main><Outlet /></main>
    <footer><div><Link className="brand footer-brand" to="/"><img src="/logo.png" alt=""/><span>Passa <b>Adiante</b></span></Link><p>Materiais parados viram novas oportunidades.</p></div><div><strong>Explore</strong><Link to="/catalogo">Ver catálogo</Link><Link to="/sobre">Como funciona</Link></div><div><strong>Projeto social</strong><p>Desenvolvido no curso de ADS da UFCA.</p></div></footer>
  </div>
}
