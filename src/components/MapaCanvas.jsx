import { useEffect } from 'react';

export default function MapaCanvas({ aoMudarCenario, aoAtualizarInfo }) {
  useEffect(() => {
    function receberMensagem(evento) {
      const dados = evento.data;
      if (!dados || dados.tipo !== 'sim3d') return;

      if (aoMudarCenario) {
        aoMudarCenario(dados.cenario);
      }

      if (aoAtualizarInfo) {
        aoAtualizarInfo({
          velocidade: dados.cenario === 'com' ? 72 : 34,
          abertos: dados.abertos,
          total: dados.total,
          textoStatus:
            dados.cenario === 'sem'
              ? 'Sinais fechados à frente · Fila retendo a viatura'
              : `Onda preventiva abrindo semáforos (${dados.abertos}/${dados.total} abertos)`,
        });
      }
    }

    window.addEventListener('message', receberMensagem);
    return () => window.removeEventListener('message', receberMensagem);
  }, [aoMudarCenario, aoAtualizarInfo]);

  return (
    <div className="relative aspect-video w-full select-none overflow-hidden rounded-2xl border border-[#C4C3A8]/30 bg-[#07090d] shadow-2xl">
      <iframe
        src="/simulacao.html"
        title="Green Corridor — Simulação 3D"
        className="pointer-events-none absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
