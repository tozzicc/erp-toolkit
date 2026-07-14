# Sprint Atual

## Sprint 7 - Hash Generator

Status: Em validação.

Objetivo: implementar uma ferramenta para geração de hashes mantendo o padrão visual, arquitetural e de qualidade do ERP Toolkit.

Entregas:

- Hash Generator disponível no Dashboard, menu lateral e rota `/hash-generator`.
- Algoritmos MD5, SHA-1, SHA-256, SHA-384 e SHA-512, com SHA-256 como padrão.
- Entrada multilinha UTF-8 preservada integralmente e saída em minúsculas ou maiúsculas.
- Ações de gerar, copiar e limpar, com estados idle, pending, loading, success e error.
- Metadados de algoritmo, caracteres, bytes UTF-8, tamanho do hash e tempo de processamento.
- Avisos informativos para algoritmos legados e armazenamento adequado de senhas.
- Endpoint `POST /api/tools/hash` com enum centralizado, `hashlib` e contrato OpenAPI completo.
- Reutilização de AppLayout, PageHeader, ToolPanel, ToolStatusCard, ToolMetadataCard, TextAreaField, PrimaryButton, ActionButton, CopyToast e ErrorMessage.

Validações executadas:

- 38 testes backend aprovados, incluindo regressão das ferramentas existentes.
- ESLint, TypeScript e build Vite aprovados sem warnings.
- Fluxos de geração, caixa da saída, cópia, limpeza e alteração de algoritmo aprovados no navegador.
- Responsividade aprovada em 375 px sem overflow horizontal.

---

## Sprint 6 - SQL Multi-Dialeto

Status: Em validação.

Objetivo: evoluir a página atual do SQL Formatter para formatar, minificar e validar SQL conforme o banco selecionado, sem alterar as demais ferramentas.

Entregas:

- Seletor de Banco de Dados com SQL Server, PostgreSQL, MySQL, MariaDB, Oracle, SQLite e Genérico / ANSI SQL.
- SQL Server como dialeto padrão e envio do valor nas três operações.
- Enum e catálogo central de capacidades dos dialetos no backend.
- Validações específicas com mensagens contextualizadas para funções e cláusulas incompatíveis.
- Regra de `SELECT` sem `FROM` compatível com os dialetos e orientação de `FROM DUAL` para Oracle.
- Dialeto incluído nos metadados, mantendo entrada e invalidando resultado ao trocar a seleção.
- Swagger com enum explícito e exemplos para SQL Server, PostgreSQL e Oracle.
- Cobertura automatizada dos sete dialetos, cenários cruzados e regressão do SQL Formatter.

Validações executadas:

- 31 testes backend aprovados.
- ESLint aprovado.
- TypeScript e build Vite aprovados.
- JSON Formatter, Base64 Toolkit, UUID Generator e Password Generator preservados.

---

## Sprint 5.1 - Release Candidate

Status: concluída em 10/07/2026.

Objetivo: refinar o SQL Formatter sem adicionar funcionalidades, alterar APIs públicas, modificar o layout ou causar regressões.

Melhorias e correções:

- CTEs fecham o bloco `WITH` antes de iniciar o `SELECT` principal em nova linha.
- `UNION`, `UNION ALL`, `INTERSECT` e `EXCEPT` iniciam o próximo `SELECT` em nova linha.
- Validação de `SELECT` sem `FROM` aceita expressões, constantes, variáveis, funções, `CAST` e `CONVERT`.
- Identificadores de coluna isolados sem `FROM`, como `SELECT A1_COD`, continuam inválidos.
- Indentação revisada para CASE, WITH, JOIN, EXISTS, NOT EXISTS, IN e subqueries.
- Minificação preserva strings e o contrato público existente.

Compatibilidade e validações:

- Endpoint, payload e resposta do SQL Formatter preservados.
- JSON Formatter, Base64 Toolkit, UUID Generator e Password Generator permaneceram inalterados.
- Checklist manual aprovada para SELECT, JOINs, operações de conjunto, CASE, EXISTS, CTEs, subqueries, SQL inválido e minificação.
- Vinte e sete testes automatizados aprovados.
- Lint, TypeScript e build Vite sem erros.

---

## Sprint 5 - SQL Formatter

Status: concluída em 10/07/2026.

Entregas:

- Formatar, minificar, validar, copiar, carregar exemplo e limpar.
- Opções de keywords em maiúsculo, quebra de linhas, JOIN, CASE e alinhamento de SELECT.
- Suporte a CTEs, CASE, JOINs, subqueries, EXISTS e operações de conjunto.
- Validação básica de parênteses, aspas, CASE e SELECTs sem origem válida.
- Endpoint `POST /api/tools/sql/format` documentado no Swagger.
- Reutilização dos componentes compartilhados das ferramentas maduras.

---

## Sprint 4 - Password Generator

Status: concluída em 10/07/2026.

Objetivos concluídos:

- Comprimentos de 8, 12, 16, 20, 24, 32, 48 e 64 caracteres, com padrão 16.
- Seleção independente de letras maiúsculas, minúsculas, números e caracteres especiais.
- Exclusão opcional dos caracteres ambíguos `0 O o 1 l I 5 S 8 B 6 G`.
- Garantia de pelo menos um caractere de cada grupo selecionado.
- Resultado somente leitura, copiar, limpar e toast de confirmação.
- Medidor visual nos níveis `Muito fraca`, `Fraca`, `Média`, `Forte` e `Muito forte`.
- Metadados de quantidade de caracteres, entropia estimada e tempo de geração.
- Endpoint `POST /api/tools/password` e contrato documentados no Swagger.
- Reutilização de `ToolPanel`, `ToolStatusCard`, `ToolMetadataCard`, `PrimaryButton`, `ActionButton`, `CopyToast`, `PageHeader` e `ErrorMessage`.

