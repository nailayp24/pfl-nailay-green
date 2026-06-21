import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// ================= LAYOUTS =================
const MainLayout = lazy(() => import("./layouts/MainLayout")); // Layout untuk Staf/Owner
const MemberLayout = lazy(() => import("./layouts/MemberLayout")); // Layout untuk Member
const AuthLayout = lazy(() => import("./layouts/AuthLayout")); // Layout untuk Login/Register

// ================= PAGES INTERNAL BENGKEL =================
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ServiceList = lazy(() => import("./pages/ServiceList"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail")); 
const Mechanics = lazy(() => import("./pages/Mechanics"));
const Coverage = lazy(() => import("./pages/Coverage"));
const Components = lazy(() => import("./pages/Components")); 
const ServiceSimulation = lazy(() => import("./pages/ServiceSimulation"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Customers = lazy(() => import("./pages/Customers"));

// ================= PAGES KHUSUS MEMBER =================
const MemberDashboard = lazy(() => import("./pages/member/MemberDashboard"));
const MemberComplaints = lazy(() => import("./pages/member/MemberComplaints"));
const MemberBooking = lazy(() => import("./pages/member/MemberBooking"));
const MemberHistory = lazy(() => import("./pages/member/MemberHistory"));
const MemberProfile = lazy(() => import("./pages/member/MemberProfile"));

// ================= PAGES AUTH & LAINNYA =================
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));
const GuestLanding = lazy(() => import("./pages/GuestLanding")); 
const NotFound = lazy(() => import("./pages/NotFound")); // Komponen 404 yang tadi error

// 🔒 ROUTE GUARD: Memeriksa Session & Role Hak Akses Secara Ketat (Instruksi Dosen)
function ProtectedRoute({ children, allowedRoles }) {
  const sessionData = localStorage.getItem("user_session");
  
  if (!sessionData) {
    // Jika tidak ada session, paksa balik ke login
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(sessionData);
  const userRole = user?.role || "Member"; // Default read ke role member

  // Validasi peran jabatan yang diizinkan masuk ke rute tertentu
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    alert("⚠️ Hak Akses Ditolak! Akun Anda tidak memiliki otoritas membuka halaman ini.");
    // Lempar balik ke rute aman masing-masing role
    return userRole === "Member" ? <Navigate to="/member-dashboard" replace /> : <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* 1. GERBANG UTAMA LUAR: Halaman Publik Guest */}
        <Route path="/" element={<GuestLanding />} />

        {/* 2. GERBANG AUTH: Proses Masuk & Registrasi Akun */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />        
        </Route>

        {/* 3. GERBANG LAYOUT KHUSUS MEMBER: Hanya terbuka untuk role 'Member' */}
       <Route
  element={
    <ProtectedRoute allowedRoles={["Member"]}>
      <MemberLayout />
    </ProtectedRoute>
  }
>
  <Route path="/member-dashboard" element={<MemberDashboard />} />
  <Route path="/member-booking" element={<MemberBooking />} />
  <Route path="/member-history" element={<MemberHistory />} />
  <Route path="/member-complaints" element={<MemberComplaints />} />
  <Route path="/member-profile" element={<MemberProfile />} />
</Route>

        {/* 4. GERBANG INTERNAL BENGKEL: Hanya terbuka untuk Kasir, Mekanik, dan Owner */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["Kasir", "Mekanik", "Owner"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Jalur internal dashboard operasional bengkel */}
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
        </Route>

        {/* Sisa Rute Wildcard untuk 404 Halaman Tidak Ditemukan */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}