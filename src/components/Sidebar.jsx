import { NavLink } from "react-router-dom";
import { FaThLarge, FaBox, FaWrench, FaUsers, FaUserFriends, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3 transition-all text-sm font-medium ${
      isActive 
      ? "bg-[#FF8A00] text-white rounded-2xl shadow-lg shadow-orange-500/20" 
      : "text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-2xl"
    }`;

  return (
    <aside className="w-[256px] bg-[#1A1C23] h-screen flex flex-col py-8 border-r border-gray-800 sticky top-0">
      {/* Logo Section */}
      <div className="px-8 mb-12 flex flex-col items-start gap-1">
        <div className="flex gap-1 mb-1">
          <div className="w-3 h-8 bg-[#FF8A00] rounded-full rotate-12"></div>
          <div className="w-3 h-8 bg-[#FF8A00] rounded-full rotate-12"></div>
          <div className="w-3 h-8 bg-[#FF8A00] rounded-full rotate-12"></div>
        </div>
        <span className="text-xl font-black text-white tracking-tight">BengkelGo</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-4 px-4"> 
        <p className="px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Main Menu</p>
        
        <NavLink to="/" className={menuClass}>
          <FaThLarge className="text-lg" /> Dashboard
        </NavLink>
        
        <NavLink to="/inventory" className={menuClass}>
          <FaBox className="text-lg" /> Inventory
        </NavLink>
        
        {/* Diubah menjadi /services agar cocok dengan route list & detail */}
        <NavLink to="/services" className={menuClass}>
          <FaWrench className="text-lg" /> Services
        </NavLink>
        
        <NavLink to="/mechanics" className={menuClass}>
          <FaUsers className="text-lg" /> Mechanics
        </NavLink>

        <NavLink to="/customers" className={menuClass}>
          <FaUserFriends className="text-lg" /> Customers
        </NavLink>
      </nav>

      {/* Footer Sidebar (Optional) */}
      <div className="px-4 mt-auto">
        <button className="flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-red-400 transition-all text-sm font-medium w-full">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}