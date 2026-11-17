import { useState, useEffect } from 'react';

export function useTema() {
  const [tema, setTema] = useState(() => {
    const salvo = localStorage.getItem('tema_site');
    if (salvo === 'dark' || salvo === 'light') {
      return salvo;
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    document.documentElement.style.colorScheme = tema;
    localStorage.setItem('tema_site', tema);
  }, [tema]);

  function trocarTema() {
    if (tema === 'dark') {
      setTema('light');
    } else {
      setTema('dark');
    }
  }

  return {
    tema,
    escuro: tema === 'dark',
    trocarTema,
  };
}
