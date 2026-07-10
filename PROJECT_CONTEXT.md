# ERP Toolkit

## Sprint 5.1 - Release Candidate

Sprint 5.1 concluída como refinamento compatível do SQL Formatter. CTEs agora separam corretamente o `SELECT` principal, operações `UNION`, `UNION ALL`, `INTERSECT` e `EXCEPT` iniciam o próximo `SELECT` em nova linha, e o validador aceita expressões e funções legítimas sem `FROM` enquanto continua rejeitando identificadores de coluna isolados.

Compatibilidade preservada:

- Nenhuma alteração nos contratos públicos do SQL Formatter.
- Nenhuma alteração no layout principal ou nos componentes compartilhados.
- JSON Formatter, Base64 Toolkit, UUID Generator e Password Generator permanecem inalterados.
- Lint, build e 27 testes automatizados aprovados.

## Sprint 5 - SQL Formatter

O SQL Formatter está completo com formatação, minificação, validação, cópia, exemplo, limpeza, opções configuráveis, status, metadados e suporte a CTEs, CASE, JOINs, subqueries, EXISTS e operações de conjunto.

## Sprint 4 - Password Generator

Sprint 4 concluída. O Password Generator oferece comprimentos predefinidos entre 8 e 64 caracteres, seleção de grupos, exclusão de caracteres ambíguos, resultado somente leitura, cópia, limpeza, medidor de força e metadados de entropia e tempo. O endpoint `POST /api/tools/password` retorna `password`, `strength` e `entropy` e está documentado no Swagger.

## Sprint 3 - UUID Generator

Sprint 3 concluída. O UUID Generator gera de 1 a 100 UUIDs v4 únicos, permite copiar, copiar todos, baixar `uuids.txt` e limpar, além de exibir status e metadados. O endpoint `GET /api/tools/uuid?count=10` valida `count` entre 1 e 100 e está documentado no Swagger. Os componentes `ToolStatusCard` e `ToolMetadataCard` são compartilhados por JSON Formatter, Base64 Toolkit e UUID Generator.

## Entregas atuais

- JSON Formatter completo, com formatação, validação, minificação, status, metadados e cópia.
- Base64 Toolkit completo, com encode, decode, copiar, limpar e trocar entrada/resultado.
- Endpoints `POST /api/tools/base64/encode` e `POST /api/tools/base64/decode`.
- Componentes visuais reutilizáveis, incluindo `ActionButton`, `CopyToast`, `ToolStatusCard` e `ToolMetadataCard`.
- Testes unitários do processamento Base64 para UTF-8 e entradas inválidas.
- UUID Generator e Password Generator completos; SQL Formatter ainda em versão inicial.

## Validação da Sprint 4

- Lint e build de produção do frontend aprovados.
- Treze testes do backend aprovados.
- Todos os comprimentos, combinações de grupos e níveis de força validados.
- Exclusão de caracteres ambíguos e contrato OpenAPI validados.
- JSON Formatter, Base64 Toolkit e UUID Generator permaneceram inalterados.

## Validação da Sprint 3

- Lint e build de produção do frontend aprovados.
- Sete testes do backend aprovados.
- Quantidades de 1, 5, 10, 25, 50 e 100 UUIDs validadas sem duplicações.
- JSON Formatter e Base64 Toolkit preservados após a refatoração dos cards compartilhados.

Estado atual: Sprint 5.1 Release Candidate concluída, com as cinco ferramentas principais refinadas e compatíveis.

O ERP Toolkit é uma plataforma de ferramentas para consultores, analistas e desenvolvedores de ERP, focada em aumentar produtividade e reduzir o tempo gasto em tarefas repetitivas.

A documentação oficial de contexto, arquitetura, padrões, roadmap, sprint atual e backlog está centralizada na pasta `.ai/`.

Antes de modificar o projeto, leia primeiro:

- `.ai/PROJECT_CONTEXT.md`
- `.ai/context.md`
- `.ai/architecture.md`
- `.ai/coding-standards.md`
- `.ai/roadmap.md`
- `.ai/current-sprint.md`
- `.ai/backlog.md`
