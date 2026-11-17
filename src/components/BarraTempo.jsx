import { useState } from 'react';
import { PERDA_POR_MINUTO, LIMITE_MINUTOS } from '../data/dadosProblema';
import { calcularChance } from '../utils/calculos';

export default function BarraTempo() {
  const [minutos, setMinutos] = useState(4);

  const { melhor, pior } = calcularChance(minutos, PERDA_POR_MINUTO);
  const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="border-y border-[var(--border-line)] py-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <label
            htmlFor="minutos-parado"
            className="text-sm font-medium text-[var(--text-body)]"
          >
            Minutos com a ambulância parada no trânsito
          </label>
          <p className="font-editorial mt-1 text-6xl leading-none text-[var(--text-main)] sm:text-7xl">
            {minutos} <span className="text-3xl sm:text-4xl">min</span>
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-[var(--text-body)]">
            Chance de sobreviver que ainda resta
          </p>
          <p
            className="font-editorial mt-1 text-6xl leading-none text-[#741923] sm:text-7xl"
            aria-live="polite"
          >
            {pior === melhor ? `${melhor}%` : `${pior}–${melhor}%`}
          </p>
        </div>
      </div>

      <div className="relative mt-8 h-3 w-full overflow-hidden rounded-full bg-[var(--border-line)]/45">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#741923]/35 transition-[width] duration-500 ease-out"
          style={{ width: `${melhor}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#741923] transition-[width] duration-500 ease-out"
          style={{ width: `${pior}%` }}
        />
      </div>

      <input
        id="minutos-parado"
        type="range"
        min={0}
        max={LIMITE_MINUTOS}
        step={1}
        value={minutos}
        onChange={(e) => setMinutos(Number(e.target.value))}
        className="mt-6 w-full cursor-pointer"
      />

      <div
        className="mt-2 flex justify-between text-xs text-[var(--text-body)]"
        aria-hidden="true"
      >
        {numeros.map((n) => (
          <span key={n} className="w-4 text-center tabular-nums">
            {n}
          </span>
        ))}
      </div>

      <p className="mt-6 text-xs text-[var(--text-muted)]">
        Estimativa para parada cardíaca sem atendimento: perda de 7% a 10% por
        minuto. Fonte: American Heart Association.
      </p>
    </div>
  );
}
