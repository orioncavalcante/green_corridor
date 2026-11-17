# Green Corridor — Simulador de Gêmeo Digital Urbano

Projeto desenvolvido para a **Global Solution (FIAP)**.

## Integrantes do Grupo

- **Felipe Santos Ribas** — RM569121
- **Orion Cavalcante França** — RM573677
- **Luiz Gonzaga** — RM572446

---

## O Conceito

O **Green Corridor** é uma plataforma em nuvem (Gêmeo Digital) no modelo **B2B/B2G** que cria "corredores verdes" automatizados para veículos de emergência (SAMU, Corpo de Bombeiros e ambulâncias hospitalares). O sistema se integra via API à central de trânsito da cidade (ex.: CET) para abrir semáforos preventivamente, garantindo que a ambulância nunca pare em um sinal vermelho ou fique presa no congestionamento.

### O Problema
Em emergências médicas como paradas cardíacas ou AVCs, cada minuto perdido no trânsito reduz drasticamente as chances de sobrevivência e aumenta o tempo e o custo de recuperação na UTI. O modelo tradicional de abrir semáforos usa sensores na viatura que só ativam a **100 metros** do cruzamento — o que é ineficaz em grandes centros como São Paulo, pois a via já está tomada por carros parados.

### A Solução
Sem exigir novo hardware nas ruas nem sirenes especiais:
1. O sistema rastreia o **GPS da ambulância** despachada pelo hospital ou central 192.
2. A **Inteligência Artificial** calcula a rota e o tempo estimado até cada cruzamento.
3. Comandos são enviados **via API** para a central de trânsito.
4. Os semáforos abrem a quilômetros de distância, desviando o fluxo de veículos comuns para ruas transversais antes mesmo da sirene ser ouvida.

---

## Tecnologias Utilizadas

- **React 19** com **Vite**
- **Tailwind CSS v4**
- **HTML5 Canvas** (Simulação 2.5D em tempo real)
- **Fetch API / JSONPlaceholder** (Operações completas de CRUD: `GET`, `POST`, `PUT` e `DELETE`)

---

## Estrutura do Projeto

```text
gsfiap/
├── public/
│   └── hero-ambulancia.jpg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Problema.jsx
│   │   ├── BarraTempo.jsx
│   │   ├── Solucao.jsx
│   │   ├── Frase.jsx
│   │   ├── Simulador.jsx
│   │   ├── MapaCanvas.jsx
│   │   ├── PainelApi.jsx
│   │   ├── LinhaTabela.jsx
│   │   └── Rodape.jsx
│   ├── hooks/
│   │   ├── useAmbulancias.js
│   │   ├── useSimulacao.js
│   │   ├── useTema.js
│   │   └── useScrollSuave.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── calculos.js
│   ├── data/
│   │   ├── dadosProblema.js
│   │   ├── dadosSolucao.js
│   │   └── listaAmbulancias.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── AI.md
└── README.md
```

---

## Como Executar o Projeto

1. Acesse a pasta do projeto:
   ```bash
   cd gsfiap
   ```
2. Instale as dependências (caso ainda não tenha instalado):
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## Documentação de Uso de IA

A documentação detalhada sobre o uso de ferramentas de Inteligência Artificial no projeto encontra-se no arquivo [`AI.md`](./AI.md).
