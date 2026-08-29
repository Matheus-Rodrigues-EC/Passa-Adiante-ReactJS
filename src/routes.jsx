import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import SobreOProjeto from './pages/SobreOProjeto.jsx'
import Catalogo from './pages/Catalogo.jsx'
import ComoParticipar from './pages/ComoParticipar.jsx'
import Contato from './pages/Contato.jsx'

import { AppLayout } from './layouts/AppLayout.jsx'

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
        <Route path="dashboard" element={<h1>Minhas Solicitações</h1>} />
        <Route path="items" element={<h1>Minhas Doações</h1>} />
        <Route path="pedidos" element={<h1>Catálogo</h1>} />
        <Route path="usuarios" element={<h1>Usuários</h1>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
