import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import WineList from './pages/WineList';
import WineDetail from './pages/WineDetail';
import ScrollToTop from './components/ScrollToTop';
import Ornament from './components/Ornament';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-cellar font-sans text-cream">
        <Header />
        <main className="flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<WineList />} />
              <Route path="/wine/:id" element={<WineDetail />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <footer className="mt-16 border-t border-gold/20 py-10 text-center">
          <div className="mx-auto max-w-[180px] px-4">
            <Ornament className="w-full" />
          </div>
          <p className="mt-4 font-display text-xl font-semibold text-cream">
            Amén Wines
          </p>
          <p className="data-label mt-3 text-[10px] text-muted-dark">
            Selección de Bodegas Andrade y Bodegas Sauci
          </p>
          <p className="data-label mt-1.5 text-[10px] text-muted-dark/70">
            D.O. Condado de Huelva
          </p>
        </footer>
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
