import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import WineList from './pages/WineList';
import WineDetail from './pages/WineDetail';
import ScrollToTop from './components/ScrollToTop';
import Ornament from './components/Ornament';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-bg font-sans text-ink">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<WineList />} />
            <Route path="/wine/:id" element={<WineDetail />} />
          </Routes>
        </main>
        <footer className="mt-12 border-t border-line bg-surface py-8 text-center">
          <div className="mx-auto max-w-xs px-4">
            <Ornament className="w-full" />
          </div>
          <p className="mt-3 font-display text-lg font-semibold text-ink">
            Bodegas Andrade · Bodegas Sauci
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted">
            Carta de formación para sala
          </p>
        </footer>
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
