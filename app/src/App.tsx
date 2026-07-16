import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import WineList from './pages/WineList';
import WineDetail from './pages/WineDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-bg font-sans text-text">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<WineList />} />
            <Route path="/wine/:id" element={<WineDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
