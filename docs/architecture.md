# Arquitetura

## Visao geral

O ERP Toolkit esta dividido em duas aplicacoes independentes:

- `frontend`: interface web em React, TypeScript, Vite e Tailwind CSS.
- `backend`: API HTTP em Python com FastAPI, Uvicorn e SQLite.

## Comunicacao

O frontend consome a API em `http://localhost:8000` atraves de Axios. Durante o desenvolvimento, o Vite roda em `http://localhost:5183`.

## Decisoes iniciais

- SQLite foi escolhido para manter a primeira versao simples.
- Nao ha autenticacao, pagamentos, Docker ou PostgreSQL nesta etapa.
- As ferramentas ficam isoladas em paginas e usam componentes compartilhados para preservar consistencia visual.
