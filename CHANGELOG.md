# Changelog

> Documentação, contexto técnico e validações atualizados até a conclusão da Sprint 4 em 10/07/2026.

## Unreleased

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
