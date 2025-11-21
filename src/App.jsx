import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Portada from './pages/Portada';
import TimelinePublica from './pages/TimelinePublica';
import GestorInventari from './pages/GestorInventari';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />

        {/* Main content */}
        <main>
          <Routes>
            <Route path="/" element={<Portada />} />
            <Route path="/decada/:decade" element={<TimelinePublica />} />
            <Route path="/gestor" element={<GestorInventari />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
