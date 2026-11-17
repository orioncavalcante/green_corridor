export const DISTANCIA_ABERTURA = 8.5;

export function calcularChance(minutos, perda) {
  let melhor = 100 - perda.min * minutos;
  let pior = 100 - perda.max * minutos;

  if (melhor < 0) melhor = 0;
  if (pior < 0) pior = 0;

  return { melhor, pior };
}

export function montarCaminho(pontos, divisoes = 40) {
  const lista = [];

  for (let i = 0; i < pontos.length - 1; i++) {
    const atual = pontos[i];
    const proximo = pontos[i + 1];

    for (let k = 0; k < divisoes; k++) {
      const t = k / divisoes;
      lista.push({
        x: atual.x + (proximo.x - atual.x) * t,
        z: atual.z + (proximo.z - atual.z) * t,
      });
    }
  }

  lista.push(pontos[pontos.length - 1]);

  const distancias = [0];
  for (let i = 1; i < lista.length; i++) {
    const dx = lista[i].x - lista[i - 1].x;
    const dz = lista[i].z - lista[i - 1].z;
    distancias.push(distancias[i - 1] + Math.hypot(dx, dz));
  }

  return {
    pontos: lista,
    distancias: distancias,
    tamanhoTotal: distancias[distancias.length - 1],
  };
}

export function pegarPosicao(caminho, d) {
  const { pontos, distancias, tamanhoTotal } = caminho;
  let valor = d;
  if (valor < 0) valor = 0;
  if (valor > tamanhoTotal) valor = tamanhoTotal;

  let indice = 0;
  while (indice < distancias.length - 2 && distancias[indice + 1] < valor) {
    indice++;
  }

  const trecho = distancias[indice + 1] - distancias[indice] || 1;
  const resto = (valor - distancias[indice]) / trecho;
  const p1 = pontos[indice];
  const p2 = pontos[indice + 1];

  return {
    x: p1.x + (p2.x - p1.x) * resto,
    z: p1.z + (p2.z - p1.z) * resto,
    dx: (p2.x - p1.x) / trecho,
    dz: (p2.z - p1.z) / trecho,
  };
}

export function verSeSemaforoAbriu(cenario, posAmbulancia, posSemaforo, alcance = DISTANCIA_ABERTURA) {
  if (cenario === 1) {
    return posAmbulancia >= posSemaforo - 1.0;
  }
  return posAmbulancia >= posSemaforo - alcance;
}
