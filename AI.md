# Documentação de Uso de Inteligência Artificial (`AI.md`)

Este documento registra de forma transparente como ferramentas de Inteligência Artificial foram utilizadas pelo grupo como apoio durante o desenvolvimento do projeto **Green Corridor** para a Global Solution (FIAP).

---

## 1. Ferramentas Utilizadas

- **Google Antigravity:** utilizado pontualmente para auxiliar na lógica matemática da simulação em Canvas, na implementação da barra interativa de tempo (`BarraTempo.jsx`), na configuração das requisições HTTP para a API externa (`api.js`) e em correções estéticas de espaçamento e cores no Tailwind CSS.

---

## 2. Interações Realizadas (Exemplos Representativos de Prompts e Respostas)

### Interação 1 — Construção da Simulação do Corredor Verde (`MapaCanvas.jsx` e `calculos.js`)
- **Prompt enviado:**
  > *"Preciso criar uma simulação em Canvas no React que mostre uma ambulância saindo do local da ocorrência até o hospital em dois cenários: sem o Green Corridor (parando nos sinais vermelhos e atrás dos carros) e com o Green Corridor, onde os faróis vão se abrindo durante o caminho à medida que a ambulância avança."*
- **Resposta obtida:**
  A IA gerou a base do desenho isométrico no `<canvas>` e a função `verSeSemaforoAbriu` em `calculos.js`, permitindo calcular a distância da ambulância até cada semáforo para abrir o sinal preventivamente e desviar os carros da faixa.

### Interação 2 — Componente da Barra de Tempo (`BarraTempo.jsx`)
- **Prompt enviado:**
  > *"Como fazer uma barra interativa com input range no React que mostre quantos minutos a ambulância ficou parada no trânsito e calcule na hora a queda de 7% a 10% por minuto na chance de sobrevivência?"*
- **Resposta obtida:**
  A IA sugeriu o uso do hook `useState` para guardar os minutos escolhidos no slider e atualizar dinamicamente a largura das barras (`style={{ width: ... }}`) conforme o resultado da função `calcularChance`.

### Interação 3 — Integração com a API Externa (`api.js`) e Correções Estéticas
- **Prompt enviado:**
  > *"Como estruturar um arquivo api.js usando fetch para fazer GET, POST, PUT e DELETE na JSONPlaceholder mantendo os dados salvos no navegador quando recarregar a página? Também preciso ajustar o contraste das cores da nossa paleta (#102416, #34472A, #77713B, #E9E6D5, #741923, #C4C3A8) e adicionar o tema escuro."*
- **Resposta obtida:**
  A IA forneceu o modelo das quatro funções assíncronas com `fetch` combinadas ao `localStorage` e sugeriu o uso de variáveis CSS no `:root` e `:root[data-theme="dark"]` para facilitar a troca entre o tema claro e escuro sem quebrar o layout.

---

## 3. Aplicação no Projeto

O uso de IA concentrou-se especificamente nos seguintes pontos:

1. **Simulação principal (`src/components/MapaCanvas.jsx`, `src/components/Simulador.jsx` e `src/utils/calculos.js`):**
   Foi onde a IA mais ajudou, auxiliando na projeção dos blocos das quadras, na movimentação da ambulância pelo trajeto e na lógica de abertura progressiva dos 4 semáforos durante o percurso.
2. **Barra interativa de sobrevivência (`src/components/BarraTempo.jsx`):**
   Apoio para ligar o `input type="range"` ao cálculo de porcentagem restante de sobrevivência em paradas cardíacas.
3. **Consumo da API externa (`src/services/api.js` e `src/hooks/useAmbulancias.js`):**
   Auxílio na escrita das requisições `GET`, `POST`, `PUT` e `DELETE` com tratamento de erro (`try/catch`).
4. **Correções estéticas (`src/index.css` e classes Tailwind nos componentes):**
   Ajustes de alinhamento, responsividade em telas menores, efeito de vidro (*glassmorphism*) na `Navbar.jsx` e configuração das variáveis do modo escuro.

---

## 4. Validação das Respostas

Todas as sugestões geradas pela IA foram revisadas, testadas e ajustadas pelo grupo:
- **Testes práticos no navegador (`npm run dev`):** verificamos se na simulação os semáforos realmente abriam um por um durante o caminho da ambulância e se os botões da tabela da API (`+ Novo despacho`, `+200m`, `Editar` e `Encerrar`) atualizavam os dados corretamente.
- **Conferência dos dados médicos:** validamos os valores da `BarraTempo.jsx` com os dados oficiais da *American Heart Association* (queda de 7% a 10% por minuto) e do artigo *Time Is Brain—Quantified* (Saver, *Stroke*, 2006).
- **Verificação de código (`npm run build` e `npm run lint`):** rodamos o linter e o build de produção do Vite para garantir que não havia erros ou variáveis soltas.

---

## 5. Análise Crítica

- **Benefícios:** A IA foi fundamental principalmente para viabilizar a simulação gráfica no Canvas — que exigia muitos cálculos de coordenadas e animação quadro a quadro — e para agilizar a montagem do CRUD na API.
- **Limitações e dificuldades:** Em várias tentativas, a IA gerou códigos complexos demais ou visuais genéricos que não combinavam com a ideia do grupo. Foi necessário descartar trechos, refazer o estilo com base na nossa própria escolha de fotografia e paleta de cores, e simplificar os nomes de funções e variáveis para que todo o grupo tivesse domínio completo do código.
