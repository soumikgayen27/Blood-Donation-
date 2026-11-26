import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ToastProvider } from '@/components/ToastProvider';
import { ensureSeed } from '@/lib/store';
import { HomePage } from '@/pages/HomePage';
import { FindDonorsPage } from '@/pages/FindDonorsPage';
import { RegisterDonorPage } from '@/pages/RegisterDonorPage';
import { BloodRequestPage } from '@/pages/BloodRequestPage';
import { AdminPage } from '@/pages/AdminPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="*"
          element={
            <AppShell>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/find" element={<FindDonorsPage />} />
                <Route path="/register" element={<RegisterDonorPage />} />
                <Route path="/request" element={<BloodRequestPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  useEffect(() => {
    ensureSeed();
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
