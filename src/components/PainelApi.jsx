import { useState } from 'react';
import { useAmbulancias } from '../hooks/useAmbulancias';
import LinhaTabela from './LinhaTabela';

const formVazio = {
  codigo: '',
  orgao: 'SAMU 192 (B2G)',
  ocorrencia: '',
  origem: '',
  destino: '',
  prioridade: 'Crítica',
  raio: 1200,
  velocidade: 68,
};

export default function PainelApi() {
  const {
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
  } = useAmbulancias();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [campos, setCampos] = useState(formVazio);
  const [avisoForm, setAvisoForm] = useState('');

  function abrirNovo() {
    setEditando(null);
    setCampos(formVazio);
    setAvisoForm('');
    setMostrarForm(true);
  }

  function abrirEdicao(item) {
    setEditando(item);
    setCampos({
      codigo: item.codigo || '',
      orgao: item.orgao || 'SAMU 192 (B2G)',
      ocorrencia: item.ocorrencia || '',
      origem: item.origem || '',
      destino: item.destino || '',
      prioridade: item.prioridade || 'Crítica',
      raio: item.raio || 1200,
      velocidade: item.velocidade || 68,
    });
    setAvisoForm('');
    setMostrarForm(true);
  }

  async function enviarFormulario(e) {
    e.preventDefault();
    if (
      !campos.codigo.trim() ||
      !campos.ocorrencia.trim() ||
      !campos.origem.trim() ||
      !campos.destino.trim()
    ) {
      setAvisoForm(
        'Preencha o prefixo da viatura, a ocorrência, a origem e o hospital de destino.'
      );
      return;
    }

    if (editando) {
      await atualizar(editando.id, campos);
    } else {
      await adicionar(campos);
    }

    setCampos(formVazio);
    setMostrarForm(false);
  }

  async function somarRaio(item) {
    const novoRaio = Math.min((Number(item.raio) || 1200) + 200, 2400);
    await atualizar(item.id, { raio: novoRaio });
  }

  return (
    <section
      id="central-api"
      className="scroll-mt-20 border-t border-[var(--border-line)] bg-[var(--bg-page)] px-6 py-24 text-[var(--text-main)] transition-colors duration-300 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-editorial max-w-3xl text-3xl leading-[1.1] tracking-[-0.02em] text-[var(--text-main)] sm:text-5xl">
              Central de despachos integrada via API.
            </h2>
            <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-[var(--text-body)]">
              Registro em nuvem das ambulâncias em deslocamento com operações de
              consulta, criação, atualização de raio preventivo e encerramento.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {logApi && (
              <span className="font-mono-tech rounded-full border border-[var(--border-line)] bg-[var(--bg-card)] px-3.5 py-1.5 text-xs text-[var(--text-body)]">
                {logApi.metodo} {logApi.rota} · {logApi.status}
              </span>
            )}

            <button
              type="button"
              onClick={() => (mostrarForm ? setMostrarForm(false) : abrirNovo())}
              className="rounded-full bg-[#741923] px-5 py-2.5 text-xs font-semibold text-[#E9E6D5] transition-colors hover:bg-[#5c121b] sm:text-sm"
            >
              {mostrarForm ? 'Fechar formulário' : '+ Novo despacho'}
            </button>
          </div>
        </div>

        {erro && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-[#741923] bg-[#741923]/15 px-4 py-3 text-sm text-[var(--text-main)]"
          >
            {erro}
          </p>
        )}

        {mostrarForm && (
          <form
            onSubmit={enviarFormulario}
            className="mt-8 rounded-2xl border border-[var(--border-line)] bg-[var(--bg-card)] p-6"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-line)] pb-4">
              <h3 className="font-editorial text-2xl text-[var(--text-main)]">
                {editando
                  ? `Editar viatura ${editando.codigo}`
                  : 'Registrar novo despacho de emergência'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setMostrarForm(false);
                  setEditando(null);
                }}
                className="text-xs font-medium text-[var(--text-body)] underline underline-offset-4 hover:text-[var(--text-main)]"
              >
                Cancelar
              </button>
            </div>

            {avisoForm && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-[#741923] bg-[#741923]/20 px-3 py-2 text-xs text-[var(--text-main)]"
              >
                {avisoForm}
              </p>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="campo-codigo"
                  className="block text-xs font-medium text-[var(--text-body)]"
                >
                  Prefixo da viatura
                </label>
                <input
                  id="campo-codigo"
                  type="text"
                  placeholder="Ex.: SAMU-USA-19"
                  value={campos.codigo}
                  onChange={(e) =>
                    setCampos({ ...campos, codigo: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3.5 py-2 text-sm text-[var(--text-main)] focus:outline-2 focus:outline-[var(--text-main)]"
                />
              </div>

              <div>
                <label
                  htmlFor="campo-orgao"
                  className="block text-xs font-medium text-[var(--text-body)]"
                >
                  Entidade (B2B / B2G)
                </label>
                <select
                  id="campo-orgao"
                  value={campos.orgao}
                  onChange={(e) =>
                    setCampos({ ...campos, orgao: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3.5 py-2 text-sm text-[var(--text-main)] focus:outline-2 focus:outline-[var(--text-main)]"
                >
                  <option value="SAMU 192 (B2G)">SAMU 192 (B2G)</option>
                  <option value="Corpo de Bombeiros (B2G)">
                    Corpo de Bombeiros (B2G)
                  </option>
                  <option value="Hospital Sírio-Libanês (B2B)">
                    Hospital Sírio-Libanês (B2B)
                  </option>
                  <option value="Hospital Albert Einstein (B2B)">
                    Hospital Albert Einstein (B2B)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="campo-ocorrencia"
                  className="block text-xs font-medium text-[var(--text-body)]"
                >
                  Ocorrência médica
                </label>
                <input
                  id="campo-ocorrencia"
                  type="text"
                  placeholder="Ex.: Infarto Agudo do Miocárdio"
                  value={campos.ocorrencia}
                  onChange={(e) =>
                    setCampos({ ...campos, ocorrencia: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3.5 py-2 text-sm text-[var(--text-main)] focus:outline-2 focus:outline-[var(--text-main)]"
                />
              </div>

              <div>
                <label
                  htmlFor="campo-origem"
                  className="block text-xs font-medium text-[var(--text-body)]"
                >
                  Origem
                </label>
                <input
                  id="campo-origem"
                  type="text"
                  placeholder="Ex.: Vila Mariana"
                  value={campos.origem}
                  onChange={(e) =>
                    setCampos({ ...campos, origem: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3.5 py-2 text-sm text-[var(--text-main)] focus:outline-2 focus:outline-[var(--text-main)]"
                />
              </div>

              <div>
                <label
                  htmlFor="campo-destino"
                  className="block text-xs font-medium text-[var(--text-body)]"
                >
                  Hospital de destino
                </label>
                <input
                  id="campo-destino"
                  type="text"
                  placeholder="Ex.: InCor — HC"
                  value={campos.destino}
                  onChange={(e) =>
                    setCampos({ ...campos, destino: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3.5 py-2 text-sm text-[var(--text-main)] focus:outline-2 focus:outline-[var(--text-main)]"
                />
              </div>

              <div>
                <label
                  htmlFor="campo-raio"
                  className="block text-xs font-medium text-[var(--text-body)]"
                >
                  Raio preventivo (metros)
                </label>
                <input
                  id="campo-raio"
                  type="number"
                  min={400}
                  max={2400}
                  step={100}
                  value={campos.raio}
                  onChange={(e) =>
                    setCampos({ ...campos, raio: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3.5 py-2 text-sm text-[var(--text-main)] focus:outline-2 focus:outline-[var(--text-main)]"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="submit"
                disabled={salvando}
                className="rounded-full bg-[#102416] px-6 py-2.5 text-xs font-semibold text-[#E9E6D5] transition-colors hover:bg-[#34472A] disabled:opacity-50"
              >
                {salvando
                  ? 'Salvando...'
                  : editando
                    ? 'Salvar alterações (PUT)'
                    : 'Confirmar despacho (POST)'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-10 overflow-x-auto">
          {carregando ? (
            <p className="py-8 text-sm text-[var(--text-body)]">
              Carregando ambulâncias...
            </p>
          ) : lista.length === 0 ? (
            <div className="border-y border-[var(--border-line)] py-10 text-center">
              <p className="font-editorial text-2xl text-[var(--text-main)]">
                Nenhum despacho ativo no momento.
              </p>
              <button
                type="button"
                onClick={restaurar}
                className="mt-4 rounded-full border border-[var(--border-line)] px-5 py-2 text-xs font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card)]"
              >
                Restaurar lista inicial
              </button>
            </div>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-[var(--border-line)] text-xs font-semibold text-[var(--text-body)]">
                  <th className="py-3.5 pr-4">Viatura</th>
                  <th className="py-3.5 px-4">Ocorrência</th>
                  <th className="py-3.5 px-4">Trajeto</th>
                  <th className="py-3.5 px-4">Raio API</th>
                  <th className="py-3.5 pl-4 text-right">
                    <button
                      type="button"
                      onClick={restaurar}
                      className="text-xs font-normal underline underline-offset-4 hover:text-[var(--text-main)]"
                    >
                      Restaurar padrão
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item) => (
                  <LinhaTabela
                    key={item.id}
                    item={item}
                    aoEditar={abrirEdicao}
                    aoAumentarRaio={somarRaio}
                    aoDeletar={remover}
                    salvando={salvando}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
