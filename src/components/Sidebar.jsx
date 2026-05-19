import { NavLink } from "react-router-dom";
// PERBAIKAN: Tambahkan FaList di dalam daftar import kurung kurawal ini
import { FaThLarge, FaBox, FaWrench, FaUsers, FaUserFriends, FaSignOutAlt, FaList } from "react-icons/fa";

export default function Sidebar() {
  // Menggunakan skema warna aktif Lime Green figma kamu
  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3 transition-all text-sm font-semibold rounded-2xl ${
      isActive 
      ? "bg-[#DEE33E] text-black shadow-md shadow-[#DEE33E]/30" 
      : "text-gray-500 hover:text-black hover:bg-gray-50"
    }`;

  return (
    <aside className="w-[256px] bg-white h-screen flex flex-col py-8 border-r border-gray-100 sticky top-0 font-outfit">
      
      {/* Logo Section */}
      <div className="px-8 mb-12 flex flex-col items-start gap-1">
        <div className="flex gap-1 mb-1">
          <div className="w-3 h-8 bg-[#DEE33E] rounded-full rotate-12"></div>
          <div className="w-3 h-8 bg-[#DEE33E] rounded-full rotate-12"></div>
          <div className="w-3 h-8 bg-[#DEE33E] rounded-full rotate-12"></div>
        </div>
        <span className="text-xl font-black text-gray-800 tracking-tight">BengkelGo</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-2 px-4"> 
        <p className="px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Main Menu</p>
        
        <NavLink to="/" className={menuClass}>
          <FaThLarge className="text-lg" /> Dashboard
        </NavLink>
        
        <NavLink to="/inventory" className={menuClass}>
          <FaBox className="text-lg" /> Inventory
        </NavLink>
        
        <NavLink to="/services" className={menuClass}>
          <FaWrench className="text-lg" /> Services
        </NavLink>
        
        <NavLink to="/mechanics" className={menuClass}>
          <FaUsers className="text-lg" /> Mechanics
        </NavLink>

        <NavLink to="/customers" className={menuClass}>
          <FaUserFriends className="text-lg" /> Customers
        </NavLink>

        {/* Menu Playground Components */}
        <NavLink to="/components" className={menuClass}>
          <FaList className="text-lg" /> Components
        </NavLink>
      </nav>

      {/* Footer Sidebar */}
      <div className="px-4 mt-auto">
        <button className="flex items-center gap-4 px-6 py-3 text-gray-400 hover:text-red-500 transition-all text-sm font-medium w-full">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}