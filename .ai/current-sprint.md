# Sprint Atual

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
