# Roadmap

## Sprint 2 - Base64 Toolkit

Status: concluída.

Entregas:

- Encode e decode via API.
- Suporte completo a UTF-8 e caracteres especiais.
- Copiar, limpar e trocar entrada/resultado.
- Estados visuais e metadados consistentes com o JSON Formatter.
- Componentes de ação e toast compartilhados.
- Testes unitários do processamento Base64.

> O planejamento anterior da Sprint 2 permanece abaixo apenas como registro histórico e foi substituído por este escopo.

## Sprint 0 - Fundação do Projeto

Status: concluída.

Objetivo: criar a base técnica inicial do ERP Toolkit.

Entregas:

- Estrutura `frontend/`, `backend/` e `docs/`.
- Frontend com React, TypeScript, Vite e Tailwind CSS.
- Backend com FastAPI, Uvicorn e SQLite inicial.
- Endpoints base das ferramentas do MVP.
- Dashboard e páginas iniciais das ferramentas.
- Documentação inicial do projeto.

## Sprint 1 - Consolidação do MVP Técnico

Status: concluída.

Objetivo: estabilizar as ferramentas já criadas e melhorar a experiência de uso.

Entregas:

- JSON Formatter completo no frontend e backend.
- Melhorias de UX no JSON Formatter.
- Tratamento de erros estruturado no JSON Formatter.
- Estados de loading e feedback visual no JSON Formatter.
- Status automático para o JSON Formatter.
- Metadados de linhas, caracteres e tempo de processamento.
- Paleta principal azul no frontend.

## Sprint 1.1 - Refinamento de UX do JSON Formatter

Status: concluída.

Objetivo: corrigir pequenos comportamentos e melhorar a experiência do usuário sem criar novas funcionalidades.

Entregas:

- Limpeza do resultado em caso de erro.
- Status `Aguardando JSON`, `Alterações pendentes`, `JSON válido` e `JSON inválido`.
- Botões desabilitados conforme contexto.
- Toast de sucesso ao copiar JSON.
- Mensagens padronizadas.
- Atualização de documentação e changelog.

## Sprint 2 - Qualidade e Testes

Status: planejada.

Objetivo: aumentar confiabilidade do MVP.

Entregas previstas:

- Testes de backend para endpoints principais.
- Testes de frontend para componentes críticos.
- Validação de contratos entre frontend e backend.
- Revisão de padrões de código.
- Documentação técnica complementar.

## Sprint 3 - Novas Ferramentas de Produtividade

Objetivo: ampliar o valor do produto com ferramentas úteis para rotinas de ERP.

Entregas previstas:

- API Tester.
- Log Analyzer.
- Melhorias no SQL Formatter.
- Melhorias no Password Generator.

## Sprint 4 - Preparação para Usuários Reais

Objetivo: preparar o ERP Toolkit para uso mais amplo.

Entregas previstas:

- Autenticação.
- Persistência de histórico quando fizer sentido.
- Preferências de usuário.
- Revisão de segurança.
- Planejamento de deploy web.

## Sprint 5 - Infraestrutura Pós-MVP

Objetivo: estruturar a base de infraestrutura após validação do MVP.

Entregas previstas:

- Docker.
- Estratégia de deploy web.
- Migração planejada para PostgreSQL.
- Configuração por ambientes.

## Versão 1.0

Objetivo: entregar uma versão estável da plataforma para profissionais de ERP.

Critérios esperados:

- Ferramentas principais do MVP estáveis.
- Interface responsiva e consistente.
- Backend com endpoints documentados e testados.
- Padrões de código consolidados.
- Documentação atualizada.
- Estratégia de deploy definida.
- Base pronta para evolução contínua.
