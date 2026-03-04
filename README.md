# LabGestao - Sistema de Gestão de um Laboratório de Investigação

Este projeto foi feito com recurso às tecnologias:
[Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.
[TypeScript] (Strict mode)
[HTML5]
[CSS3]

## Aluno
Nome: Carine Gonçalves
Disciplina: Programação em JavaScript
Curso: UpSkill ServiceNow

## Descrição
Projeto Final da disciplina que compreende uma aplicação Single Page Application (SPA) desenvolvida em Angular para gerir os recursos de um laboratório de investigação científica.

## Funcionalidades
 --> Dashboard - com KPIs em tempo real (investigadores, projetos e equipamentos);
 --> CRUD - Gestão de Investigadores: listar, pesquisar, filtrar, criar, editar e apagar;
          - Gestão de Projetos: listar, pesquisar, filtrar por estado, criar, editar e apagar;
          - Gestão de Equipamentos: listar, pesquisar, filtrar por estado, criar, editar e apagar;
--> pagina de Detalhe - para cada item com rota dinâmica '/detalhe/:tipo/:id';
--> Formulário - para criação e edição com validações e feedback visual
--> Persistência de dados - via localStorage


## Para correr o projeto

### Pre-Requisitos:
Node js
Angular CLI ("npm install -g @angular/cli")

### Instalação
```bash

- clonar o repositório

git clone https://github.com/gcarine-AI/Gestao-Laboratorio.git

entrar na pasta:
cd lab-gestao

instalar dependências:
npm install

correr a aplicação:
ng serve
```

Abrir o browser e navegar em `http://localhost:4200/`



## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```



## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Estrutura do Projeto
```
src/app/
├── models/          → Interfaces TypeScript
├── services/        → Lógica de negócio e LocalStorage
├── components/      → Componentes reutilizáveis (Card)
├── pages/           → Páginas da aplicação
│   ├── dashboard/
│   ├── investigadores/
│   ├── projetos/
│   ├── equipamentos/
│   ├── detalhe/
│   └── formulario/
└── pipes/           → StatusPipe (formatação de estados)
```
