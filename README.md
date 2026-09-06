# 🧰 ERP Toolkit

> 🇺🇸 A full-stack collection of utilities designed to support ERP, development, data conversion, SQL and system integration workflows.  
> 🇧🇷 Uma coleção full-stack de ferramentas desenvolvidas para apoiar rotinas de ERP, desenvolvimento, conversão de dados, SQL e integração de sistemas.

---

# 🇺🇸 English

## 📌 About the Project

**ERP Toolkit** is a full-stack web application that brings together practical utilities commonly used in ERP environments, software development, database operations and system integrations.

The project combines a React and TypeScript frontend with a Python and FastAPI backend, providing a centralized interface for technical tools that would otherwise require separate applications, scripts or online services.

The application was designed as a practical development project and portfolio solution, with emphasis on reusable tools, API integration, validation and a clean user experience.

---

## ✨ Main Tools

### 🧾 JSON Formatter

Provides JSON formatting and validation features, including:

- JSON validation
- Pretty formatting
- Minification
- Optional key sorting
- Configurable indentation
- Standardized validation messages
- Processing status
- Metadata
- Copy-to-clipboard support

API:

`POST /api/tools/json/format`

---

### 🔄 Base64 Toolkit

Provides Base64 encoding and decoding with complete UTF-8 support.

Features include:

- Encode text to Base64
- Decode Base64
- Copy results
- Clear fields
- Swap input and output
- Processing status and visual feedback

API:

`POST /api/tools/base64/encode`

`POST /api/tools/base64/decode`

---

### 🆔 UUID Generator

Generates unique UUID v4 identifiers.

Features include:

- Generate 1, 5, 10, 25, 50 or 100 UUIDs
- Copy individual UUIDs
- Copy all generated UUIDs
- Download results as `uuids.txt`
- Generation metadata
- Processing status

API:

`GET /api/tools/uuid?count=10`

Accepted quantity: 1 to 100 UUIDs.

---

### 🔐 Password Generator

Generates configurable passwords with lengths between 8 and 64 characters.

Features include:

- Configurable character groups
- Ambiguous character exclusion
- Password strength indicator
- Estimated entropy calculation

API:

`POST /api/tools/password`

Response includes:

- `password`
- `strength`
- `entropy`

---

### 🗄️ SQL Formatter

SQL formatting and validation utility with multi-dialect support.

Supported dialects:

- SQL Server
- PostgreSQL
- MySQL
- MariaDB
- Oracle
- SQLite
- Generic / ANSI SQL

Features include:

- SQL formatting
- SQL minification
- Configurable keyword capitalization
- JOIN indentation
- CASE indentation
- SELECT alignment
- CTE formatting
- UNION / UNION ALL formatting
- INTERSECT and EXCEPT support
- Subquery formatting
- Preservation of SQL literals

API:

`POST /api/tools/sql/format`

Example:

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

---

### #️⃣ Hash Generator

Generates cryptographic and legacy hashes from UTF-8 text.

Supported algorithms:

- MD5
- SHA-1
- SHA-256
- SHA-384
- SHA-512

Features include:

- Uppercase or lowercase output
- Copy result
- Clear fields
- Processing status
- Metadata
- Legacy algorithm warnings

API:

`POST /api/tools/hash`

Example:

```json
{
  "content": "ERP Toolkit",
  "algorithm": "sha256",
  "uppercase": false
}
```

> MD5 and SHA-1 are available for legacy integration scenarios but should not be considered secure algorithms for password storage or modern cryptographic applications.

---

### 📅 Date Converter

Converts dates between multiple formats with strict validation.

Supported formats include:

- `dd/MM/yyyy`
- `dd/MM/yyyy HH:mm`
- ISO 8601
- Unix Timestamp
- `yyyy-MM-dd`

Invalid dates and timestamps are rejected with user-friendly validation messages.

Unix timestamps are interpreted and generated in UTC seconds, providing deterministic conversions between environments.

API:

`POST /api/tools/date/convert`

Example:

```json
{
  "value": "10/07/2026 14:30",
  "source_format": "dd/MM/yyyy HH:mm",
  "target_format": "ISO 8601"
}
```

---

## 🛠️ Technologies

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Python
- FastAPI
- SQLite
- REST API

### Development

- Git
- GitHub
- npm
- Uvicorn

---

## 🏗️ Project Structure

```text
erp-toolkit/
├── .ai/          # AI project context and development documentation
├── backend/      # Python / FastAPI backend
├── docs/         # Project documentation
├── frontend/     # React / TypeScript web application
├── CHANGELOG.md
├── PROJECT_CONTEXT.md
└── README.md
```

---

## ⚙️ Requirements

- Node.js 20+
- npm 10+
- Python 3.11+

---

## 🚀 Running the Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

`http://localhost:8000`

Health check:

```bash
curl http://localhost:8000/health
```

---

## 💻 Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

`http://localhost:5183`

The application communicates with the backend at:

`http://localhost:8000`

---

## 📜 Available Scripts

### Backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

---

# 🇧🇷 Português

## 📌 Sobre o Projeto

**ERP Toolkit** é uma aplicação web full-stack que reúne ferramentas práticas utilizadas em ambientes de ERP, desenvolvimento de software, operações com bancos de dados e integração de sistemas.

O projeto combina um frontend desenvolvido em React e TypeScript com um backend em Python e FastAPI, oferecendo uma interface centralizada para ferramentas técnicas que normalmente exigiriam aplicações, scripts ou serviços separados.

A aplicação foi desenvolvida como um projeto prático e de portfólio, com foco em ferramentas reutilizáveis, integração via API, validações e uma experiência de uso simples e organizada.

