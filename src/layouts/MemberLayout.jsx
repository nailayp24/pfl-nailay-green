import { Outlet, useNavigate, NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaList,
  FaSignOutAlt,
  FaCar,
  FaCrown,
  FaCalendarCheck,
  FaHistory,
  FaUser,
} from "react-icons/fa";

export default function MemberLayout() {
  const navigate = useNavigate();

  const userSession = JSON.parse(localStorage.getItem("user_session"));

  const userName =
    userSession?.full_name ||
    userSession?.fullName ||
    "Member BengkelGo";

  const membershipTier =
    userSession?.levelMembership || "Regular Member";

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    alert("Sesi member dibersihkan. Kembali ke halaman utama.");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-xl ${
      isActive
        ? "bg-black text-[#DEE33E] shadow-md"
        : "text-gray-500 hover:text-black hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] font-outfit w-full">

      {/* ==================== NAVBAR MEMBER ==================== */}
      <nav className="bg-white border-b border-gray-100 py-3 px-6 md:px-10 flex justify-between items-center shadow-sm sticky top-0 z-50">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
            <FaCar className="text-[#DEE33E] text-lg" />
          </div>

          <div>
            <span className="text-base font-black tracking-tight block leading-none">
              BENGKELGO
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-1">
              Portal Member
            </span>
          </div>
        </div>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-3">

          <NavLink
            to="/member-dashboard"
            className={navLinkClass}
          >
            <FaThLarge />
            Dashboard
          </NavLink>

          <NavLink
            to="/member-booking"
            className={navLinkClass}
          >
            <FaCalendarCheck />
            Booking
          </NavLink>

          <NavLink
            to="/member-history"
            className={navLinkClass}
          >
            <FaHistory />
            Riwayat
          </NavLink>

          <NavLink
            to="/member-complaints"
            className={navLinkClass}
          >
            <FaList />
            Aduan
          </NavLink>

          <NavLink
            to="/member-profile"
            className={navLinkClass}
          >
            <FaUser />
            Profil
          </NavLink>

        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-4">

          <div className="hidden sm:flex items-center gap-1.5 bg-[#DEE33E]/10 border border-[#DEE33E]/30 px-3 py-1.5 rounded-lg">
            <FaCrown className="text-[#9FA324] text-[10px]" />
            <span className="text-[10px] font-black text-[#9FA324] uppercase tracking-wider">
              {membershipTier}
            </span>
          </div>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-4">

            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-gray-800 leading-none">
                {userName}
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center font-black text-xs text-white uppercase shadow-sm">
              {userName.charAt(0)}
            </div>

            <button
              onClick={handleLogout}
              className="ml-2 w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
              title="Keluar"
            >
              <FaSignOutAlt />
            </button>

          </div>

        </div>

      </nav>

      {/* KONTEN */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10">
        <Outlet />
      </main>

    </div>
  );
}