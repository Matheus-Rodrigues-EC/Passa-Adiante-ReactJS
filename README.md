<p align="center"><img src="./public/logo.png" width="180" alt="Logo Passe Adiante" /></p>
<h1 align="center">Passe Adiante - Frontend</h1>
<p align="center"><strong>Um caderno a menos parado, um estudante a mais preparado.</strong></p>

## Sobre o projeto

O Passe Adiante é um MVP web que conecta pessoas com materiais escolares em bom estado a estudantes, famílias e instituições que precisam deles. A plataforma combate simultaneamente a dificuldade de acesso a recursos educacionais e o desperdício de itens reutilizáveis.

O público inclui estudantes em vulnerabilidade, famílias doadoras, escolas, ONGs, projetos comunitários e instituições que atuam como pontos de apoio. O MVP implementa landing page, cadastro, login, catálogo com busca e filtros, detalhes do item, cadastro de doação, pedidos, perfil e painel administrativo.

## Tecnologias e decisões

- **React 19:** componentes reutilizáveis e atualização eficiente da interface.
- **Vite 8:** desenvolvimento rápido e build de produção otimizado.
- **React Router:** rotas públicas, autenticadas e administrativas.
- **Fetch API:** comunicação centralizada com a API NestJS, sem dependência adicional.
- **CSS responsivo:** identidade própria, bom contraste e adaptação para desktop e celular.

A interface usa componentes compartilhados para layout, proteção de rotas, cartões, formulários, mensagens e estados vazios. A sessão é persistida no navegador e o token JWT acompanha automaticamente as requisições protegidas.

## Estrutura

```text
src/
├── components/      # Layout e proteção de rotas
├── contexts/        # Sessão e autenticação
├── pages/           # Telas e fluxos do MVP
├── services/        # Cliente HTTP centralizado
├── App.jsx          # Mapa de rotas
├── App.css          # Design system e responsividade
└── main.jsx         # Inicialização React
```

## Instalação e execução

Requisitos: Node.js 20+, npm ou pnpm e o [backend Passe Adiante](https://github.com/Matheus-Rodrigues-EC/PassaAdiante-NestJS) em execução.

```bash
git clone https://github.com/Matheus-Rodrigues-EC/Passa-Adiante-ReactJS.git
cd Passa-Adiante-ReactJS
cp .env.example .env
npm install
npm run dev
```

Acesse `http://localhost:5173`. A variável `VITE_API_URL` aponta por padrão para `http://localhost:3000`.

### Qualidade

```bash
npm run lint
npm run build
```

## Como utilizar a aplicação

Qualquer pessoa pode abrir a página inicial e consultar o catálogo. Para solicitar ou doar, basta criar uma conta, escolher como deseja participar e entrar no sistema.

1. **Encontrar materiais:** abra o catálogo, pesquise pelo nome ou filtre a categoria, leia os detalhes e envie uma solicitação.
2. **Fazer uma doação:** acesse “Minhas doações”, descreva o item, informe categoria e conservação e publique.
3. **Acompanhar pedidos:** em “Pedidos”, o solicitante vê o andamento; o doador aprova, recusa e conclui a entrega.
4. **Administrar a comunidade:** usuários `ADMIN` visualizam usuários, itens e pedidos em uma área reservada.

Uma família pode repassar mochilas ao fim do ano letivo; uma escola pode divulgar livros disponíveis; uma ONG pode organizar campanhas; um estudante pode localizar um caderno sem depender de processos complexos. Assim, a solução reduz custos, evita descarte, fortalece redes locais e transforma recursos parados em continuidade educacional.

## Credenciais de demonstração

Após executar o seed do backend, use a senha `PasseAdiante123!`:

| Perfil | E-mail |
|---|---|
| Administrador | `admin@passaadiante.local` |
| Doador | `doador@passaadiante.local` |
| Estudante | `estudante@passaadiante.local` |

As contas são exclusivamente locais e não devem ser usadas em produção.

## Processo de desenvolvimento

A Sprint 3 foi organizada por fluxo vertical: contratos e segurança da API, identidade e componentes da interface, integração, validação e documentação. O GitHub concentra histórico e revisão; branches de funcionalidade e commits convencionais são recomendados. As principais dificuldades foram transformar o protótipo em fluxos reais, alinhar perfis de acesso e manter feedback claro em erros de rede e validação. A solução adotou contratos HTTP centralizados, componentes reutilizáveis e regras de autorização no servidor.

## Evidências do MVP

Os registros da landing page, catálogo, doações, pedidos e administração integram o Relatório Técnico da Sprint 3. Novas capturas podem ser adicionadas em `public/screenshots/`.

## Repositórios

- Frontend: https://github.com/Matheus-Rodrigues-EC/Passa-Adiante-ReactJS
- Backend: https://github.com/Matheus-Rodrigues-EC/PassaAdiante-NestJS

Projeto acadêmico da disciplina Projeto Integrado III do curso de ADS da UFCA.
