import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Problema from './components/Problema';
import Solucao from './components/Solucao';
import Frase from './components/Frase';
import Simulador from './components/Simulador';
import PainelApi from './components/PainelApi';
import Rodape from './components/Rodape';
import { useTema } from './hooks/useTema';
import { useScrollSuave } from './hooks/useScrollSuave';

export default function App() {
  const { escuro, trocarTema } = useTema();
  useScrollSuave();

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-300">
      <Navbar escuro={escuro} trocarTema={trocarTema} />
      <main>
        <HeroSection />
        <Problema />
        <Solucao />
        <Frase />
        <Simulador />
        <PainelApi />
      </main>
      <Rodape escuro={escuro} trocarTema={trocarTema} />
    </div>
  );
}