---

## ✨ Principais Ferramentas

### 🧾 JSON Formatter

Ferramenta para formatação e validação de JSON.

Principais recursos:

- Validação de JSON
- Formatação
- Minificação
- Ordenação opcional de chaves
- Indentação configurável
- Mensagens padronizadas de validação
- Status de processamento
- Metadados
- Cópia do resultado

API:

`POST /api/tools/json/format`

---

### 🔄 Base64 Toolkit

Ferramenta para codificação e decodificação Base64 com suporte completo a UTF-8.

Principais recursos:

- Codificar texto para Base64
- Decodificar Base64
- Copiar resultados
- Limpar campos
- Trocar entrada e resultado
- Status e feedback visual

API:

`POST /api/tools/base64/encode`

`POST /api/tools/base64/decode`

---

### 🆔 UUID Generator

Gerador de identificadores UUID v4 únicos.

Principais recursos:

- Geração de 1, 5, 10, 25, 50 ou 100 UUIDs
- Cópia individual
- Cópia de todos os UUIDs
- Download em `uuids.txt`
- Metadados da geração
- Status de processamento

API:

`GET /api/tools/uuid?count=10`

Quantidade aceita: entre 1 e 100 UUIDs.

---

### 🔐 Password Generator

Gerador configurável de senhas entre 8 e 64 caracteres.

Principais recursos:

- Grupos de caracteres configuráveis
- Exclusão de caracteres ambíguos
- Indicador de força da senha
- Cálculo estimado de entropia

API:

`POST /api/tools/password`

A resposta contém:

- `password`
- `strength`
- `entropy`

---

### 🗄️ SQL Formatter

Ferramenta para formatação e validação de SQL com suporte a múltiplos dialetos.

Dialetos suportados:

- SQL Server
- PostgreSQL
- MySQL
- MariaDB
- Oracle
- SQLite
- SQL Genérico / ANSI

Principais recursos:

- Formatação SQL
- Minificação SQL
- Capitalização configurável de palavras-chave
- Indentação de JOIN
- Indentação de CASE
- Alinhamento de SELECT
- Formatação de CTEs
- Suporte a UNION e UNION ALL
- Suporte a INTERSECT e EXCEPT
- Formatação de subqueries
- Preservação de literais SQL

API:

`POST /api/tools/sql/format`

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

---

### #️⃣ Hash Generator

Gerador de hashes a partir de textos UTF-8.

Algoritmos disponíveis:

- MD5
- SHA-1
- SHA-256
- SHA-384
- SHA-512

Principais recursos:

- Resultado em letras maiúsculas ou minúsculas
- Cópia do resultado
- Limpeza dos campos
- Status de processamento
- Metadados
- Alertas para algoritmos legados

API:

`POST /api/tools/hash`

Exemplo:

```json
{
  "content": "ERP Toolkit",
  "algorithm": "sha256",
  "uppercase": false
}
```

> MD5 e SHA-1 permanecem disponíveis para cenários de integração com sistemas legados, mas não devem ser considerados algoritmos seguros para armazenamento de senhas ou aplicações criptográficas modernas.

---

### 📅 Date Converter

Ferramenta para conversão de datas entre diferentes formatos com validação estrita.

Formatos suportados incluem:

- `dd/MM/yyyy`
- `dd/MM/yyyy HH:mm`
- ISO 8601
- Unix Timestamp
- `yyyy-MM-dd`

Datas inexistentes e timestamps inválidos são rejeitados com mensagens amigáveis.

Os timestamps Unix são interpretados e gerados em UTC, em segundos, garantindo conversões determinísticas entre diferentes ambientes.

API:

`POST /api/tools/date/convert`

Exemplo:

```json
{
  "value": "10/07/2026 14:30",
  "source_format": "dd/MM/yyyy HH:mm",
  "target_format": "ISO 8601"
}
```

---

## 🛠️ Tecnologias

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Python
- FastAPI
- SQLite
- REST API

### Desenvolvimento

- Git
- GitHub
- npm
- Uvicorn

---

## 🏗️ Estrutura do Projeto

```text
erp-toolkit/
├── .ai/          # Contexto do projeto e documentação para IA
├── backend/      # Backend Python / FastAPI
├── docs/         # Documentação do projeto
├── frontend/     # Aplicação web React / TypeScript
├── CHANGELOG.md
├── PROJECT_CONTEXT.md
└── README.md
```

---

## ⚙️ Requisitos

- Node.js 20+
- npm 10+
- Python 3.11+

---

## 🚀 Executando o Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

A API ficará disponível em:

`http://localhost:8000`

Endpoint de saúde:

```bash
curl http://localhost:8000/health
```

---

## 💻 Executando o Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em:

`http://localhost:5183`

A aplicação consumirá o backend em:

`http://localhost:8000`

---

## 📜 Scripts Disponíveis

### Backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

---

## 🤖 Contexto para IA

Antes de realizar alterações no projeto, ferramentas de IA utilizadas no desenvolvimento devem consultar a documentação disponível na pasta:

`.ai/`

Esses documentos concentram informações sobre contexto do produto, arquitetura, padrões de desenvolvimento, roadmap, sprint atual e backlog.

Arquivo de entrada recomendado:

`.ai/PROJECT_CONTEXT.md`

---

## 👨‍💻 Author | Autor

**Camilo Tozzi**

🇺🇸 IT Professional focused on ERP, SQL Server, web development and business solutions.

🇧🇷 Profissional de TI com foco em ERP, SQL Server, desenvolvimento web e soluções para negócios.
