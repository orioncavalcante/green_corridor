import { AMBULANCIAS_INICIAIS } from '../data/listaAmbulancias';

const URL_API = 'https://jsonplaceholder.typicode.com/posts';
const CHAVE_STORAGE = 'green_corridor_ambulancias';

function lerSalvos() {
  try {
    const texto = localStorage.getItem(CHAVE_STORAGE);
    if (!texto) return null;
    const dados = JSON.parse(texto);
    if (Array.isArray(dados) && dados.length > 0) {
      return dados;
    }
    return null;
  } catch {
    return null;
  }
}

function salvarLocal(lista) {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  } catch {
    return;
  }
}

function pegarHora() {
  return new Date().toLocaleTimeString('pt-BR');
}

export async function buscarAmbulancias() {
  const salvos = lerSalvos();
  try {
    const resposta = await fetch(`${URL_API}?_limit=3`);
    await resposta.json();

    const dados = salvos || AMBULANCIAS_INICIAIS;
    salvarLocal(dados);

    return {
      dados: dados,
      log: {
        metodo: 'GET',
        rota: '/posts?_limit=3',
        status: `${resposta.status} OK`,
        hora: pegarHora(),
      },
    };
  } catch {
    const dados = salvos || AMBULANCIAS_INICIAIS;
    salvarLocal(dados);
    return {
      dados: dados,
      log: {
        metodo: 'GET',
        rota: '/posts',
        status: '200 Local',
        hora: pegarHora(),
      },
    };
  }
}

export async function criarAmbulancia(dadosForm, listaAtual) {
  const nova = {
    id: `amb-${Date.now().toString().slice(-4)}`,
    codigo: dadosForm.codigo.trim().toUpperCase(),
    orgao: dadosForm.orgao,
    ocorrencia: dadosForm.ocorrencia.trim(),
    origem: dadosForm.origem.trim(),
    destino: dadosForm.destino.trim(),
    prioridade: dadosForm.prioridade,
    raio: Number(dadosForm.raio) || 1200,
    velocidade: Number(dadosForm.velocidade) || 68,
  };

  try {
    const resposta = await fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nova),
    });

    const novaLista = [nova, ...listaAtual];
    salvarLocal(novaLista);

    return {
      lista: novaLista,
      log: {
        metodo: 'POST',
        rota: '/posts',
        status: `${resposta.status || 201} Created`,
        hora: pegarHora(),
      },
    };
  } catch {
    const novaLista = [nova, ...listaAtual];
    salvarLocal(novaLista);
    return {
      lista: novaLista,
      log: {
        metodo: 'POST',
        rota: '/posts',
        status: '201 Local',
        hora: pegarHora(),
      },
    };
  }
}

export async function editarAmbulancia(id, mudancas, listaAtual) {
  const novaLista = listaAtual.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...mudancas,
        raio: Number(mudancas.raio ?? item.raio),
      };
    }
    return item;
  });

  const itemAtualizado = novaLista.find((item) => item.id === id);

  try {
    const resposta = await fetch(`${URL_API}/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemAtualizado),
    });

    salvarLocal(novaLista);
    return {
      lista: novaLista,
      log: {
        metodo: 'PUT',
        rota: `/posts/${id}`,
        status: `${resposta.status || 200} OK`,
        hora: pegarHora(),
      },
    };
  } catch {
    salvarLocal(novaLista);
    return {
      lista: novaLista,
      log: {
        metodo: 'PUT',
        rota: `/posts/${id}`,
        status: '200 Local',
        hora: pegarHora(),
      },
    };
  }
}

export async function deletarAmbulancia(id, listaAtual) {
  const novaLista = listaAtual.filter((item) => item.id !== id);

  try {
    const resposta = await fetch(`${URL_API}/1`, {
      method: 'DELETE',
    });

    salvarLocal(novaLista);
    return {
      lista: novaLista,
      log: {
        metodo: 'DELETE',
        rota: `/posts/${id}`,
        status: `${resposta.status || 200} OK`,
        hora: pegarHora(),
      },
    };
  } catch {
    salvarLocal(novaLista);
    return {
      lista: novaLista,
      log: {
        metodo: 'DELETE',
        rota: `/posts/${id}`,
        status: '200 Local',
        hora: pegarHora(),
      },
    };
  }
}

export function resetarLista() {
  salvarLocal(AMBULANCIAS_INICIAIS);
  return AMBULANCIAS_INICIAIS;
}
