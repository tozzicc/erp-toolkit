# ERP Toolkit

ERP Toolkit é um conjunto de ferramentas para apoiar rotinas técnicas de ERP, com frontend em React e backend em FastAPI.

## Estrutura

```text
frontend/  Aplicação web em React, TypeScript, Vite e Tailwind CSS
backend/   API em Python, FastAPI e SQLite
docs/      Documentação do projeto
.ai/       Documentação oficial de contexto para IAs
```

## Requisitos

- Node.js 20+
- npm 10+
- Python 3.11+

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

A API ficará disponível em `http://localhost:8000`.

Endpoint de saude:

```bash
curl http://localhost:8000/health
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em `http://localhost:5183` e consumirá o backend em `http://localhost:8000`.

## Scripts

Backend:

- `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

Frontend:

- `npm run dev`
- `npm run build`
- `npm run preview`

## Estado Atual

Sprint 1 concluída.

Implementado:

- Dashboard com cards das ferramentas.
- Layout responsivo com menu lateral.
- Paleta principal azul.
- JSON Formatter completo com formatação, validação, minificação, ordenação opcional de chaves, indentação configurável, mensagens padronizadas, status automático, metadados e toast de cópia.
- Backend FastAPI com endpoint `POST /api/tools/json/format`.
- Ferramentas Base64, UUID Generator, Password Generator e SQL Formatter em versão inicial.

## Escopo da primeira versão

Incluído:

- Dashboard
- JSON Formatter
- Base64 encode/decode
- UUID Generator
- Password Generator
- SQL Formatter
- API FastAPI com endpoints das ferramentas
- SQLite configurado inicialmente

Não incluído nesta versão:

- Docker
- Autenticacao
- Pagamentos
- PostgreSQL

## Para IAs

Qualquer IA que for trabalhar neste projeto deve ler primeiro todos os arquivos da pasta `.ai/` antes de realizar alterações.

Esses documentos concentram o contexto oficial do produto, arquitetura, padrões de código, roadmap, sprint atual e backlog.

Arquivo de entrada recomendado:

- `.ai/PROJECT_CONTEXT.md`
