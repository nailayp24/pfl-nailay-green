import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaBox,
  FaCogs,
  FaUsers,
  FaUserFriends,
  FaBars,
  FaTimes,
  FaList,
  FaMapMarkedAlt,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaUser,
  FaSignOutAlt,
  FaWrench,
  FaChevronDown,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const userRole = userSession?.role || "";
  const userName = userSession?.fullName || "User Bengkel";
  const userTier = userSession?.tier || "Bronze";

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [window.location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 transition-all text-[13px] font-semibold rounded-xl mx-2 ${
      isActive
        ? "bg-gray-900 text-white shadow-sm"
        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
    }`;

  const sectionLabel = "px-6 pt-5 pb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest";

  // ================= MENU CONFIG BY ROLE =================
  const ownerMenu = [
    { label: "Dashboard", to: "/dashboard", icon: FaThLarge },
    { divider: "Kelola Data" },
    { label: "Kelola Member", to: "/customers", icon: FaUserFriends },
    { label: "Kelola Booking", to: "/admin/bookings", icon: FaCalendarCheck },
    { label: "Kelola Aduan", to: "/admin/complaints", icon: FaExclamationTriangle },
    { label: "Service Orders", to: "/services", icon: FaWrench },
    { divider: "Gudang & Teknis" },
    { label: "Inventory", to: "/inventory", icon: FaBox },
    { label: "Simulasi Servis", to: "/service-simulation", icon: FaCogs },
    { label: "Komponen Mesin", to: "/components", icon: FaList },
    { divider: "Lainnya" },
    { label: "Kelola Mekanik", to: "/mechanics", icon: FaUsers },
    { label: "Cakupan Area", to: "/coverage", icon: FaMapMarkedAlt },
  ];

  const kasirMenu = [
    { label: "Dashboard", to: "/dashboard", icon: FaThLarge },
    { divider: "Kelola Data" },
    { label: "Kelola Member", to: "/customers", icon: FaUserFriends },
    { label: "Kelola Booking", to: "/admin/bookings", icon: FaCalendarCheck },
    { label: "Kelola Aduan", to: "/admin/complaints", icon: FaExclamationTriangle },
    { label: "Service Orders", to: "/services", icon: FaWrench },
    { divider: "Lainnya" },
    { label: "Cakupan Area", to: "/coverage", icon: FaMapMarkedAlt },
  ];

  const mekanikMenu = [
    { label: "Dashboard", to: "/dashboard", icon: FaThLarge },
    { divider: "Workshop" },
    { label: "Kelola Booking", to: "/admin/bookings", icon: FaCalendarCheck },
    { divider: "Gudang & Teknis" },
    { label: "Inventory", to: "/inventory", icon: FaBox },
    { label: "Simulasi Servis", to: "/service-simulation", icon: FaCogs },
    { label: "Komponen Mesin", to: "/components", icon: FaList },
    { divider: "Lainnya" },
    { label: "Cakupan Area", to: "/coverage", icon: FaMapMarkedAlt },
  ];

  const menuByRole = {
    Owner: ownerMenu,
    Kasir: kasirMenu,
    Mekanik: mekanikMenu,
  };

  const currentMenu = menuByRole[userRole] || [];

  // Profile path by role
  const profilePath = userRole === "Member" ? "/member-profile" : "/admin/profile";

  // ================= SIDEBAR CONTENT =================
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
          <FaWrench className="text-white text-sm" />
        </div>
        <div>
          <span className="text-base font-black text-gray-900 tracking-tight block leading-none">
            BengkelGo
          </span>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mt-0.5">
            {userRole || "Guest"}
          </span>
        </div>
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
        >
          <FaTimes size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto pb-4">
        {currentMenu.map((item, idx) => {
          if (item.divider) {
            return (
              <p key={idx} className={sectionLabel}>
                {item.divider}
              </p>
            );
          }
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={menuClass}
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="text-sm flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Profile Dropdown at Bottom */}
      <div className="border-t border-gray-100 px-3 py-3 relative" ref={profileRef}>
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-black text-white uppercase">
              {userName.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-bold text-gray-900 truncate">{userName}</p>
            {userRole !== "Member" && (
              <span className="text-[9px] font-bold text-gray-400 uppercase">{userTier}</span>
            )}
          </div>
          <FaChevronDown
            size={10}
            className={`text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {profileOpen && (
          <div className="absolute left-3 right-3 bottom-full mb-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
            <NavLink
              to={profilePath}
              onClick={() => {
                setProfileOpen(false);
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              <FaUser className="text-xs" />
              Lihat Profil
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-all w-full text-left border-t border-gray-50"
            >
              <FaSignOutAlt className="text-xs" />
              Keluar
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm text-gray-700 hover:bg-gray-50"
      >
        <FaBars size={16} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar (slide-in) */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-[260px] bg-white z-50 border-r border-gray-100 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar (always visible) */}
      <aside className="hidden lg:block w-[240px] flex-shrink-0 bg-white h-screen sticky top-0 border-r border-gray-100">
        {sidebarContent}
      </aside>
    </>
  );
}
