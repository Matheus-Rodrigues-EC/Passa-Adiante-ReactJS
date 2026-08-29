import { Link } from 'react-router-dom'

function ComoParticipar() {
  return (
    <section id="how-to-participate-section">
      <h1 className="page-title">Como participar</h1>
      <p>
        O Passa Adiante conecta quem tem materiais escolares para doar a quem
        precisa deles. Veja abaixo como se cadastrar e participar, seja como
        doador ou como receptor.
      </p>

      <div className="participate-content">
        <article className="participate-card card-surface">
          <div className="participate-card__content">
            <div className="participate-card__header">
              <h2>Sou Doador</h2>
              <p>Tenho materiais para compartilhar</p>
            </div>

            <ol className="participate-card__steps participate-card__steps--primary">
              <li>
                <div className="participate-card__step-content">
                  <h3>Cadastre-se</h3>
                  <p>
                    Crie sua conta gratuita em menos de 2 minutos. Precisamos
                    apenas do seu nome e localização.
                  </p>
                </div>
              </li>
              <li>
                <div className="participate-card__step-content">
                  <h3>Anuncie</h3>
                  <p>
                    Tire uma foto do material, informe a categoria e o estado
                    de conservação e publique no catálogo.
                  </p>
                </div>
              </li>
              <li>
                <div className="participate-card__step-content">
                  <h3>Doe</h3>
                  <p>
                    Combine a entrega com o estudante interessado ou deixe o
                    material em um ponto parceiro.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <Link
            to="/contato"
            className="participate-card__cta participate-card__cta--primary"
          >
            Comece a Doar
          </Link>
        </article>

        <article className="participate-card card-surface">
          <div className="participate-card__content">
            <div className="participate-card__header">
              <h2>Sou Receptor</h2>
              <p>Preciso de materiais escolares</p>
            </div>

            <ol className="participate-card__steps participate-card__steps--secondary">
              <li>
                <div className="participate-card__step-content">
                  <h3>Cadastre-se</h3>
                  <p>
                    Crie sua conta gratuita informando seu nome, localização e
                    o que você está precisando.
                  </p>
                </div>
              </li>
              <li>
                <div className="participate-card__step-content">
                  <h3>Busque</h3>
                  <p>
                    Pesquise os materiais disponíveis no catálogo por
                    categoria, cidade ou estado de conservação. Sempre
                    gratuito.
                  </p>
                </div>
              </li>
              <li>
                <div className="participate-card__step-content">
                  <h3>Solicite</h3>
                  <p>
                    Demonstre interesse no item e aguarde a confirmação do
                    doador. Todo contato é mediado pela plataforma.
                  </p>
                </div>
              </li>
              <li>
                <div className="participate-card__step-content">
                  <h3>Retire</h3>
                  <p>
                    Combine a retirada presencial ou receba o material em um
                    ponto seguro.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <Link
            to="/catalogo"
            className="participate-card__cta participate-card__cta--secondary"
          >
            Buscar Materiais
          </Link>
        </article>
      </div>
    </section>
  )
}

export default ComoParticipar
