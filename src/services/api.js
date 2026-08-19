const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function api(path, options = {}) {
  const token = localStorage.getItem('passa-adiante-token')
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const body = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    const message = Array.isArray(body?.message) ? body.message.join('. ') : body?.message
    throw new Error(message ?? 'Não foi possível concluir a operação.')
  }
  return body
}
