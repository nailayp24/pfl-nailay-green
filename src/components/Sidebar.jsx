import { FaThLarge, FaWrench, FaUsers, FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa"; 
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  // Fungsi Logout agar bisa diklik
  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar dari BengkelGo?");
    if (confirmLogout) {
      navigate("/login");
    }
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all mb-2 z-50 ${
      isActive 
      ? "bg-[#FF8A00] text-white shadow-lg shadow-orange-900/20" 
      : "text-[#A0AEC0] hover:bg-[#1A1C2E] hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-[#1A1C2E] m-4 rounded-[30px] flex flex-col p-6 border border-white/5 relative z-30">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 bg-[#FF8A00] rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/20">G</div>
        <span className="text-xl font-bold tracking-tight text-white">Bengkel<b className="text-[#FF8A00]">Go.</b></span>
      </div>

      <nav className="flex-1">
        <NavLink to="/" className={menuClass}>
          <FaThLarge /> <span className="font-medium">Dashboard</span>
        </NavLink>
        
        <NavLink to="/active-services" className={menuClass}>
          <FaWrench /> <span className="font-medium">Active Services</span>
        </NavLink>

        <NavLink to="/mechanics" className={menuClass}>
          <FaUsers /> <span className="font-medium">Mechanics</span>
        </NavLink>

        <NavLink to="/coverage" className={menuClass}>
          <FaMapMarkedAlt /> <span className="font-medium">Sistem Area</span>
        </NavLink>
      </nav>

      {/* Bagian Logout yang sudah diperbaiki kliknya */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-[#FF8A00] font-bold px-4 py-3 hover:bg-orange-500/10 w-full rounded-xl transition-all cursor-pointer relative z-50"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}