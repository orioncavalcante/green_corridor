import { useState } from 'react';

const linksMenu = [
  { nome: 'O Problema', link: '#problema' },
  { nome: 'A Solução', link: '#solucao' },
  { nome: 'Propósito', link: '#modelo' },
  { nome: 'Simulação', link: '#simulador' },
  { nome: 'Central API', link: '#central-api' },
];

export default function Navbar({ escuro, trocarTema }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-8">
      <nav
        aria-label="Navegação principal"
        className="nav-glass-pill mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-colors duration-300"
      >
        <a
          href="#hero"
          className="flex items-center text-[var(--text-main)] transition-opacity hover:opacity-80"
        >
          <span className="font-editorial text-2xl tracking-normal">
            Green Corridor
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {linksMenu.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                className="text-sm font-medium text-[var(--text-body)] transition-colors hover:text-[var(--text-main)]"
              >
                {item.nome}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={trocarTema}
            aria-label={escuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-line)] bg-[var(--bg-card)] text-[var(--text-main)] transition-colors hover:bg-[#34472A] hover:text-[#E9E6D5]"
          >
            {escuro ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          <a
            href="#simulador"
            className="inline-flex items-center justify-center rounded-full bg-[#741923] px-5 py-2.5 text-xs font-semibold tracking-wide text-[#E9E6D5] shadow-md shadow-[#741923]/20 transition-all hover:-translate-y-0.5 hover:bg-[#5c121b] sm:text-sm"
          >
            Ver simulação
          </a>

          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-expanded={menuAberto}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-line)] bg-[var(--bg-card)] text-[var(--text-main)] transition-colors md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="h-4 w-4"
            >
              {menuAberto ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuAberto && (
        <div className="nav-glass-pill mx-auto mt-2 max-w-5xl rounded-2xl p-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {linksMenu.map((item) => (
              <li key={item.link}>
                <a
                  href={item.link}
                  onClick={() => setMenuAberto(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-main)] transition-colors hover:bg-[var(--bg-card)]"
                >
                  {item.nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
