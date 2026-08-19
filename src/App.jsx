import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { About, Admin, Catalog, Donations, Forbidden, Home, ItemDetails, Login, NewDonation, NotFound, Orders, Profile, Register } from './pages/Pages'
import './App.css'

export default function App() {
  return <BrowserRouter><AuthProvider><Routes>
    <Route element={<Layout/>}>
      <Route index element={<Home/>}/><Route path="catalogo" element={<Catalog/>}/><Route path="catalogo/:id" element={<ItemDetails/>}/><Route path="sobre" element={<About/>}/>
      <Route element={<ProtectedRoute/>}><Route path="doacoes" element={<Donations/>}/><Route path="doacoes/nova" element={<NewDonation/>}/><Route path="pedidos" element={<Orders/>}/><Route path="perfil" element={<Profile/>}/></Route>
      <Route element={<ProtectedRoute admin/>}><Route path="admin" element={<Admin/>}/></Route>
      <Route path="acesso-negado" element={<Forbidden/>}/><Route path="*" element={<NotFound/>}/>
    </Route>
    <Route path="login" element={<Login/>}/><Route path="cadastro" element={<Register/>}/>
  </Routes></AuthProvider></BrowserRouter>
}
