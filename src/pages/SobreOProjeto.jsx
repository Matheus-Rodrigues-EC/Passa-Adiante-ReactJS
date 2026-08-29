import imagemSobre from '../assets/imagem-sobre.svg'
import iconeLivro from '../assets/icone-livro.svg'
import iconeFolha from '../assets/icone-folha.svg'
import iconeCoracao from '../assets/icone-coracao.svg'
import iconeCiclo from '../assets/icone-ciclo.svg'

function SobreOProjeto() {
  return (
    <>
      <section id="about-section">
        <h1 className="page-title">Sobre o projeto</h1>

        <div className="about-content">
          <div className="about-content__media">
            <img
              src={imagemSobre}
              alt="Voluntários organizando materiais escolares doados numa mesa"
            />
          </div>

          <div className="about-content__text">
            <p>
              <strong>PassaAdiante</strong> surgiu como trabalho acadêmico e
              rapidamente revelou seu potencial transformador. Identificamos
              que muitos estudantes abandonam o ensino por falta de materiais
              básicos, enquanto esses mesmos itens são descartados por
              famílias que não precisam mais deles.
            </p>
            <p>
              Nossa ambição é reduzir o desperdício escolar no Brasil,
              conectando quem tem o que doar a quem mais precisa.
            </p>
          </div>
        </div>

        <div className="about-features">
          <div className="about-features__item card-surface">
            <img className="about-features__icon" src={iconeLivro} alt="" />
            <b>Educação Acessível</b>
            <p>
              Garantir que a falta de materiais nunca seja motivo para um
              estudante abandonar a escola.
            </p>
          </div>

          <div className="about-features__item card-surface">
            <img className="about-features__icon" src={iconeFolha} alt="" />
            <b>Sustentabilidade</b>
            <p>
              Cada item doado evita que mais plástico e papel acabem no lixo,
              prolongando seu ciclo de vida.
            </p>
          </div>

          <div className="about-features__item card-surface">
            <img className="about-features__icon" src={iconeCoracao} alt="" />
            <b>Solidariedade</b>
            <p>
              Comunidades inteiras se mobilizam quando percebem que pequenas
              ações geram grandes mudanças.
            </p>
          </div>

          <div className="about-features__item card-surface">
            <img className="about-features__icon" src={iconeCiclo} alt="" />
            <b>Economia Circular</b>
            <p>
              Inserimos materiais escolares em um ciclo contínuo de uso,
              doação e reaproveitamento responsável.
            </p>
          </div>
        </div>
      </section>

      <section id="team-section">
        <h2>Quem faz o Passa Adiante</h2>
        <p>
          Somos a equipe Anteiku, do Polo Caucaia, desenvolvendo este projeto
          na disciplina de Desenvolvimento para Web da UFCA.
        </p>

        <ul className="team-section__list">
          <li>Holivane Holanda</li>
          <li>Rodrigo Bezerra</li>
          <li>Sara Ferreira</li>
        </ul>
      </section>
    </>
  )
}

export default SobreOProjeto
