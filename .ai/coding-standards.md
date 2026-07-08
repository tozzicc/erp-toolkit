# Padrões de Código

## TypeScript

TypeScript é obrigatório em todo o frontend.

Novos arquivos de interface devem usar `.tsx` quando renderizarem componentes React e `.ts` para módulos sem JSX.

## Componentização

Componentes devem ser pequenos, reutilizáveis e com responsabilidades claras.

Ao criar uma nova tela, verificar antes se já existe um componente reutilizável em `frontend/src/components/`.

## Código Limpo

O código deve priorizar clareza, legibilidade e manutenção.

Evite soluções complexas quando uma abordagem simples resolver o problema de forma segura.

## SOLID

Aplicar princípios SOLID quando eles agregarem clareza, reduzirem acoplamento ou facilitarem manutenção.

Não criar abstrações prematuras apenas para aparentar flexibilidade.

## Evitar Duplicação

Nunca duplicar código sem necessidade.

Quando houver repetição real de estrutura, comportamento ou regra, extrair para componente, função ou módulo compartilhado.

## Nomeação Consistente

Usar nomes claros, previsíveis e alinhados ao domínio do ERP Toolkit.

Boas práticas:

- Componentes React em `PascalCase`.
- Funções, variáveis e hooks em `camelCase`.
- Arquivos de páginas terminando com `Page`.
- Nomes de endpoints coerentes com a ferramenta exposta.

## Comentários

Comentários devem ser usados somente quando agregarem valor.

Evite comentários que apenas descrevem literalmente o que o código já mostra. Prefira comentários curtos para explicar decisões, restrições ou trechos com lógica menos óbvia.

## Legibilidade

Priorizar legibilidade antes de micro-otimizações.

Código legível facilita manutenção, evolução do MVP e colaboração entre desenvolvedores e IAs.

## Dependências

Evitar dependências desnecessárias.

Antes de adicionar uma biblioteca, verificar se:

- O problema não pode ser resolvido com a stack atual.
- A dependência é mantida.
- O benefício supera o custo de manutenção.
