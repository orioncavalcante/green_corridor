export const PASSOS_SOLUCAO = [
  {
    id: 'gps',
    titulo: 'Rastreamento GPS no despacho',
    texto:
      'Assim que o hospital ou a central (SAMU/Bombeiros) despacha a viatura, o sistema passa a acompanhar a posição GPS em tempo real — sem instalar sensores físicos na rua nem sirenes especiais.',
    detalhe: 'Ativação automática via despacho, 100% em nuvem.',
  },
  {
    id: 'ia',
    titulo: 'Cálculo preditivo de rota',
    texto:
      'A IA calcula o trajeto ideal e estima o tempo exato até cada cruzamento, definindo quantos segundos antes o sinal precisa abrir para dissipar a fila de veículos.',
    detalhe: 'Antecedência dinâmica ajustada ao fluxo da via.',
  },
  {
    id: 'api',
    titulo: 'Comandos via API para a CET',
    texto:
      'Em vez de depender de sensores locais de 100 metros, a plataforma envia comandos diretamente via API para a central de controle de tráfego da cidade.',
    detalhe: 'Integração direta sobre a infraestrutura semafórica existente.',
  },
  {
    id: 'corredor',
    titulo: 'Via livre antes da sirene ser ouvida',
    texto:
      'Os semáforos abrem a quilômetros de distância, desviando o fluxo de carros comuns para ruas transversais. Quando a ambulância chega, a avenida está livre.',
    detalhe: 'Retorno automático ao ciclo normal após a passagem.',
  },
];
