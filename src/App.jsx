import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// ================= LAYOUTS =================
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const MemberLayout = lazy(() => import("./layouts/MemberLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

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
const AdminBookingLog = lazy(() => import("./pages/AdminBookingLog"));
const AdminComplaintLog = lazy(() => import("./pages/AdminComplaintLog"));
const MemberDetail = lazy(() => import("./pages/MemberDetail"));
const AdminProfile = lazy(() => import("./pages/AdminProfile"));
const PromoManagement = lazy(() => import("./pages/PromoManagement"));

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
const NotFound = lazy(() => import("./pages/NotFound"));

// 🔒 ROUTE GUARD
function ProtectedRoute({ children, allowedRoles }) {
  const sessionData = localStorage.getItem("user_session");

  if (!sessionData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(sessionData);
  const userRole = user?.role || "Member";

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Silent redirect — no alert, just redirect to appropriate dashboard
    if (userRole === "Member") {
      return <Navigate to="/member-dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* 1. PUBLIC */}
        <Route path="/" element={<GuestLanding />} />

        {/* 2. AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 3. MEMBER ROUTES */}
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

        {/* 4. STAFF ROUTES — All staff roles share MainLayout, sidebar controls menu visibility */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["Owner", "Kasir", "Mekanik"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/members/:id" element={<MemberDetail />} />
          <Route path="/admin/bookings" element={<AdminBookingLog />} />
          <Route path="/admin/complaints" element={<AdminComplaintLog />} />
          <Route path="/admin/promos" element={<PromoManagement />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/service-simulation" element={<ServiceSimulation />} />
          <Route path="/components" element={<Components />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/coverage" element={<Coverage />} />
        </Route>

        {/* 5. 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
