
# LabGestão - Sistema de Gestão de um Laboratório de Investigação

## Tecnologias
- Angular CLI 21.2.0 | TypeScript | HTML5 | CSS3
- Supabase (base de dados e autenticação)
- Docker + Nginx
- GitHub Actions (CI/CD)
- Vercel (deploy automático)

## Aluno
**Nome:** Carine Gonçalves
**Disciplina:** Integração de Processos
**Curso:** UpSkill ServiceNow

## Descrição
Aplicação SPA desenvolvida em Angular para gerir os recursos de um laboratório de investigação científica, com autenticação, base de dados real e pipeline CI/CD completo.

## Funcionalidades
- 🔐 Autenticação — login e registo via Supabase Auth
- 🏠 Dashboard — KPIs em tempo real
- 👩‍🔬 Gestão de Investigadores — listar, pesquisar, filtrar, criar, editar e apagar
- 📋 Gestão de Projetos — listar, pesquisar, filtrar, criar, editar e apagar
- 🔧 Gestão de Equipamentos — listar, pesquisar, filtrar, criar, editar e apagar
- 📄 Detalhe — rota dinâmica `/detalhe/:tipo/:id`
- 📝 Formulário — criação e edição com validações e feedback visual
- 🔍 Pesquisa global na navbar

## Aplicação em Produção
🌐 [gestao-laboratoriovercel.vercel.app](https://gestao-laboratoriovercel.vercel.app)

## Correr com Docker
```bash
docker build -t lab-gestao .
docker run -p 8080:80 lab-gestao
```
Abre o browser em `http://localhost:8080`

## Correr localmente
**Pré-Requisitos:** Node.js | Angular CLI
```bash
# Clonar o repositório
git clone https://github.com/gcarine-AI/Gestao-Laboratorio.git
cd lab-gestao

# Instalar dependências
npm install

# Correr a aplicação
ng serve
```
Abre o browser em `http://localhost:4200`

## CI/CD
- **CI:** GitHub Actions corre lint e build automaticamente em cada Pull Request
- **CD:** Vercel faz deploy automático quando há merge na branch `develop-idp`

## Estrutura do Projeto
```
src/app/
├── auth/            → Componente de autenticação
├── guards/          → Auth Guard para proteção de rotas
├── models/          → Interfaces TypeScript
├── services/        → LabService (Supabase) + SupabaseService
├── components/      → Componentes reutilizáveis (Card)
├── pages/           → Páginas da aplicação
│   ├── dashboard/
│   ├── investigadores/
│   ├── projetos/
│   ├── equipamentos/
│   ├── detalhe/
│   └── formulario/
└── pipes/           → StatusPipe
```