Validações:

- Todas as combinações não vazias de grupos testadas com e sem exclusão de ambíguos.
- Todos os comprimentos suportados testados.
- Treze testes do backend aprovados.
- Lint, TypeScript e build Vite sem erros.
- Fluxos padrão, exclusão de ambíguos, limpar, força, metadados e responsividade validados no navegador.

---

## Sprint 3 - UUID Generator e componentes compartilhados

Status: concluída em 10/07/2026.

Objetivos concluídos:

- Criados `ToolStatusCard` e `ToolMetadataCard` com contratos tipados e conteúdo flexível.
- JSON Formatter e Base64 Toolkit migrados para os cards compartilhados sem alterações visuais ou funcionais.
- UUID Generator implementado com seletor de quantidade para 1, 5, 10, 25, 50 e 100 itens.
- Geração múltipla de UUIDs v4 únicos, com um resultado por linha.
- Ações contextuais de copiar, copiar todos, baixar `uuids.txt` e limpar.
- Endpoint `GET /api/tools/uuid?count=N` validado entre 1 e 100 e documentado no Swagger.
- Loading, erro, status e metadados com quantidade, caracteres e tempo de geração.
- Reutilizados `ToolPanel`, `PageHeader`, `PrimaryButton`, `ActionButton` e `CopyToast`.
- Adicionados testes para validade UUID v4, unicidade, todas as quantidades, performance e OpenAPI.
- Build de produção e testes de regressão aprovados.

Validações:

- TypeScript e build Vite sem erros.
- Sete testes de backend aprovados.
- Regressão básica no navegador aprovada para JSON Formatter, Base64 Toolkit e UUID Generator.
- Responsividade validada em viewport de 375 px sem overflow horizontal.
- ESLint configurado e executado sem erros.

---

## Sprint 2 - Base64 Toolkit

Data de conclusão: 10/07/2026.

Critérios de aceite atendidos:

- Encode e decode processados pelo backend por endpoints independentes.
- Entrada e saída preservam integralmente conteúdo UTF-8.
- Copiar, limpar e trocar entrada/resultado funcionam conforme o contexto.
- Ações ficam desabilitadas sem entrada, sem resultado ou durante processamento.
- Erros de Base64 inválido removem resultados antigos e exibem feedback claro.
- O JSON Formatter mantém seu comportamento após a extração dos componentes compartilhados.

Status: concluída.

Objetivo: implementar o Base64 Toolkit no padrão visual e arquitetural do JSON Formatter, sem regressões.

Entregas concluídas:

- Encode e decode pelos endpoints `POST /api/tools/base64/encode` e `POST /api/tools/base64/decode`.
- Suporte a UTF-8, caracteres especiais, emojis e alfabetos não latinos.
- Ações de copiar, limpar e trocar entrada/resultado.
- Estados de loading, sucesso, erro e pendência, além de metadados e toast.
- Componentes `ActionButton` e `CopyToast` compartilhados com o JSON Formatter.
- Testes unitários de round-trip UTF-8 e rejeição de entrada inválida.
- Build de produção validado sem regressões de TypeScript.

---

## Sprint 1 - Consolidação do MVP Técnico

Status: concluída.

## Objetivos

- Consolidar a base técnica criada na Sprint 0.
- Implementar o JSON Formatter completo no frontend e backend.
- Refinar a experiência do usuário no JSON Formatter na Sprint 1.1.
- Corrigir pequenos comportamentos de estado, mensagens, resultado e botões.
- Manter a arquitetura atual sem criar novas ferramentas.
- Preservar consistência visual com o Dashboard.

## Critérios de Aceite

- O JSON Formatter permite formatar, validar e minificar JSON.
- O backend aceita indentação, ordenação opcional de chaves e modo de processamento.
- O backend retorna resultado, validade e metadados básicos.
- O frontend exibe status automático: `Aguardando JSON`, `Alterações pendentes`, `JSON válido` e `JSON inválido`.
- O resultado é limpo quando ocorre erro.
- O botão copiar fica desabilitado sem resultado.
- O painel de resultado permanece somente leitura e permite seleção.
- O botão limpar reseta entrada, resultado, mensagens, metadados e status.
- Os metadados exibem linhas, caracteres e tempo de processamento após sucesso.
- Ações ficam desabilitadas quando a entrada está vazia ou durante loading.
- Mensagens de sucesso e erro estão padronizadas.
- O toast de cópia é exibido após copiar o resultado.
- A paleta principal do frontend está azul.
- Não houve criação de novas ferramentas, alteração de arquitetura ou modificação do layout principal.

## Concluído

- JSON Formatter completo no backend.
- JSON Formatter completo no frontend.
- Refinamento de UX do JSON Formatter na Sprint 1.1.
- Resultado antigo removido em caso de erro.
- Status automático implementado.
- Botões desabilitados conforme entrada, resultado e loading.
- Mensagens de sucesso, erro e cópia padronizadas.
- Metadados com tempo de processamento em milissegundos.
- Toast de sucesso ao copiar JSON.
- Paleta visual principal alterada de verde para azul.
- Documentação atualizada para refletir o estado atual do projeto.

## O que ainda não faz parte desta sprint

- Autenticação.
- Pagamentos.
- Docker.
- PostgreSQL.
- Deploy web.
- API Tester.
- Log Analyzer.
- AI Assistant.
- Testes automatizados completos.
- Histórico de uso das ferramentas.
- Preferências de usuário.

## Próxima Sprint Recomendada

Sprint 2 - Qualidade e Testes.

Foco sugerido:

- Testes automatizados para o JSON Formatter.
- Testes dos endpoints principais.
- Validação de contratos entre frontend e backend.
- Revisão de acessibilidade e estados de erro.
