/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('passa-adiante-user') || 'null'))
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('passa-adiante-token')))
  useEffect(() => {
    if (!localStorage.getItem('passa-adiante-token')) return
    api('/users/me').then(setUser).catch(() => logout()).finally(() => setLoading(false))
  }, [])
  function persist(nextUser, token) {
    localStorage.setItem('passa-adiante-token', token)
    localStorage.setItem('passa-adiante-user', JSON.stringify(nextUser))
    setUser(nextUser)
  }
  async function login(credentials) { const data = await api('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }); persist(data.user, data.accessToken); return data.user }
  async function register(input) { await api('/users', { method: 'POST', body: JSON.stringify(input) }); return login({ email: input.email, password: input.password }) }
  function logout() { localStorage.removeItem('passa-adiante-token'); localStorage.removeItem('passa-adiante-user'); setUser(null) }
  const value = { user, loading, login, register, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
