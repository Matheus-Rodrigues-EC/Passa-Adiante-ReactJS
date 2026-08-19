import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
export function ProtectedRoute({ admin = false }) { const { user, loading } = useAuth(); if (loading) return <div className="page-status">Carregando...</div>; if (!user) return <Navigate to="/login" replace/>; if (admin && user.type !== 'ADMIN') return <Navigate to="/acesso-negado" replace/>; return <Outlet/> }
