# Arquitetura

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
