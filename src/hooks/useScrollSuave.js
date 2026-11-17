import { useEffect } from 'react';

export function useScrollSuave() {
  useEffect(() => {
    let animacaoId = null;

    function rolarAte(destinoY) {
      if (animacaoId) cancelAnimationFrame(animacaoId);

      const inicioY = window.scrollY;
      const distancia = destinoY - inicioY;
      if (Math.abs(distancia) < 4) return;

      const duracao = 800;
      const horaInicio = performance.now();

      function animar(agora) {
        const tempoPassado = agora - horaInicio;
        const progresso = Math.min(tempoPassado / duracao, 1);
        const curva = 1 - Math.pow(1 - progresso, 4);

        window.scrollTo(0, inicioY + distancia * curva);

        if (progresso < 1) {
          animacaoId = requestAnimationFrame(animar);
        }
      }

      animacaoId = requestAnimationFrame(animar);
    }

    function aoClicar(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute('href');
      if (!id || id === '#') return;

      const elemento = document.querySelector(id);
      if (!elemento) return;

      e.preventDefault();
      const descontoTopo = id === '#hero' ? 0 : 76;
      const pos = elemento.getBoundingClientRect().top + window.scrollY - descontoTopo;

      rolarAte(Math.max(0, pos));
      window.history.pushState(null, '', id);
    }

    document.addEventListener('click', aoClicar);

    return () => {
      document.removeEventListener('click', aoClicar);
      if (animacaoId) cancelAnimationFrame(animacaoId);
    };
  }, []);
}
