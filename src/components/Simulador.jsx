import MapaCanvas from './MapaCanvas';
import { useSimulacao } from '../hooks/useSimulacao';

export default function Simulador() {
  const { cenario, mudarCenario, info, setInfo } = useSimulacao();

  const comCorredor = cenario === 'com';

  return (
    <section
      id="simulador"
      className="scroll-mt-20 border-t border-[#C4C3A8]/25 bg-[#102416] px-6 py-24 text-[#E9E6D5] sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-editorial max-w-3xl text-4xl leading-[1.08] tracking-[-0.02em] text-[#E9E6D5] sm:text-5xl">
              Simulação do corredor em tempo real.
            </h2>
            <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-[#C4C3A8] sm:text-lg">
              Observe a diferença entre o deslocamento convencional — em que a
              ambulância freia nos cruzamentos — e o{' '}
              <strong className="font-semibold text-[#E9E6D5]">
                Green Corridor
              </strong>{' '}
              abrindo os semáforos progressivamente à frente da viatura até o
              hospital.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 self-start rounded-full border border-[#C4C3A8]/35 bg-[#34472A]/70 px-5 py-2.5 lg:self-auto">

            <span className="text-xs font-semibold tracking-wider text-[#E9E6D5] uppercase sm:text-sm">
              {comCorredor ? 'Com Green Corridor' : 'Sem Green Corridor'}
            </span>
          </div>
        </div>

        <div className="mt-10">
          <MapaCanvas
            aoMudarCenario={mudarCenario}
            aoAtualizarInfo={setInfo}
          />
        </div>

        <div className="mt-8 grid divide-y divide-[#C4C3A8]/20 border-y border-[#C4C3A8]/25 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-5 sm:pr-6">
            <p className="text-xs font-medium text-[#C4C3A8]">
              Cenário em execução
            </p>
            <p className="font-editorial mt-1 text-2xl text-[#E9E6D5]">
              {comCorredor
                ? 'Com Green Corridor (Via livre)'
                : 'Sem Green Corridor (Sensor 100 m)'}
            </p>
          </div>

          <div className="py-5 sm:px-6">
            <p className="text-xs font-medium text-[#C4C3A8]">
              Semáforos abertos na rota
            </p>
            <p className="font-editorial mt-1 text-2xl text-[#E9E6D5] tabular-nums">
              {info.abertos} de {info.total} cruzamentos
            </p>
          </div>

          <div className="py-5 sm:pl-6">
            <p className="text-xs font-medium text-[#C4C3A8]">Estado da via</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#E9E6D5]">
              {info.textoStatus}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
