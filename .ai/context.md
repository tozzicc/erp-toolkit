# ERP Toolkit

## Visão Geral

O ERP Toolkit é uma plataforma de ferramentas para consultores, analistas e desenvolvedores de ERP, focada em aumentar produtividade e reduzir o tempo gasto em tarefas repetitivas.

A proposta do projeto é reunir utilitários técnicos comuns em uma interface simples, rápida e organizada, permitindo que profissionais de ERP executem tarefas recorrentes sem depender de ferramentas dispersas.

## Missão

Criar ferramentas que economizem tempo para profissionais de ERP.

## Público-alvo

- Consultores ERP
- Desenvolvedores
- Analistas de Sistemas
- DBAs
- Equipes de Sustentação
- Equipes de Integração

## Objetivos do Produto

- Interface simples
- Ferramentas rápidas
- Alta produtividade
- Código limpo
- Fácil manutenção
- Arquitetura escalável

## Stack Tecnológica

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- FastAPI
- Python

### Banco

- SQLite inicialmente
- PostgreSQL futuramente

### Infraestrutura

- Docker somente após MVP
- Deploy Web após MVP

## Arquitetura

O frontend é separado do backend.

A comunicação entre frontend e backend acontece via REST API.

Cada ferramenta deve ser independente e evoluir sem acoplamento desnecessário com as demais.

Cada ferramenta deve possuir:

- Página própria
- Componentes reutilizáveis
- Endpoint específico
- Testes futuramente

## Filosofia

Cada funcionalidade deve responder à pergunta:

> "Isso economiza tempo para um consultor de ERP?"

Se não economizar tempo, provavelmente não faz parte do MVP.

## Princípios

- Simplicidade
- Código limpo
- Componentização
- SOLID quando aplicável
- Reutilização
- Performance
- Legibilidade
- Escalabilidade

## Regras de Desenvolvimento

- Nunca duplicar código.
- Sempre reutilizar componentes.
- Sempre utilizar TypeScript.
- Evitar dependências desnecessárias.
- Priorizar legibilidade.
- Criar componentes pequenos.
- Documentar funcionalidades importantes.

## Roadmap do MVP

- Dashboard
- JSON Formatter
- Base64
- UUID Generator
- Password Generator
- SQL Formatter

Posteriormente:

- API Tester
- Log Analyzer
- AI Assistant
- Autenticação

## Estrutura do Projeto

```text
ERPToolkit/
+-- backend/
|   +-- app/
|   |   +-- __init__.py
|   |   +-- database.py
|   |   +-- main.py
|   |   +-- schemas.py
|   |   +-- tools.py
|   +-- requirements.txt
+-- docs/
|   +-- architecture.md
+-- frontend/
|   +-- src/
|   |   +-- api/
|   |   +-- components/
|   |   +-- config/
|   |   +-- pages/
|   |   +-- App.tsx
|   |   +-- main.tsx
|   |   +-- styles.css
|   +-- index.html
|   +-- package.json
|   +-- postcss.config.js
|   +-- tailwind.config.js
|   +-- tsconfig.json
|   +-- tsconfig.node.json
|   +-- vite.config.ts
+-- .gitignore
+-- PROJECT_CONTEXT.md
+-- README.md
```

### Backend

O backend concentra a API FastAPI, os schemas de entrada, as funções das ferramentas e a configuração inicial do SQLite.

### Frontend

O frontend concentra a interface React, as rotas, as páginas das ferramentas, a configuração visual e os componentes reutilizáveis.

### Docs

A pasta `docs/` armazena documentação técnica complementar do projeto.

## Como contribuir

Toda alteração deve preservar a arquitetura existente.

Antes de criar uma nova funcionalidade, verificar se ela realmente agrega valor ao produto e se está alinhada com a missão de economizar tempo para profissionais de ERP.

Mudanças estruturais devem ser propostas e avaliadas antes da implementação.

## Futuro

O ERP Toolkit deverá evoluir para uma plataforma completa para profissionais de ERP, mantendo sempre foco em produtividade e qualidade.

## Como utilizar este documento

Este arquivo é a fonte oficial de contexto do projeto ERP Toolkit.

Qualquer pessoa ou IA que for modificar o projeto deve ler este documento antes de realizar alterações. Ele deve ser usado para compreender os objetivos do produto, a arquitetura, os padrões adotados, as regras de desenvolvimento e os critérios para decidir se uma funcionalidade pertence ao MVP.

Ao propor ou implementar mudanças, utilize este documento como referência principal para manter consistência técnica e alinhamento com a missão do produto.
