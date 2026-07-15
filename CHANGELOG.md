# Changelog

> Documentação, contexto técnico e validações atualizados até a Sprint 5.1 Release Candidate em 10/07/2026.

## Unreleased

### Date Converter

- Adicionado Date Converter ao Dashboard, menu lateral e rota `/date-converter`.
- Implementadas conversões entre `dd/MM/yyyy`, `dd/MM/yyyy HH:mm`, ISO 8601, Unix Timestamp e `yyyy-MM-dd`.
- Adicionadas validações estritas para datas inexistentes, formatos incompatíveis e timestamps inválidos.
- Criado `POST /api/tools/date/convert` com contrato tipado e documentação OpenAPI.
- Reutilizados os componentes compartilhados de layout, painéis, campos, status, metadados, ações, erros e toast.
- Adicionados testes de conversão, validação, contrato e regressão do backend.

### Sprint 7 - Hash Generator (Em validação)

- Adicionado Hash Generator ao Dashboard, menu lateral e rotas da aplicação.
- Implementados MD5, SHA-1, SHA-256, SHA-384 e SHA-512, com SHA-256 como padrão.
- Adicionada saída em letras minúsculas ou maiúsculas e suporte integral a conteúdo UTF-8.
- Incluídos avisos de segurança para MD5, SHA-1 e armazenamento de senhas.
- Reutilizados os componentes compartilhados de layout, entrada, status, metadados, ações, erros e toast.
- Criado `POST /api/tools/hash` com enum centralizado e processamento por `hashlib`.
- Atualizado o Swagger com payload, resposta, algoritmos permitidos, erros e exemplos.
- Adicionados testes de hashes conhecidos, UTF-8, conteúdo grande, caixa da saída, validação e OpenAPI.
- Aprovados 38 testes backend, lint, TypeScript, build Vite e regressão responsiva no navegador.

### Sprint 6 - SQL Multi-Dialeto (Em validação)

- Adicionado seletor de banco de dados ao SQL Formatter com SQL Server como padrão.
- Adicionados SQL Server, PostgreSQL, MySQL, MariaDB, Oracle, SQLite e Genérico / ANSI SQL ao contrato da API.
- Centralizados enum, nomes e capacidades de cada dialeto no backend.
- Implementadas validações básicas para funções, `LIMIT`, `TOP`, `FETCH FIRST` e uso de `FROM DUAL` em Oracle.
- Preservadas formatação, minificação e estruturas existentes, sem conversão automática entre funções de bancos.
- Incluído o dialeto nos metadados exibidos pela interface.
- Atualizado o OpenAPI com enum e exemplos de SQL Server, PostgreSQL e Oracle.
- Adicionados testes por dialeto, testes cruzados e regressão completa do backend.
- Aprovados 31 testes backend, lint e build de produção do frontend.

### Sprint 5.1 - Release Candidate

- Refinada a saída de CTEs para iniciar o `SELECT` principal em uma nova linha após o fechamento do `WITH`.
- Normalizados `UNION`, `UNION ALL`, `INTERSECT` e `EXCEPT`, sempre com o próximo `SELECT` em nova linha.
- Flexibilizada a validação de `SELECT` sem `FROM` para expressões, constantes, variáveis e funções válidas.
- Mantida a rejeição de identificadores de coluna isolados, como `SELECT A1_COD`.
- Revisadas as indentações de CASE, JOIN, EXISTS, NOT EXISTS, IN e subqueries.
- Preservados endpoint, payload, resposta, layout e componentes públicos do SQL Formatter.
- Confirmada compatibilidade com JSON Formatter, Base64 Toolkit, UUID Generator e Password Generator.

### SQL Formatter

- Implementados formatar, minificar, validar, copiar, exemplo e limpar.
- Adicionadas opções de keywords, quebra de linhas, JOIN, CASE e alinhamento de SELECT.
- Adicionado suporte estruturado a CTEs, subqueries, CASE, JOINs e operações de conjunto.
- Adicionadas validações básicas de parênteses, aspas, CASE e SELECTs sem origem válida.
- Integrado `sqlparse` ao backend sem alteração do endpoint público.
- Adicionados testes de formatação, opções, minificação, validação e contrato OpenAPI.

### Password Generator

- Implementados comprimentos de 8, 12, 16, 20, 24, 32, 48 e 64 caracteres.
- Adicionadas seleções de maiúsculas, minúsculas, números, símbolos e exclusão de caracteres ambíguos.
- Adicionados resultado somente leitura, copiar, limpar, toast e estados padronizados.
- Implementado medidor visual com níveis `Muito fraca`, `Fraca`, `Média`, `Forte` e `Muito forte`.
- Adicionados metadados de caracteres, entropia estimada e tempo de geração.
- Atualizado `POST /api/tools/password` com contrato completo e documentação no Swagger.
- Adicionados testes para comprimentos, combinações de grupos, ambíguos, entropia, força e OpenAPI.

### UUID Generator

- Implementada geração de 1, 5, 10, 25, 50 ou 100 UUIDs v4 sem duplicações.
- Adicionadas ações contextuais de copiar, copiar todos, baixar `uuids.txt` e limpar.
- Adicionados status de espera, processamento, sucesso e erro.
- Adicionados metadados com quantidade, caracteres e tempo de processamento.
- Atualizado `GET /api/tools/uuid` com parâmetro `count`, validação entre 1 e 100 e documentação no Swagger.
- Adicionados testes de validade, versão, unicidade, quantidades suportadas, performance e contrato OpenAPI.
- Configurado ESLint para TypeScript e React Hooks no frontend.

### Shared Tool Cards

- Criados `ToolStatusCard` e `ToolMetadataCard` com propriedades tipadas.
- Removida a duplicação dos cards de status e metadados no JSON Formatter e Base64 Toolkit.
- Preservados layout, textos, fluxos e regras de negócio existentes.

### Base64 Toolkit

- Implementados encode e decode por endpoints dedicados da API.
- Adicionadas ações de copiar, limpar e trocar entrada/resultado.
- Adicionados status, metadados, mensagens e toast de cópia no padrão do JSON Formatter.
- Garantido suporte a UTF-8, caracteres especiais, emoji e alfabetos não latinos.
- Adicionados testes unitários de round-trip UTF-8 e rejeição de Base64 inválido.

### Shared Components

- Extraídos os botões de ação e o toast de cópia para componentes compartilhados entre JSON Formatter e Base64 Toolkit.

### UX Improvements

- Refinado o JSON Formatter com status automático, limpeza de resultado em erros, mensagens padronizadas, metadados com tempo de processamento e botões desabilitados conforme contexto.
- Adicionado toast de sucesso ao copiar JSON para a área de transferência.
- Alterada a paleta principal do frontend de verde para azul.

### JSON Formatter

- Implementado processamento completo de JSON com formatação, minificação e validação.
- Adicionado suporte a indentação configurável e ordenação opcional de chaves.
- Adicionado tratamento de erro estruturado com linha, coluna e detalhes.

### Documentation

- Atualizados `CHANGELOG.md`, `PROJECT_CONTEXT.md`, `.ai/current-sprint.md` e README para encerrar a Sprint 3.
- Atualizada a documentação da Sprint 1 e Sprint 1.1.
- Adicionado `.ai/PROJECT_CONTEXT.md` como ponto de contexto consolidado para IAs.
- Atualizado o contexto oficial em `.ai/context.md`.
