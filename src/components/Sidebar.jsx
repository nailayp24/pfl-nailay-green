import { NavLink } from "react-router-dom";
import { FaThLarge, FaBox, FaWrench, FaUsers } from "react-icons/fa";

<div className="px-8 mb-12 flex flex-col items-start gap-1">
  <div className="flex gap-1 mb-1">
    {/* Tiga bar miring warna Lime Volt */}
    <div className="w-3 h-8 bg-primary rounded-full rotate-12"></div>
    <div className="w-3 h-8 bg-primary rounded-full rotate-12"></div>
    <div className="w-3 h-8 bg-primary rounded-full rotate-12"></div>
  </div>
  <span className="text-lg font-black text-neutralDark tracking-tight">BengkelGo</span>
</div>

export default function Sidebar() {
 const menuClass = ({ isActive }) =>
  `flex items-center gap-4 px-6 py-3 transition-all text-sm font-medium ${
    isActive 
    ? "bg-primary text-neutralDark rounded-component shadow-sm" 
    : "text-gray-400 hover:text-neutralDark"
  }`;

  return (
    <aside className="w-[256px] bg-white h-screen flex flex-col py-8 border-r border-gray-100">
      <div className="px-8 mb-12 flex flex-col items-start gap-1">
        <div className="flex gap-1 mb-1">
          <div className="w-3 h-8 bg-primary rounded-full rotate-12"></div>
          <div className="w-3 h-8 bg-primary rounded-full rotate-12"></div>
          <div className="w-3 h-8 bg-primary rounded-full rotate-12"></div>
        </div>
        <span className="text-lg font-black text-neutralDark">BengkelGo</span>
      </div>

      <nav className="flex-1 flex flex-col gap-[40px] px-4"> {/* Gap 40px */}
        <NavLink to="/" className={menuClass}><FaThLarge /> Dashboard</NavLink>
        <NavLink to="/inventory" className={menuClass}><FaBox /> Inventory</NavLink>
        <NavLink to="/active-services" className={menuClass}><FaWrench /> Services</NavLink>
        <NavLink to="/mechanics" className={menuClass}><FaUsers /> Mechanics</NavLink>
      </nav>
    </aside>
  );
}