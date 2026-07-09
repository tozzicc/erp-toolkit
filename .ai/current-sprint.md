# Sprint Atual

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
