# ERP Toolkit

ERP Toolkit e um conjunto de ferramentas para apoiar rotinas tecnicas de ERP, com frontend em React e backend em FastAPI.

## Estrutura

```text
frontend/  Aplicacao web em React, TypeScript, Vite e Tailwind CSS
backend/   API em Python, FastAPI e SQLite
docs/      Documentacao do projeto
.ai/      Documentacao oficial de contexto para IAs
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

A API ficara disponivel em `http://localhost:8000`.

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

O frontend ficara disponivel em `http://localhost:5183` e consumira o backend em `http://localhost:8000`.

## Scripts

Backend:

- `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

Frontend:

- `npm run dev`
- `npm run build`
- `npm run preview`

## Escopo da primeira versao

Incluido:

- Dashboard
- JSON Formatter
- Base64 encode/decode
- UUID Generator
- Password Generator
- SQL Formatter
- API FastAPI com endpoints das ferramentas
- SQLite configurado inicialmente

Nao incluido nesta versao:

- Docker
- Autenticacao
- Pagamentos
- PostgreSQL

## Para IAs

Qualquer IA que for trabalhar neste projeto deve ler primeiro todos os arquivos da pasta `.ai/` antes de realizar alterações.

Esses documentos concentram o contexto oficial do produto, arquitetura, padrões de código, roadmap, sprint atual e backlog.
