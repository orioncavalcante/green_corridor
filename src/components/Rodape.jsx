export default function Rodape({ escuro, trocarTema }) {
  return (
    <footer className="border-t border-[#C4C3A8]/25 bg-[#102416] px-6 py-14 text-[#E9E6D5]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 pb-10 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
          <div>
            <a
              href="#hero"
              className="font-editorial text-3xl tracking-tight text-[#E9E6D5]"
            >
              Green Corridor
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#C4C3A8]">
              Gêmeo digital em nuvem para abertura preventiva de semáforos em
              emergências médicas urbanas (B2B e B2G).
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-[#E9E6D5] uppercase">
              Seções
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#C4C3A8]">
              <li>
                <a href="#problema" className="transition-colors hover:text-[#E9E6D5]">
                  O Problema
                </a>
              </li>
              <li>
                <a href="#solucao" className="transition-colors hover:text-[#E9E6D5]">
                  A Solução
                </a>
              </li>
              <li>
                <a href="#modelo" className="transition-colors hover:text-[#E9E6D5]">
                  Propósito
                </a>
              </li>
              <li>
                <a href="#simulador" className="transition-colors hover:text-[#E9E6D5]">
                  Simulação em Tempo Real
                </a>
              </li>
              <li>
                <a href="#central-api" className="transition-colors hover:text-[#E9E6D5]">
                  Central de Despachos (API)
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <p className="text-xs font-semibold tracking-wider text-[#E9E6D5] uppercase">
              Aparência
            </p>
            <button
              type="button"
              onClick={trocarTema}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#C4C3A8]/35 bg-[#34472A]/60 px-4 py-2 text-xs font-medium text-[#E9E6D5] transition-colors hover:bg-[#34472A]"
            >
              <span>{escuro ? 'Tema Escuro ativo' : 'Tema Claro ativo'}</span>
              <span className="text-[#C4C3A8]">· Alternar</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-[#C4C3A8]/20 pt-6 text-xs text-[#C4C3A8]/75 sm:flex-row">
          <p>© {new Date().getFullYear()} Green Corridor · Global Solution FIAP</p>
          <p>Simulador de Gêmeo Digital Urbano · React + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
