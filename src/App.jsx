import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// Layouts
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

// Pages Core
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ServiceList = lazy(() => import("./pages/ServiceList"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail")); 
const Mechanics = lazy(() => import("./pages/Mechanics"));
const Coverage = lazy(() => import("./pages/Coverage"));
const Components = lazy(() => import("./pages/Components")); 
const ServiceSimulation = lazy(() => import("./pages/ServiceSimulation"));

// Basis Data CRM Pages 
const Inventory = lazy(() => import("./pages/Inventory"));
const Customers = lazy(() => import("./pages/Customers"));

// Auth Pages & Wildcard
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));
const NotFound = lazy(() => import("./pages/NotFound"));

// 🔒 KOMPONEN PROTEKSI: Memeriksa apakah user sudah login atau belum
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("user_session");
  
  // Jika belum login, paksa pindah ke halaman login langsung
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth Group (Bisa diakses tanpa harus login) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />        
        </Route>

        {/* Main Dashboard Group (Wajib Login dulu via ProtectedRoute) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Saat buka localhost pertama kali, halaman utama ini langsung diproteksi */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Grouping Services */}
          <Route path="/services">
            <Route index element={<ServiceList />} /> 
            <Route path=":id" element={<ServiceDetail />} /> 
          </Route>

          <Route path="/active-services" element={<Navigate to="/services" replace />} />

          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/coverage" element={<Coverage />} />
          <Route path="/components" element={<Components />} />

          {/* Rute Basis Data CRM Bengkel */}
          <Route path="/service-simulation" element={<ServiceSimulation />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/customers" element={<Customers />} />

          {/* Sisa Rute Wildcard untuk 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}