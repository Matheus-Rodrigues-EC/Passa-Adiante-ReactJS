import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import SobreOProjeto from './pages/SobreOProjeto.jsx'
import Catalogo from './pages/Catalogo.jsx'
import ComoParticipar from './pages/ComoParticipar.jsx'
import Contato from './pages/Contato.jsx'

import { AppLayout } from './layouts/AppLayout.jsx'
import ListagemItems from './pages/app/ListagemItems/ListagemItems.jsx'
import ListagemUsuarios from './pages/app/ListagemUsuarios/ListagemUsuarios.jsx'
import Dashboard from './pages/app/Dashboard/Dashboard.jsx'
import PaginaUsuario from './pages/app/PaginaUsuario/PaginaUsuario.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-o-projeto" element={<SobreOProjeto />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/como-participar" element={<ComoParticipar />} />
        <Route path="/contato" element={<Contato />} />
      </Route>

      <Route path="/app" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="items" element={<ListagemItems />} />
        <Route path="pedidos" element={<h1>Solicitações</h1>} />
        <Route path="usuarios" element={<ListagemUsuarios />} />
        <Route path="usuarios/:id" element={<PaginaUsuario />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
