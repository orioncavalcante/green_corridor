# Green Corridor

Plataforma web e simulador 3D de Gêmeo Digital Urbano desenvolvido para a **Global Solution (FIAP)**.

## Integrantes do Grupo

- **Felipe Santos Ribas** — RM569121
- **Orion Cavalcante França** — RM573677
- **Luiz Gonzaga** — RM572446

---

## Descrição do Projeto

O **Green Corridor** é uma plataforma em nuvem (Gêmeo Digital) no modelo **B2B/B2G** que cria "corredores verdes" automatizados para veículos de emergência (SAMU, Corpo de Bombeiros e ambulâncias hospitalares). O sistema se integra via API à central de trânsito da cidade (ex.: CET) para abrir semáforos preventivamente, garantindo que a ambulância não pare em sinais vermelhos nem fique presa no congestionamento.

### O Problema
Em emergências médicas como paradas cardíacas ou AVCs, cada minuto perdido no trânsito reduz drasticamente as chances de sobrevivência e aumenta o tempo e o custo de recuperação na UTI. O modelo antigo de prioridade semafórica utiliza sensores físicos na viatura que só ativam a **100 metros** do cruzamento — o que é ineficaz em grandes centros como São Paulo, pois a via já está bloqueada por carros parados.

### A Solução
Sem exigir novo hardware nas ruas nem sirenes especiais:
1. O sistema rastreia o **GPS da ambulância** assim que ela é despachada pelo hospital ou pela central 192.
2. A **Inteligência Artificial** calcula a rota e o tempo estimado até cada cruzamento.
3. Comandos são enviados **via API** para a central de trânsito.
4. Os semáforos abrem a quilômetros de distância, desviando o fluxo de veículos comuns para ruas transversais antes mesmo da sirene ser ouvida.

### Principais Funcionalidades da Aplicação
- **Régua Interativa de Sobrevivência (`BarraTempo.jsx`):** demonstra em tempo real a queda na probabilidade de sobrevivência em paradas cardíacas conforme os minutos parados no trânsito.
- **Apresentação Interativa da Solução (`Solucao.jsx`):** detalhamento das 4 etapas do funcionamento em nuvem.
- **Simulação 3D em Tempo Real (`Simulador.jsx` + `public/simulacao.html`):** comparação visual automática em Three.js entre o trajeto *Sem Green Corridor* e *Com Green Corridor*, com abertura progressiva dos semáforos e sincronização de telemetria.
- **Central de Despachos com CRUD (`PainelApi.jsx`):** integração com API REST externa (`GET`, `POST`, `PUT` e `DELETE`) para consultar, cadastrar, editar raio preventivo e encerrar despachos de ambulâncias.
- **Tema Claro/Escuro e Scroll Suave (`useTema.js` e `useScrollSuave.js`):** alternância completa de aparência seguindo a paleta oficial do projeto.

---

## Tecnologias Utilizadas

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **Three.js (WebGL)** para a simulação 3D interativa
- **Fetch API / JSONPlaceholder** para operações completas de CRUD (`GET`, `POST`, `PUT` e `DELETE`)
- **ESLint** para validação de qualidade de código

---

## Pré-requisitos

Antes de instalar e executar o projeto, certifique-se de ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** versão **18.0 ou superior** (recomendado: v20 LTS ou v22 LTS)
- **npm** versão **9.0 ou superior** (instalado automaticamente junto com o Node.js)
- **[Git](https://git-scm.com/)** para clonar o repositório
- **Navegador moderno** (Google Chrome, Microsoft Edge, Firefox ou Safari) com suporte a **WebGL** para renderizar a simulação 3D
- **Conexão com a internet** para carregar as fontes, a biblioteca Three.js e consumir a API externa de CRUD

Para verificar se o Node.js e o npm estão instalados corretamente, execute no terminal:
```bash
node -v
npm -v
```

---

## Instruções para Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/orioncavalcante/green_corridor.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd green_corridor
   ```
   *(Caso esteja trabalhando localmente na pasta original do workspace, utilize `cd gsfiap`.)*

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Abra no navegador:**
   Acesse o endereço exibido no terminal (por padrão: `http://localhost:5173`).

### Outros Comandos Disponíveis

- **Gerar build de produção:**
  ```bash
  npm run build
  ```
- **Visualizar o build de produção localmente:**
  ```bash
  npm run preview
  ```
- **Verificar linting do código:**
  ```bash
  npm run lint
  ```

---

## Estrutura do Projeto

```text
green_corridor/
├── public/
│   ├── hero-ambulancia.jpg
│   └── simulacao.html
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
├── index.html
├── package.json
├── vite.config.js
├── AI.md
└── README.md
```

---

## Documentação de Uso de IA

A documentação transparente sobre o uso de Inteligência Artificial no projeto encontra-se na raiz do repositório em [`AI.md`](./AI.md).
