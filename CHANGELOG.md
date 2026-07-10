# Changelog

> Sprint 2 encerrada em 10/07/2026. Documentação, contexto técnico e validações foram atualizados junto com a entrega do Base64 Toolkit.

## Unreleased

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

- Atualizada a documentação da Sprint 1 e Sprint 1.1.
- Adicionado `.ai/PROJECT_CONTEXT.md` como ponto de contexto consolidado para IAs.
- Atualizado o contexto oficial em `.ai/context.md`.
