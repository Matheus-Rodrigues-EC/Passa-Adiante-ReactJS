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
import PaginaItem from './pages/app/PaginaItem/PaginaItem.jsx'
import ListagemPedidos from './pages/app/ListagemPedidos/ListagemPedidos.jsx'
import PedidoDetalhe from './pages/app/PedidoDetalhe/PedidoDetalhe.jsx'

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
        <Route path="items/novo" element={<PaginaItem />} />
        <Route path="items/:id" element={<PaginaItem />} />
        <Route path="pedidos" element={<ListagemPedidos />} />
        <Route path="pedidos/:id" element={<PedidoDetalhe />} />
        <Route path="usuarios" element={<ListagemUsuarios />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
