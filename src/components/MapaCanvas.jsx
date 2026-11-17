import { useEffect, useRef } from 'react';
import {
  DISTANCIA_ABERTURA,
  montarCaminho,
  pegarPosicao,
  verSeSemaforoAbriu,
} from '../utils/calculos';

export default function MapaCanvas({ aoMudarCenario, aoAtualizarInfo }) {
  const telaRef = useRef(null);
  const tagOrigemRef = useRef(null);
  const tagHospitalRef = useRef(null);
  const camadaEscuraRef = useRef(null);

  useEffect(() => {
    const tela = telaRef.current;
    if (!tela) return undefined;
    const ctx = tela.getContext('2d');

    let idAnimacao;
    let largura = 1280;
    let altura = 720;

    function ajustarTamanho() {
      const caixa = tela.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = caixa.width || 1280;
      altura = caixa.height || 720;
      tela.width = largura * dpr;
      tela.height = altura * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ajustarTamanho();
    window.addEventListener('resize', ajustarTamanho);

    function projetar(wx, wy, wz) {
      const escala = largura / 68;
      const centroX = largura * 0.52;
      const centroY = altura * 0.54;
      const x = (wx - wz * 0.72) * escala;
      const y = (wx * 0.34 + wz * 0.42 - wy * 0.92) * escala;
      return { x: centroX + x, y: centroY + y, escala };
    }

    function desenharBloco(wx, wy, wz, w, h, d, corTopo, corEsq, corDir, corBorda) {
      const mw = w / 2;
      const md = d / 2;

      const p100 = projetar(wx + mw, wy, wz - md);
      const p101 = projetar(wx + mw, wy, wz + md);
      const p001 = projetar(wx - mw, wy, wz + md);

      const p010 = projetar(wx - mw, wy + h, wz - md);
      const p110 = projetar(wx + mw, wy + h, wz - md);
      const p111 = projetar(wx + mw, wy + h, wz + md);
      const p011 = projetar(wx - mw, wy + h, wz + md);

      ctx.beginPath();
      ctx.moveTo(p001.x, p001.y);
      ctx.lineTo(p101.x, p101.y);
      ctx.lineTo(p111.x, p111.y);
      ctx.lineTo(p011.x, p011.y);
      ctx.closePath();
      ctx.fillStyle = corEsq;
      ctx.fill();
      if (corBorda) {
        ctx.strokeStyle = corBorda;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(p100.x, p100.y);
      ctx.lineTo(p101.x, p101.y);
      ctx.lineTo(p111.x, p111.y);
      ctx.lineTo(p110.x, p110.y);
      ctx.closePath();
      ctx.fillStyle = corDir;
      ctx.fill();
      if (corBorda) {
        ctx.strokeStyle = corBorda;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(p010.x, p010.y);
      ctx.lineTo(p110.x, p110.y);
      ctx.lineTo(p111.x, p111.y);
      ctx.lineTo(p011.x, p011.y);
      ctx.closePath();
      ctx.fillStyle = corTopo;
      ctx.fill();
      if (corBorda) {
        ctx.strokeStyle = corBorda;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    const quadras = [];
    const posQuadras = [-22, -11, 0, 11, 22];
    let semente = 42;

    function sortear() {
      semente = (semente * 1664525 + 1013904223) % 4294967296;
      return semente / 4294967296;
    }

    for (const qx of posQuadras) {
      for (const qz of posQuadras) {
        const ehHospital = qx === 11 && qz === -11;
        const predios = [];

        if (!ehHospital) {
          const qtd = sortear() > 0.35 ? 2 : 1;
          for (let i = 0; i < qtd; i++) {
            const ox = qtd === 1 ? 0 : i === 0 ? -1.4 : 1.4;
            const oz = qtd === 1 ? 0 : i === 0 ? -1.2 : 1.2;
            const alt = 1.6 + sortear() * 4.8;
            const tam = qtd === 1 ? 4.8 : 2.8;
            predios.push({ x: qx + ox, z: qz + oz, w: tam, d: tam, h: alt });
          }
        }

        quadras.push({ qx, qz, ehHospital, predios });
      }
    }

    const curvas = [
      { x: -18, z: 5.5 },
      { x: -5.5, z: 5.5 },
      { x: -5.5, z: -11 },
      { x: 9.2, z: -11 },
    ];

    const caminho = montarCaminho(curvas, 40);
    const { pontos: pontosRota, distancias, tamanhoTotal } = caminho;

    const semaforos = [
      { id: 1, x: -11, z: 5.5, s: 7.0, aberto: false },
      { id: 2, x: -5.5, z: 5.5, s: 12.5, aberto: false },
      { id: 3, x: -5.5, z: -5.5, s: 23.5, aberto: false },
      { id: 4, x: 5.5, z: -11, s: 39.5, aberto: false },
    ];

    const carros = [
      { s0: 4.8, s: 4.8, desvio: 0.12 },
      { s0: 10.2, s: 10.2, desvio: -0.12 },
      { s0: 17.0, s: 17.0, desvio: 0.12 },
      { s0: 21.2, s: 21.2, desvio: -0.12 },
      { s0: 31.2, s: 31.2, desvio: 0.12 },
      { s0: 36.0, s: 36.0, desvio: -0.12 },
    ];

    let cenario = 1;
    let distAmb = 0;
    let velAmb = 0;
    let etapa = 'rodando';
    let tempoEtapa = 0;
    let ultimoAviso = 0;

    function reiniciar(novoCenario) {
      cenario = novoCenario;
      distAmb = 0;
      velAmb = 0;

      for (const sem of semaforos) {
        sem.aberto = false;
      }

      for (let i = 0; i < carros.length; i++) {
        carros[i].s = carros[i].s0;
        carros[i].desvio = i % 2 === 0 ? 0.14 : -0.14;
      }

      if (aoMudarCenario) {
        aoMudarCenario(novoCenario === 1 ? 'sem' : 'com');
      }
    }

    reiniciar(1);

    let tempoAnterior = performance.now();

    function atualizarFisica(dt, agora) {
      let velAlvo = cenario === 1 ? 6.2 : 9.6;

      for (const sem of semaforos) {
        sem.aberto = verSeSemaforoAbriu(cenario, distAmb, sem.s, DISTANCIA_ABERTURA);
        if (cenario === 1 && !sem.aberto && distAmb > sem.s - 4.2 && distAmb < sem.s) {
          velAlvo = Math.min(velAlvo, 1.3);
        }
      }

      for (let i = 0; i < carros.length; i++) {
        const carro = carros[i];
        const lado = i % 2 === 0 ? 1 : -1;
        const falta = carro.s - distAmb;

        if (cenario === 1) {
          if (falta > 0 && falta < 3.6) {
            velAlvo = Math.min(velAlvo, 1.7);
          }
          const alvoDesvio = falta < 2.8 && falta > -2.5 ? lado * 1.35 : lado * 0.14;
          carro.desvio += (alvoDesvio - carro.desvio) * Math.min(1, dt * 2.5);
        } else {
          const ondaChegou = falta <= DISTANCIA_ABERTURA + 1.5;
          const alvoDesvio = ondaChegou ? lado * 1.45 : lado * 0.14;
          carro.desvio += (alvoDesvio - carro.desvio) * Math.min(1, dt * 3.8);
        }
      }

      const restante = tamanhoTotal - distAmb;
      if (restante < 3.5) {
        velAlvo = Math.min(velAlvo, 1.5 + restante * 1.4);
      }

      velAmb += (velAlvo - velAmb) * Math.min(1, dt * 4.5);
      distAmb = Math.min(tamanhoTotal, distAmb + velAmb * dt);

      if (restante < 0.12 && etapa === 'rodando') {
        etapa = 'pausa';
        tempoEtapa = 0;
      }

      if (agora - ultimoAviso > 180 && aoAtualizarInfo) {
        ultimoAviso = agora;
        const abertos = semaforos.filter((s) => s.aberto).length;
        const kmh = Math.round((velAmb / 9.6) * 72);

        aoAtualizarInfo({
          velocidade: kmh,
          abertos: abertos,
          total: semaforos.length,
          textoStatus:
            cenario === 1
              ? 'Sinais fechados à frente · Fila retendo a viatura'
              : `Onda preventiva abrindo semáforos (${abertos}/${semaforos.length} abertos)`,
        });
      }
    }

    function desenharCena(agora) {
      ctx.fillStyle = '#09140D';
      ctx.fillRect(0, 0, largura, altura);

      const ruas = [-16.5, -5.5, 5.5, 16.5];
      ctx.strokeStyle = '#1D2C22';
      ctx.lineWidth = (largura / 68) * 3.1;
      ctx.lineCap = 'round';

      for (const r of ruas) {
        const a1 = projetar(r, 0, -28);
        const a2 = projetar(r, 0, 28);
        ctx.beginPath();
        ctx.moveTo(a1.x, a1.y);
        ctx.lineTo(a2.x, a2.y);
        ctx.stroke();

        const b1 = projetar(-28, 0, r);
        const b2 = projetar(28, 0, r);
        ctx.beginPath();
        ctx.moveTo(b1.x, b1.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.stroke();
      }

      ctx.beginPath();
      pontosRota.forEach((pt, i) => {
        const p = projetar(pt.x, 0.05, pt.z);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });

      if (cenario === 1) {
        ctx.strokeStyle = 'rgba(116, 25, 35, 0.42)';
        ctx.lineWidth = (largura / 68) * 1.9;
        ctx.stroke();

        ctx.strokeStyle = '#D97724';
        ctx.lineWidth = (largura / 68) * 0.48;
        ctx.stroke();
      } else {
        ctx.strokeStyle = 'rgba(196, 195, 168, 0.18)';
        ctx.lineWidth = (largura / 68) * 0.38;
        ctx.stroke();

        const frenteOnda = Math.min(tamanhoTotal, distAmb + DISTANCIA_ABERTURA);
        ctx.beginPath();
        for (let i = 0; i < pontosRota.length; i++) {
          if (distancias[i] > frenteOnda) break;
          const p = projetar(pontosRota[i].x, 0.06, pontosRota[i].z);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.34)';
        ctx.lineWidth = (largura / 68) * 2.0;
        ctx.stroke();

        ctx.strokeStyle = '#34D399';
        ctx.lineWidth = (largura / 68) * 0.52;
        ctx.stroke();
      }

      const objetos = [];

      for (const q of quadras) {
        objetos.push({
          ordem: q.qx + q.qz,
          desenhar: () => {
            desenharBloco(
              q.qx,
              0,
              q.qz,
              7.2,
              0.22,
              7.2,
              '#16261B',
              '#101C14',
              '#0D1710',
              'rgba(196,195,168,0.14)'
            );

            if (q.ehHospital) {
              desenharBloco(
                q.qx,
                0.22,
                q.qz,
                5.4,
                4.4,
                5.0,
                '#E9E6D5',
                '#C4C3A8',
                '#A6A58C',
                '#34472A'
              );
              desenharBloco(q.qx, 4.62, q.qz, 1.6, 0.45, 0.5, '#741923', '#5C121B', '#470D14');
              desenharBloco(q.qx, 4.62, q.qz, 0.5, 0.45, 1.6, '#741923', '#5C121B', '#470D14');
            } else {
              for (const pr of q.predios) {
                desenharBloco(
                  pr.x,
                  0.22,
                  pr.z,
                  pr.w,
                  pr.h,
                  pr.d,
                  '#233626',
                  '#18271B',
                  '#121E15',
                  'rgba(196,195,168,0.22)'
                );
              }
            }
          },
        });
      }

      for (const carro of carros) {
        const pos = pegarPosicao(caminho, carro.s);
        const cx = pos.x - pos.dz * carro.desvio;
        const cz = pos.z + pos.dx * carro.desvio;

        objetos.push({
          ordem: cx + cz,
          desenhar: () => {
            desenharBloco(cx, 0.1, cz, 1.15, 0.55, 1.15, '#C4C3A8', '#8E8D76', '#6E6D5A');
          },
        });
      }

      const posAmb = pegarPosicao(caminho, distAmb);
      objetos.push({
        ordem: posAmb.x + posAmb.z + 0.5,
        desenhar: () => {
          const pisca = Math.floor(agora / 140) % 2 === 0;
          const pChao = projetar(posAmb.x, 0.08, posAmb.z);
          const luz = ctx.createRadialGradient(
            pChao.x,
            pChao.y,
            2,
            pChao.x,
            pChao.y,
            pChao.escala * 3.2
          );
          luz.addColorStop(
            0,
            pisca ? 'rgba(233, 230, 213, 0.55)' : 'rgba(116, 25, 35, 0.55)'
          );
          luz.addColorStop(1, 'rgba(16, 36, 22, 0)');
          ctx.fillStyle = luz;
          ctx.beginPath();
          ctx.arc(pChao.x, pChao.y, pChao.escala * 3.2, 0, Math.PI * 2);
          ctx.fill();

          desenharBloco(
            posAmb.x,
            0.12,
            posAmb.z,
            1.65,
            0.95,
            1.65,
            '#E9E6D5',
            '#D5D1BC',
            '#741923',
            '#102416'
          );

          desenharBloco(
            posAmb.x,
            1.08,
            posAmb.z,
            0.65,
            0.22,
            0.65,
            pisca ? '#FF3B30' : '#38BDF8',
            '#741923',
            '#102416'
          );
        },
      });

      for (const sem of semaforos) {
        objetos.push({
          ordem: sem.x + sem.z + 1.2,
          desenhar: () => {
            const pBase = projetar(sem.x + 1.6, 0, sem.z - 1.6);
            const pTopo = projetar(sem.x + 1.6, 2.8, sem.z - 1.6);

            ctx.beginPath();
            ctx.moveTo(pBase.x, pBase.y);
            ctx.lineTo(pTopo.x, pTopo.y);
            ctx.strokeStyle = '#C4C3A8';
            ctx.lineWidth = 2;
            ctx.stroke();

            const corLuz = sem.aberto ? '#34D399' : '#FF3B30';
            ctx.beginPath();
            ctx.arc(pTopo.x, pTopo.y, pTopo.escala * 0.44, 0, Math.PI * 2);
            ctx.fillStyle = corLuz;
            ctx.shadowColor = corLuz;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
          },
        });
      }

      objetos.sort((a, b) => a.ordem - b.ordem);
      objetos.forEach((item) => item.desenhar());

      const pInicio = projetar(curvas[0].x, 0.1, curvas[0].z);
      ctx.beginPath();
      ctx.arc(pInicio.x, pInicio.y, pInicio.escala * 0.9, 0, Math.PI * 2);
      ctx.strokeStyle = '#E9E6D5';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (tagOrigemRef.current) {
        tagOrigemRef.current.style.left = `${(pInicio.x / largura) * 100}%`;
        tagOrigemRef.current.style.top = `${(pInicio.y / altura) * 100}%`;
      }
      if (tagHospitalRef.current) {
        const pHosp = projetar(11, 5.4, -11);
        tagHospitalRef.current.style.left = `${(pHosp.x / largura) * 100}%`;
        tagHospitalRef.current.style.top = `${(pHosp.y / altura) * 100}%`;
      }
    }

    function ciclo(agora) {
      const dt = Math.min(0.05, (agora - tempoAnterior) / 1000);
      tempoAnterior = agora;

      if (etapa === 'rodando') {
        atualizarFisica(dt, agora);
      } else {
        tempoEtapa += dt;
        if (etapa === 'pausa' && tempoEtapa > 0.65) {
          etapa = 'saindo';
          tempoEtapa = 0;
        } else if (etapa === 'saindo') {
          if (camadaEscuraRef.current) {
            camadaEscuraRef.current.style.opacity = String(
              Math.min(1, tempoEtapa / 0.35)
            );
          }
          if (tempoEtapa > 0.35) {
            reiniciar(cenario === 1 ? 2 : 1);
            etapa = 'entrando';
            tempoEtapa = 0;
          }
        } else if (etapa === 'entrando') {
          if (camadaEscuraRef.current) {
            camadaEscuraRef.current.style.opacity = String(
              Math.max(0, 1 - tempoEtapa / 0.35)
            );
          }
          if (tempoEtapa > 0.35) {
            if (camadaEscuraRef.current) camadaEscuraRef.current.style.opacity = '0';
            etapa = 'rodando';
          }
        }
      }

      desenharCena(agora);
      idAnimacao = requestAnimationFrame(ciclo);
    }

    idAnimacao = requestAnimationFrame(ciclo);

    return () => {
      cancelAnimationFrame(idAnimacao);
      window.removeEventListener('resize', ajustarTamanho);
    };
  }, [aoMudarCenario, aoAtualizarInfo]);

  return (
    <div className="relative aspect-video w-full select-none overflow-hidden rounded-2xl border border-[#C4C3A8]/30 bg-[#09140D] shadow-2xl">
      <canvas ref={telaRef} className="block h-full w-full" />

      <div
        ref={tagOrigemRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded-md bg-[#741923] px-3 py-1 text-[11px] font-bold tracking-wider text-[#E9E6D5] uppercase shadow-lg sm:text-xs"
      >
        Local da Ocorrência
      </div>

      <div
        ref={tagHospitalRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border-2 border-[#741923] bg-[#E9E6D5] px-3 py-1 text-xs font-extrabold tracking-wide text-[#102416] shadow-xl sm:text-sm"
      >
        <span className="mr-1 text-[#741923]">✚</span> HOSPITAL
      </div>

      <div
        ref={camadaEscuraRef}
        className="pointer-events-none absolute inset-0 bg-[#09140D] opacity-0 transition-opacity duration-75"
      />
    </div>
  );
}
