import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Deals from './pages/Deals';
import Branches from './pages/Branches';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';

// Admin Pages (lazy loaded to split the bundle)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminDeals = lazy(() => import('./pages/admin/AdminDeals'));
const AdminBranches = lazy(() => import('./pages/admin/AdminBranches'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-brand-black">
    <Loader2 size={36} className="animate-spin text-brand-yellow" />
  </div>
);

// Scroll to top whenever the route changes
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);
  return null;
}

// Layout wrapper for public pages
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <ScrollToTop />
          <Routes>
            {/* Public routes with Navbar + Footer */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/menu" element={<PublicLayout><Menu /></PublicLayout>} />
            <Route path="/deals" element={<PublicLayout><Deals /></PublicLayout>} />
            <Route path="/branches" element={<PublicLayout><Branches /></PublicLayout>} />
            <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
            <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
            <Route path="/order/:orderNumber" element={<PublicLayout><OrderStatus /></PublicLayout>} />

            {/* Admin login (no layout) */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin protected routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="deals" element={<AdminDeals />} />
              <Route path="branches" element={<AdminBranches />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={
              <PublicLayout>
                <div className="min-h-screen flex items-center justify-center text-center pt-20">
                  <div>
                    <div className="text-8xl mb-6">🍕</div>
                    <h1 className="font-heading font-900 text-5xl text-white mb-4">404</h1>
                    <p className="text-gray-400 text-lg mb-8">This page went out for delivery and never came back.</p>
                    <a href="/" className="btn-primary text-lg px-8 py-4">Go Home</a>
                  </div>
                </div>
              </PublicLayout>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
