import { useState, useCallback } from 'react';

export function useSimulacao() {
  const [cenario, setCenarioEstado] = useState('sem');
  const [info, setInfo] = useState({
    velocidade: 0,
    abertos: 0,
    total: 4,
    textoStatus: 'Sinais fechados à frente · Fila retendo a viatura',
  });

  const mudarCenario = useCallback((novo) => {
    setCenarioEstado(novo);
    setInfo((atual) => ({
      ...atual,
      textoStatus:
        novo === 'sem'
          ? 'Sinais fechados à frente · Fila retendo a viatura'
          : 'API CET ativa · Semáforos abertos com antecedência',
    }));
  }, []);

  return {
    cenario,
    mudarCenario,
    info,
    setInfo,
  };
}
