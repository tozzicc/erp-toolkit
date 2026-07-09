# ERP Toolkit

## Visão Geral

O ERP Toolkit é uma plataforma de ferramentas para consultores, analistas e desenvolvedores de ERP, focada em aumentar produtividade e reduzir o tempo gasto em tarefas repetitivas.

A proposta do projeto é reunir utilitários técnicos comuns em uma interface simples, rápida e organizada, permitindo que profissionais de ERP executem tarefas recorrentes sem depender de ferramentas dispersas.

## Estado Atual

O projeto está na conclusão da Sprint 1, com a fundação técnica criada e o JSON Formatter implementado como primeira ferramenta refinada de ponta a ponta.

Estado implementado:

- Frontend separado do backend.
- Frontend em React, TypeScript, Vite, Tailwind CSS, React Router, Axios e Lucide React.
- Backend em Python, FastAPI, Uvicorn e SQLite inicial.
- Comunicação via REST API.
- Layout responsivo com menu lateral.
- Paleta principal azul configurada no tema Tailwind.
- Dashboard com cards das ferramentas do MVP.
- JSON Formatter completo e refinado.
- Demais ferramentas ainda em versão inicial.

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
- React Router
- Axios
- Lucide React

### Backend

- FastAPI
- Python
- Uvicorn

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

## JSON Formatter

O JSON Formatter é a ferramenta mais completa no estado atual.

Funcionalidades implementadas:

- Formatação de JSON.
- Minificação de JSON.
- Validação de JSON.
- Ordenação opcional de chaves.
- Seleção de indentação.
- Resultado somente leitura.
- Cópia do resultado para a área de transferência.
- Status automático: `Aguardando JSON`, `Alterações pendentes`, `JSON válido` e `JSON inválido`.
- Limpeza do resultado em caso de erro.
- Metadados com linhas, caracteres e tempo de processamento em milissegundos.
- Mensagens de sucesso e erro padronizadas.
- Toast de sucesso ao copiar.
- Botões desabilitados conforme contexto.

Endpoint principal:

- `POST /api/tools/json/format`

## Ferramentas em Versão Inicial

- Base64
- UUID Generator
- Password Generator
- SQL Formatter

Essas ferramentas existem no frontend e backend, mas ainda não passaram pelo mesmo refinamento aplicado ao JSON Formatter.

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
- Registrar novas ideias no backlog antes de implementar.
- Propor mudanças estruturais antes de executar.

## Estrutura do Projeto

```text
ERPToolkit/
+-- .ai/
|   +-- PROJECT_CONTEXT.md
|   +-- context.md
|   +-- architecture.md
|   +-- coding-standards.md
|   +-- roadmap.md
|   +-- current-sprint.md
|   +-- backlog.md
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
+-- CHANGELOG.md
+-- PROJECT_CONTEXT.md
+-- README.md
```

## Como Contribuir

Toda alteração deve preservar a arquitetura existente.

Antes de criar uma nova funcionalidade, verificar se ela realmente agrega valor ao produto e se está alinhada com a missão de economizar tempo para profissionais de ERP.

Mudanças estruturais devem ser propostas e avaliadas antes da implementação.

## Futuro

O ERP Toolkit deverá evoluir para uma plataforma completa para profissionais de ERP, mantendo sempre foco em produtividade e qualidade.

## Como Utilizar Este Documento

Este arquivo é uma fonte oficial de contexto do projeto ERP Toolkit.

Qualquer pessoa ou IA que for modificar o projeto deve ler este documento antes de realizar alterações. Ele deve ser usado para compreender os objetivos do produto, a arquitetura, os padrões adotados, as regras de desenvolvimento e os critérios para decidir se uma funcionalidade pertence ao MVP.

Ao propor ou implementar mudanças, utilize este documento como referência principal para manter consistência técnica e alinhamento com a missão do produto.
