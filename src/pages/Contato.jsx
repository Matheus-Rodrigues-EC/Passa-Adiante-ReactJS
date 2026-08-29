import { useEffect, useRef, useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Contato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [feedback, setFeedback] = useState(null)
  const clearFeedbackTimeout = useRef(null)

  useEffect(() => {
    return () => clearTimeout(clearFeedbackTimeout.current)
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    clearTimeout(clearFeedbackTimeout.current)

    const trimmedNome = nome.trim()
    const trimmedEmail = email.trim()
    const trimmedMensagem = mensagem.trim()

    if (trimmedNome === '' || trimmedEmail === '' || trimmedMensagem === '') {
      setFeedback({ type: 'error', message: 'Por favor, preencha todos os campos obrigatórios.' })
      return
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setFeedback({ type: 'error', message: 'Por favor, insira um e-mail válido.' })
      return
    }

    setFeedback({ type: 'success', message: 'Mensagem enviada com sucesso!' })
    setNome('')
    setEmail('')
    setAssunto('')
    setMensagem('')

    clearFeedbackTimeout.current = setTimeout(() => {
      setFeedback(null)
    }, 4000)
  }

  return (
    <section id="contact-section">
      <h1 className="page-title">Contato</h1>
      <p>Entre em contato conosco preenchendo os dados abaixo e enviando sua mensagem.</p>

      <form id="contact-form" className="card-surface" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value.replace(/\s+/g, ''))}
            required
          />
        </div>

        <div>
          <label htmlFor="assunto">Assunto</label>
          <input
            type="text"
            id="assunto"
            name="assunto"
            value={assunto}
            onChange={(event) => setAssunto(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows="6"
            value={mensagem}
            onChange={(event) => setMensagem(event.target.value)}
            required
          />
        </div>

        <div
          id="form-feedback"
          className={feedback ? `form-feedback form-feedback--${feedback.type}` : 'form-feedback'}
          role="status"
          aria-live="polite"
        >
          {feedback?.message}
        </div>

        <button type="submit" className="btn btn--primary">
          Enviar
        </button>
      </form>
    </section>
  )
}

export default Contato
