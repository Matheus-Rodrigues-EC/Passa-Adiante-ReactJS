import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import SobreOProjeto from './pages/SobreOProjeto.jsx'
import Catalogo from './pages/Catalogo.jsx'
import ComoParticipar from './pages/ComoParticipar.jsx'
import Contato from './pages/Contato.jsx'

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
    </Routes>
  )
}

export default AppRoutes
