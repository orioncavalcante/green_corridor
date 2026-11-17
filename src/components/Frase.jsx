export default function Frase() {
  return (
    <section
      id="modelo"
      className="scroll-mt-20 border-t border-[var(--border-line)] bg-[var(--bg-page)] px-6 py-28 text-[var(--text-main)] transition-colors duration-300 sm:py-40"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <blockquote className="font-editorial text-4xl leading-[1.12] tracking-[-0.02em] text-balance text-[var(--text-main)] sm:text-5xl md:text-6xl">
          “Não mudamos a velocidade da ambulância.{' '}
          <span className="italic text-[#741923]">
            Mudamos a cidade inteira à frente dela.
          </span>
          ”
        </blockquote>

        <div
          aria-hidden="true"
          className="my-10 h-px w-20 bg-[var(--border-line)]"
        />

        <p className="max-w-xl text-base leading-relaxed text-[var(--text-body)] sm:text-lg">
          Aplicável tanto a hospitais privados (B2B) que precisam reduzir o
          tempo até o centro cirúrgico quanto a prefeituras e centrais do SAMU
          (B2G) que buscam eliminar retenções e acidentes em cruzamentos.
        </p>
      </div>
    </section>
  );
}
