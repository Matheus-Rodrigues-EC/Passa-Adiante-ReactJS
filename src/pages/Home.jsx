import heroImg from '../assets/hero-section.png'

function Home() {
  return (
    <>
      <section id="hero-section">
        <div>
          <span className="hero-badge">Economia circular na educação</span>
          <h1>Seu material ainda tem <span>muito</span> a ensinar!</h1>
          <p>
            Conectamos doadores de materiais escolares a estudantes que precisam,
            democratizando o acesso à educação e reduzindo o desperdício, um item
            de cada vez.
          </p>
        </div>
        <div>
          <img src={heroImg} alt="Passa Adiante Hero Section" />
        </div>
      </section>
      <section id="stats-section">
        <ul className="stats-section__list">
          <li>Educação para Todos</li>
          <li>Economia Circular</li>
          <li>Solidariedade Comunitária</li>
          <li>Sustentabilidade</li>
          <li>Redução da Evasão Escolar</li>
        </ul>
      </section>
    </>
  )
}

export default Home
