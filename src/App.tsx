import { useState, useEffect } from 'react';
import AgeConfirmation from './components/AgeConfirmation';
import Maintenance from './components/Maintenance';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mieterinnen from './pages/Mieterinnen';
import Escorts from './pages/Escorts';
import Ambiente from './pages/Ambiente';
import AmbienteDetail from './pages/AmbienteDetail';
import Angebot from './pages/Angebot';
import AngebotDetail from './pages/AngebotDetail';
import Leistungen from './pages/Leistungen';
import Gaestebuch from './pages/Gaestebuch';
import Kontakt from './pages/Kontakt';
import Jobs from './pages/Jobs';
import Buchen from './pages/Buchen';
import Admin from './pages/Admin';
import Languages from './pages/Languages';
import UmamiDashboard from './components/UmamiDashboard';
import ProfileView from './pages/ProfileView';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import AGB from './pages/AGB';
import ScrollToTop from './lib/ScrollToTop';
import { API } from './lib/useFetch';
import { useUmami } from './hooks/useUmami';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  useUmami();

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
          <Route path="/ambiente/:id" element={<AmbienteDetail />} />
          <Route path="/angebot" element={<Angebot />} />
          <Route path="/angebot/:id" element={<AngebotDetail />} />
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
          <Route path="/analytics" element={<UmamiDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState<boolean>(false);
  const [settingsLoaded, setSettingsLoaded] = useState<boolean>(false);
  const [ageConfirmationEnabled, setAgeConfirmationEnabled] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  // Load persisted age confirmation
  useEffect(() => {
    const confirmed = localStorage.getItem('ageConfirmed') === 'true';
    setAgeConfirmed(confirmed);
  }, []);

  // Fetch public settings (maintenance toggle, etc.)
  useEffect(() => {
    let isMounted = true;
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API.base}/settings?t=${Date.now()}`);
        if (!res.ok) throw new Error(`Failed settings fetch: ${res.status}`);
        const data = await res.json();
        if (!isMounted) return;
        // Debug instrumentation
        console.log('[Settings] Raw response:', data);
        console.log('[Settings] maintenance_mode typeof', typeof data?.maintenance_mode, 'value:', data?.maintenance_mode);
        setMaintenanceEnabled(Boolean(data?.maintenance_mode));
        setAgeConfirmationEnabled(Boolean(data?.age_confirmation));
      } catch (e) {
        // Fail-open: if settings endpoint is unavailable, do not block the app
        console.warn('Settings fetch failed, proceeding without maintenance flag.', e);
      } finally {
        if (isMounted) setSettingsLoaded(true);
      }
    };
    fetchSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  // Check authentication status when maintenance mode is enabled
  useEffect(() => {
    if (!maintenanceEnabled || authChecked) return;

    let isMounted = true;
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API.base}/user`, {
          credentials: 'include', // Include cookies for authentication
        });
        if (!isMounted) return;
        if (res.ok) {
          const userData = await res.json();
          setIsAuthenticated(userData && Object.keys(userData).length > 0);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.warn('Auth check failed, assuming not authenticated.', e);
        setIsAuthenticated(false);
      } finally {
        if (isMounted) setAuthChecked(true);
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [maintenanceEnabled, authChecked]);

  const handleConfirm = () => {
    setAgeConfirmed(true);
  };

  // Determine if current path is admin without relying on Router context
  const isAdminPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  // Wait for settings before deciding what to render to avoid flicker
  if (!settingsLoaded) {
    return null;
  }

  // Maintenance mode overrides everything for non-admin paths
  // Allow authenticated users to bypass maintenance mode
  if (maintenanceEnabled && !isAdminPath) {
    // If we haven't checked auth yet, show loading or wait
    if (isAuthenticated === null) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      );
    }
    // If not authenticated, show maintenance mode
    if (!isAuthenticated) {
      return <Maintenance onConfirm={() => { /* no-op to satisfy component signature */ }} />;
    }
    // If authenticated, allow access (continue to normal app flow)
  }

  // Age confirmation gate (only when not in admin paths)
  if (!isAdminPath && ageConfirmationEnabled && !ageConfirmed) {
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
