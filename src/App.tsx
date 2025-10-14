import { useState, useEffect } from 'react';
import AgeConfirmation from './components/AgeConfirmation';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mieterinnen from './pages/Mieterinnen';
import Escorts from './pages/Escorts';
import Ambiente from './pages/Ambiente';
import Angebot from './pages/Angebot';
import Leistungen from './pages/Leistungen';
import Gaestebuch from './pages/Gaestebuch';
import Kontakt from './pages/Kontakt';
import Jobs from './pages/Jobs';
import Buchen from './pages/Buchen';
import Admin from './pages/Admin';
import Languages from './pages/Languages';
import ProfileView from './pages/ProfileView';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import AGB from './pages/AGB';
import ScrollToTop from './lib/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <main className="w-full min-h-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mieterinnen" element={<Mieterinnen />} />
          <Route path="/mieterinnen/:id" element={<ProfileView />} />
          <Route path="/escorts" element={<Escorts />} />
          <Route path="/ambiente" element={<Ambiente />} />
          <Route path="/angebot" element={<Angebot />} />
          <Route path="/leistungen" element={<Leistungen />} />
          <Route path="/gaestebuch" element={<Gaestebuch />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/buchen" element={<Buchen />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  useEffect(() => {
    const confirmed = localStorage.getItem('ageConfirmed') === 'true';
    setAgeConfirmed(confirmed);
  }, []);

  const handleConfirm = () => {
    setAgeConfirmed(true);
  };

  if (!ageConfirmed) {
    return <AgeConfirmation onConfirm={handleConfirm} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-900 overflow-hidden">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
