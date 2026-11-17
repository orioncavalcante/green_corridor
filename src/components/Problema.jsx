import BarraTempo from './BarraTempo';
import { DADOS_PROBLEMA } from '../data/dadosProblema';

export default function Problema() {
  return (
    <section
      id="problema"
      className="scroll-mt-20 bg-[var(--bg-page)] px-6 py-24 text-[var(--text-main)] transition-colors duration-300 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="font-editorial text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-[var(--text-main)] sm:text-5xl">
            Cada minuto parado no trânsito tira uma vida do caminho.
          </h2>

          <div className="max-w-[65ch] space-y-4 text-base leading-relaxed text-[var(--text-body)] sm:text-lg">
            <p>
              Em uma parada cardíaca ou em um AVC, o que define se o paciente
              sobrevive, e com quais sequelas, é o tempo até o atendimento.
            </p>
            <p>
              Em São Paulo, boa parte desse tempo se perde em cruzamentos, com a
              ambulância presa atrás de carros que não têm para onde ir.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <BarraTempo />
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {DADOS_PROBLEMA.map((item) => (
            <div key={item.numero}>
              <p className="font-editorial text-5xl text-[var(--text-main)] sm:text-6xl">
                {item.numero}
              </p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--text-body)]">
                {item.texto}
              </p>
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                Fonte: {item.fonte}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
