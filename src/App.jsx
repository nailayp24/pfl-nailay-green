import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// Layouts
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

// Pages Core Internal
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ServiceList = lazy(() => import("./pages/ServiceList"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail")); 
const Mechanics = lazy(() => import("./pages/Mechanics"));
const Coverage = lazy(() => import("./pages/Coverage"));
const Components = lazy(() => import("./pages/Components")); 
const ServiceSimulation = lazy(() => import("./pages/ServiceSimulation"));

// Basis Data CRM Pages & Promo
const Inventory = lazy(() => import("./pages/Inventory"));
const Customers = lazy(() => import("./pages/Customers"));

// Auth Pages & Wildcard
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));
const NotFound = lazy(() => import("./pages/NotFound"));

// 🌐 Halaman Publik / Guest Landing Page (Tampilan Awal Utama)
const GuestLanding = lazy(() => import("./pages/GuestLanding"));

// 🔒 Route Guard: Memeriksa token session login staff/owner
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("user_session");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* 1. GERBANG UTAMA LUAR: Langsung terbuka untuk publik tanpa login */}
        <Route path="/" element={<GuestLanding />} />

        {/* 2. GERBANG AUTH: Proses Masuk & Registrasi Akun */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />        
        </Route>

        {/* 3. GERBANG INTERNAL BENGKEL: Diproteksi ketat & dibungkus Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Jalur internal dashboard bengkel */}
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/service-simulation" element={<ServiceSimulation />} />

          {/* Grouping Sub-Menu Services */}
          <Route path="/services">
            <Route index element={<ServiceList />} /> 
            <Route path=":id" element={<ServiceDetail />} /> 
          </Route>
          <Route path="/active-services" element={<Navigate to="/services" replace />} />

          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/coverage" element={<Coverage />} />
          <Route path="/components" element={<Components />} />

          {/* Sisa Rute Wildcard untuk 404 Halaman Tidak Ditemukan */}
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </Suspense>
  );
}