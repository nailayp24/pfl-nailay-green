import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// Layouts
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

// Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ServiceList = lazy(() => import("./pages/ServiceList"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail")); // Tambahan Detail Page
const Mechanics = lazy(() => import("./pages/Mechanics"));
const Coverage = lazy(() => import("./pages/Coverage"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth Group */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />        
        </Route>

        {/* Main Dashboard Group */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          
          {/* Grouping Services */}
          <Route path="/services">
            <Route index element={<ServiceList />} /> {/* Muncul di /services */}
            <Route path=":id" element={<ServiceDetail />} /> {/* Muncul di /services/1 */}
          </Route>

          {/* Menjaga agar link lama /active-services tetap jalan tapi pindah ke /services */}
          <Route path="/active-services" element={<Navigate to="/services" replace />} />

          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/coverage" element={<Coverage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}