import { useState } from 'react';
import { PASSOS_SOLUCAO } from '../data/dadosSolucao';

export default function Solucao() {
  const [escolhido, setEscolhido] = useState(PASSOS_SOLUCAO[0].id);
  const passoAtual =
    PASSOS_SOLUCAO.find((item) => item.id === escolhido) || PASSOS_SOLUCAO[0];

  return (
    <section
      id="solucao"
      className="scroll-mt-20 border-t border-[#C4C3A8]/25 bg-[#102416] px-6 py-24 text-[#E9E6D5] sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <h2 className="font-editorial text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-[#E9E6D5] sm:text-5xl">
            A avenida se abre quilômetros à frente, sem nenhum hardware na rua.
          </h2>

          <p className="max-w-[65ch] text-base leading-relaxed text-[#C4C3A8] sm:text-lg">
            O <strong className="font-semibold text-[#E9E6D5]">Green Corridor</strong>{' '}
            conecta o GPS da ambulância despachada à central de trânsito da
            cidade. A Inteligência Artificial calcula a rota e antecipa a
            abertura dos semáforos para escoar o tráfego comum antes da viatura
            chegar.
          </p>
        </div>

        <div className="mt-16 grid gap-10 border-t border-[#C4C3A8]/25 pt-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="divide-y divide-[#C4C3A8]/20 border-b border-[#C4C3A8]/20">
            {PASSOS_SOLUCAO.map((passo) => {
              const ativo = passo.id === passoAtual.id;
              return (
                <button
                  key={passo.id}
                  type="button"
                  onClick={() => setEscolhido(passo.id)}
                  className={`flex w-full items-baseline justify-between gap-6 py-6 text-left transition-colors ${
                    ativo
                      ? 'bg-[#34472A]/55 px-5'
                      : 'px-2 hover:bg-[#34472A]/25'
                  }`}
                >
                  <div>
                    <h3 className="font-editorial text-2xl text-[#E9E6D5] sm:text-3xl">
                      {passo.titulo}
                    </h3>
                    <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-[#C4C3A8]">
                      {passo.texto}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      ativo
                        ? 'bg-[#E9E6D5] text-[#102416]'
                        : 'border border-[#C4C3A8]/30 text-[#C4C3A8]'
                    }`}
                  >
                    {ativo ? 'Ativo' : 'Explorar'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-[#C4C3A8]/25 bg-[#34472A]/45 p-7 sm:p-9">
            <div>
              <h3 className="font-editorial text-3xl leading-snug text-[#E9E6D5]">
                {passoAtual.titulo}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#E9E6D5]/90">
                {passoAtual.texto}
              </p>

              <p className="mt-6 border-t border-[#C4C3A8]/20 pt-5 text-sm leading-relaxed text-[#C4C3A8]">
                {passoAtual.detalhe}
              </p>
            </div>

            <div className="mt-10 border-t border-[#C4C3A8]/20 pt-6">
              <p className="text-sm text-[#C4C3A8]">
                Zero obras viárias e zero sensores nas viaturas — toda a
                orquestração acontece em nuvem via API.
              </p>

              <a
                href="#simulador"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#741923] px-6 py-3 text-xs font-semibold tracking-wide text-[#E9E6D5] transition-colors hover:bg-[#5c121b] sm:text-sm"
              >
                Ver funcionando na simulação →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
