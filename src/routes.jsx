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
import PaginaItem from './pages/app/PaginaItem/PaginaItem.jsx'
import ListagemPedidos from './pages/app/ListagemPedidos/ListagemPedidos.jsx'
import PedidoDetalhe from './pages/app/PedidoDetalhe/PedidoDetalhe.jsx'

import EscolherPerfil from './pages/EscolherPerfil/EscolherPerfil.jsx'
import { UserLayout } from './layouts/UserLayout.jsx'
import MinhasSolicitacoes from './pages/user/MinhasSolicitacoes/MinhasSolicitacoes.jsx'
import MinhasDoacoes from './pages/user/MinhasDoacoes/MinhasDoacoes.jsx'
import EditarDoacao from './pages/user/EditarDoacao/EditarDoacao.jsx'
import SolicitacoesDoacao from './pages/user/SolicitacoesDoacao/SolicitacoesDoacao.jsx'
import UserCatalogo from './pages/user/Catalogo/Catalogo.jsx'

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
        <Route path="usuarios/:id" element={<PaginaUsuario />} />
      </Route>

      <Route path="/escolher-perfil" element={<EscolherPerfil />} />

      <Route path="/user" element={<UserLayout />}>
        <Route path="minhas-solicitacoes" element={<MinhasSolicitacoes />} />
        <Route path="minhas-doacoes" element={<MinhasDoacoes />} />
        <Route path="minhas-doacoes/:id/editar" element={<EditarDoacao />} />
        <Route path="minhas-doacoes/:id/solicitacoes" element={<SolicitacoesDoacao />} />
        <Route path="catalogo" element={<UserCatalogo />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
