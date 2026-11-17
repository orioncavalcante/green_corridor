import { useState, useEffect } from 'react';
import {
  buscarAmbulancias,
  criarAmbulancia,
  editarAmbulancia,
  deletarAmbulancia,
  resetarLista,
} from '../services/api';

export function useAmbulancias() {
  const [lista, setLista] = useState([]);
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [logApi, setLogApi] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      try {
        const res = await buscarAmbulancias();
        setLista(res.dados);
        setLogApi(res.log);
      } catch {
        setErro('Erro ao buscar as ambulâncias.');
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  async function adicionar(dadosForm) {
    setSalvando(true);
    setErro('');
    try {
      const res = await criarAmbulancia(dadosForm, lista);
      setLista(res.lista);
      setLogApi(res.log);
    } catch {
      setErro('Erro ao criar registro.');
    } finally {
      setSalvando(false);
    }
  }

  async function atualizar(id, mudancas) {
    setSalvando(true);
    setErro('');
    try {
      const res = await editarAmbulancia(id, mudancas, lista);
      setLista(res.lista);
      setLogApi(res.log);
      setEditando(null);
    } catch {
      setErro('Erro ao atualizar registro.');
    } finally {
      setSalvando(false);
    }
  }

  async function remover(id) {
    setSalvando(true);
    setErro('');
    try {
      const res = await deletarAmbulancia(id, lista);
      setLista(res.lista);
      setLogApi(res.log);
    } catch {
      setErro('Erro ao deletar registro.');
    } finally {
      setSalvando(false);
    }
  }

  function restaurar() {
    const iniciais = resetarLista();
    setLista(iniciais);
    setEditando(null);
    setLogApi({
      metodo: 'RESET',
      rota: '/posts',
      status: '200 OK',
      hora: new Date().toLocaleTimeString('pt-BR'),
    });
  }

  return {
    lista,
    editando,
    setEditando,
    carregando,
    salvando,
    erro,
    logApi,
    adicionar,
    atualizar,
    remover,
    restaurar,
  };
}
