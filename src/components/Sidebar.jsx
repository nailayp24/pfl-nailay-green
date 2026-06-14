import { NavLink, useNavigate } from "react-router-dom";
import { FaThLarge, FaBox, FaWrench, FaUsers, FaUserFriends, FaSignOutAlt, FaList, FaCogs, FaMapMarkedAlt } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  // 1. Ambil session data user yang sukses login dari Supabase via localStorage
  const userSession = JSON.parse(localStorage.getItem("user_session"));
  
  // 2. Ambil role jabatannya (jika tidak ada akun login, default dikosongkan "")
  const userRole = userSession?.role || "";
  const userName = userSession?.fullName || "User Bengkel";

  // Fungsi Logout untuk membersihkan session database Supabase
  const handleLogout = () => {
    localStorage.removeItem("user_session");
    alert("Anda telah keluar dari sistem operasional.");
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3 transition-all text-sm font-semibold rounded-2xl ${
      isActive 
      ? "bg-[#DEE33E] text-black shadow-md shadow-[#DEE33E]/30" 
      : "text-gray-500 hover:text-black hover:bg-gray-50"
    }`;

  return (
    <aside className="w-[256px] bg-white h-screen flex flex-col py-8 border-r border-gray-100 sticky top-0 font-outfit">
      
      {/* Logo */}
      <div className="px-8 mb-12 flex flex-col items-start gap-1">
        <div className="flex gap-1 mb-1">
          <div className="w-3 h-8 bg-[#DEE33E] rounded-full rotate-12"></div>
          <div className="w-3 h-8 bg-[#DEE33E] rounded-full rotate-12"></div>
          <div className="w-3 h-8 bg-[#DEE33E] rounded-full rotate-12"></div>
        </div>
        <span className="text-xl font-black text-gray-800 tracking-tight">BengkelGo</span>
      </div>

      {/* Menu Navigasi Berdasarkan Hak Akses Supabase */}
      <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto"> 
        <p className="px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Main Menu</p>
        
        {/* LEVEL ALL ACCESS: Semua role (Kasir, Mekanik, Owner) bisa lihat Dashboard & Peta */}
        <NavLink to="/" className={menuClass}>
          <FaThLarge className="text-lg" /> Dashboard
        </NavLink>
        
        {/* LEVEL KASIR & OWNER: Menu manajemen transaksi dan rekam data pelanggan */}
        {(userRole === "Kasir" || userRole === "Owner") && (
          <>
            <NavLink to="/services" className={menuClass}>
              <FaWrench className="text-lg" /> Services
            </NavLink>
            
            <NavLink to="/customers" className={menuClass}>
              <FaUserFriends className="text-lg" /> Customers
            </NavLink>
          </>
        )}
        
        {/* LEVEL MEKANIK & OWNER: Menu kontrol suku cadang gudang dan simulasi montir */}
        {(userRole === "Mekanik" || userRole === "Owner") && (
          <>
            <NavLink to="/inventory" className={menuClass}>
              <FaBox className="text-lg" /> Inventory
            </NavLink>

            <NavLink to="/service-simulation" className={menuClass}>
              <FaCogs className="text-lg" /> Simulation
            </NavLink>
          </>
        )}

        {/* LEVEL ALL ACCESS: Peta Spasial Jangkauan Derek */}
        <NavLink to="/coverage" className={menuClass}>
          <FaMapMarkedAlt className="text-lg" /> Coverage Map
        </NavLink>

        {/* AREA PENGUJIAN: Playground modul kodingan */}
        <NavLink to="/components" className={menuClass}>
          <FaList className="text-lg" /> Components
        </NavLink>

        {/* LEVEL EKSKLUSIF OWNER: Analisis tim montir hanya terbuka untuk Owner Naila */}
        {userRole === "Owner" && (
          <div className="pt-2 mt-2 border-t border-gray-50">
            <NavLink to="/mechanics" className={menuClass}>
              <FaUsers className="text-lg text-amber-500" /> 🔒 Mechanics Team
            </NavLink>
          </div>
        )}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="px-4 mt-auto space-y-4">
        {/* Bar info identitas user yang sedang aktif dari database */}
        <div className="flex items-center gap-3 px-6 py-2 border-t border-gray-50 pt-4">
          <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center font-black text-xs text-gray-700 uppercase">
            {userName.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-black text-gray-800 leading-none truncate max-w-[140px]">{userName}</p>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mt-1">
              Role: <span className="text-emerald-600 font-mono font-bold">{userRole || "Guest"}</span>
            </span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-3 text-gray-400 hover:text-red-500 transition-all text-sm font-medium w-full"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}