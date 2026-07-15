# Arquitetura

## Date Converter

O Date Converter reutiliza os componentes compartilhados das ferramentas maduras e chama `POST /api/tools/date/convert`. Parsing, validação de calendário e formatação ficam centralizados no backend; timestamps Unix são tratados em segundos UTC.

## Cards compartilhados das ferramentas

- `ToolStatusCard`: apresenta status tipado nas variantes `idle`, `pending`, `success`, `error` e `loading`, com ícone opcional.
- `ToolMetadataCard`: apresenta conteúdo textual flexível ou o estado vazio `Sem processamento`.

JSON Formatter, Base64 Toolkit e UUID Generator utilizam os dois componentes para manter consistência sem duplicar estrutura visual.

## Base64 Toolkit

O Base64 Toolkit segue o padrão de página do JSON Formatter e reutiliza `ActionButton`, `CopyToast`, `TextAreaField`, `ToolPanel`, `PageHeader`, `PrimaryButton` e `ErrorMessage`. O backend converte explicitamente entre texto UTF-8 e bytes nos endpoints dedicados de encode e decode.

## Visão Geral

O ERP Toolkit utiliza uma arquitetura com frontend e backend separados. Essa separação permite evoluir a interface, a API e as ferramentas de forma independente, mantendo responsabilidades claras.

## Frontend

O frontend fica em `frontend/` e é responsável pela experiência web do usuário.

Stack atual:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

Organização principal:

- `frontend/src/api/`: cliente HTTP e integrações com o backend.
- `frontend/src/components/`: componentes reutilizáveis.
- `frontend/src/config/`: configurações compartilhadas, como lista de ferramentas.
- `frontend/src/pages/`: páginas de cada ferramenta e do dashboard.
- `frontend/src/App.tsx`: definição das rotas.
- `frontend/src/main.tsx`: entrada da aplicação.
- `frontend/src/styles.css`: estilos globais e diretivas do Tailwind CSS.

## Backend

O backend fica em `backend/` e é responsável por expor a API REST usada pelo frontend.

Stack atual:

- Python
- FastAPI
- Uvicorn
- SQLite inicialmente

Organização principal:

- `backend/app/main.py`: criação da aplicação FastAPI, CORS e rotas.
- `backend/app/schemas.py`: modelos de entrada da API.
- `backend/app/tools.py`: funções de negócio das ferramentas.
- `backend/app/database.py`: configuração inicial do SQLite.
- `backend/requirements.txt`: dependências Python.

## Comunicação REST

O frontend consome o backend via REST API usando Axios.

URLs locais:

- Frontend: `http://localhost:5183`
- Backend: `http://localhost:8000`

Cada ferramenta deve ter um endpoint específico no backend. A interface da ferramenta deve chamar somente os endpoints necessários para sua própria funcionalidade.

## Organização das Pastas

```text
ERPToolkit/
+-- .ai/
|   +-- context.md
|   +-- PROJECT_CONTEXT.md
|   +-- architecture.md
|   +-- coding-standards.md
|   +-- roadmap.md
|   +-- current-sprint.md
|   +-- backlog.md
+-- backend/
+-- docs/
+-- frontend/
+-- PROJECT_CONTEXT.md
+-- README.md
```

## Princípios Arquiteturais

- Separar claramente frontend e backend.
- Manter cada ferramenta independente.
- Evitar acoplamento desnecessário entre páginas, componentes e endpoints.
- Centralizar integrações HTTP no cliente de API do frontend.
- Preferir componentes reutilizáveis para padrões visuais e comportamentais.
- Manter regras de negócio das ferramentas no backend quando dependerem de API.
- Evoluir infraestrutura, autenticação e banco relacional somente após validação do MVP.
- Propor mudanças estruturais antes de implementá-las.

## Estado Visual Atual

O frontend utiliza uma paleta principal azul configurada em `frontend/tailwind.config.js` por meio da escala `brand`.

Essa escala é usada em navegação, botões principais, foco de campos, feedbacks positivos e cards do Dashboard.

## Ferramenta Mais Madura

O JSON Formatter é a ferramenta mais completa no estado atual.

Ele possui:

- Página própria em `frontend/src/pages/JsonFormatterPage.tsx`.
- Endpoint específico em `POST /api/tools/json/format`.
- Schema em `backend/app/schemas.py`.
- Regras de processamento em `backend/app/tools.py`.
- Tratamento de erro estruturado em `backend/app/main.py`.
- Estados de UX refinados: loading, sucesso, erro, pendência, metadados e toast.
