# Arquitetura

## Date Converter

O frontend do Date Converter gerencia os formatos, estados e ações seguindo o fluxo do Base64 Toolkit. As regras de parsing e formatação ficam no backend, no endpoint `POST /api/tools/date/convert`, com formatos enumerados e validação de calendário. Unix Timestamp usa segundos em UTC para manter resultados determinísticos.

## Cards de status e metadados

As ferramentas maduras compartilham `ToolStatusCard` para estados tipados e `ToolMetadataCard` para informações flexíveis de processamento. O UUID Generator reutiliza esses cards junto de `ToolPanel`, `PageHeader`, `PrimaryButton`, `ActionButton` e `CopyToast`.

## Base64 Toolkit e componentes compartilhados

O frontend envia texto para endpoints separados de encode e decode. O backend converte explicitamente entre texto UTF-8 e bytes antes de aplicar Base64, preservando caracteres especiais, emojis e alfabetos não latinos.

- `POST /api/tools/base64/encode`
- `POST /api/tools/base64/decode`
- `ActionButton`: ações secundárias e destrutivas compartilhadas.
- `CopyToast`: confirmação temporária de cópia compartilhada.
- `TextAreaField`, `ToolPanel`, `PageHeader`, `PrimaryButton` e `ErrorMessage`: estrutura visual comum.

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
