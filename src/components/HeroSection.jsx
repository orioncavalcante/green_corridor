export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[560px] w-full overflow-hidden bg-[#102416]"
    >
      <style>{`
        @keyframes gc-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .gc-title { font-family: 'Libre Caslon Text', Georgia, serif; animation: gc-fade 1.1s cubic-bezier(.2,.7,.2,1) .15s both; }
        @media (prefers-reduced-motion: reduce) { .gc-title { animation: none; } }
      `}</style>

      <img
        src="/hero-ambulancia.jpg"
        alt="Ambulância em alta velocidade por uma avenida ao entardecer"
        className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
        fetchPriority="high"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102416]/80 via-[#102416]/15 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#102416]/35 to-transparent"
        aria-hidden="true"
      />

      <h1
        className="gc-title absolute inset-x-0 bottom-0 select-none whitespace-nowrap px-4 pb-5 text-center font-normal leading-[0.95] tracking-[-0.02em] text-[#E9E6D5] sm:pb-8"
        style={{
          fontSize: 'clamp(3rem, 12.5vw, 14rem)',
          textShadow: '0 2px 40px rgba(16,36,22,0.45)',
        }}
      >
        Green Corridor
      </h1>
    </section>
  );
}
