# ERP Toolkit

## Sprint 7 - Hash Generator

Status: Em validação.

O Hash Generator gera hashes MD5, SHA-1, SHA-256, SHA-384 e SHA-512 a partir de texto UTF-8, com saída em minúsculas ou maiúsculas. A ferramenta inclui cópia, limpeza, status, metadados e alertas sobre algoritmos legados.

Endpoint:

- `POST /api/tools/hash`

Exemplo:

```json
{
  "content": "ERP Toolkit",
  "algorithm": "sha256",
  "uppercase": false
}
```

MD5 e SHA-1 permanecem disponíveis para integrações legadas, mas não são apresentados como opções seguras para aplicações criptográficas ou armazenamento de senhas.

## Sprint 6 - SQL Multi-Dialeto

Status: Em validação.

O SQL Formatter agora permite selecionar SQL Server, PostgreSQL, MySQL, MariaDB, Oracle, SQLite ou Genérico / ANSI SQL. O backend aplica validações básicas compatíveis com o dialeto escolhido sem converter funções, nomes, aliases ou literais, e o Swagger documenta os valores aceitos e exemplos de uso.

Exemplo:

```json
{
  "sql": "SELECT GETDATE();",
  "dialect": "sqlserver",
  "mode": "format",
  "keywords_uppercase": true,
  "break_lines": true,
  "indent_join": true,
  "indent_case": true,
  "align_select": true
}
```

Endpoint: `POST /api/tools/sql/format`.

## Sprint 5.1 - Release Candidate

Release Candidate concluída com refinamentos no SQL Formatter e compatibilidade total com as ferramentas existentes.

Melhorias principais:

- CTEs com o `SELECT` principal separado após o fechamento do `WITH`.
- `UNION`, `UNION ALL`, `INTERSECT` e `EXCEPT` com o próximo `SELECT` em nova linha.
- Validação flexível para constantes, funções, variáveis, `CAST` e `CONVERT` sem `FROM`.
- Indentação revisada para CASE, JOIN, EXISTS, NOT EXISTS, IN e subqueries.
- Minificação que preserva o conteúdo de literais SQL.

O contrato permanece:

- `POST /api/tools/sql/format`

## Sprint 4 - Password Generator

Sprint 4 concluída com geração profissional de senhas, comprimentos entre 8 e 64 caracteres, grupos configuráveis, exclusão de ambíguos, medidor de força e entropia estimada.

Endpoint:

- `POST /api/tools/password`

Resposta:

- `password`: senha gerada.
- `strength`: classificação de força.
- `entropy`: entropia estimada em bits.

## Sprint 3 - UUID Generator

Sprint 3 concluída com o UUID Generator completo e os componentes compartilhados `ToolStatusCard` e `ToolMetadataCard`, reutilizados também pelo JSON Formatter e Base64 Toolkit.

O UUID Generator oferece:

- Geração de 1, 5, 10, 25, 50 ou 100 UUIDs v4 únicos.
- Copiar um UUID ou copiar todos, mantendo um item por linha.
- Download do resultado em `uuids.txt`.
- Status e metadados de quantidade, caracteres e tempo de geração.
- Endpoint `GET /api/tools/uuid?count=10`, com valores aceitos entre 1 e 100 e documentação no Swagger.

## Sprint 2 - Base64 Toolkit

Sprint 2 concluída com encode, decode, cópia, limpeza, troca entre entrada e resultado, estados visuais e suporte completo a UTF-8. A API expõe `POST /api/tools/base64/encode` e `POST /api/tools/base64/decode`. UUID Generator, Password Generator e SQL Formatter permanecem em versão inicial.

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
- `npm run lint`
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
