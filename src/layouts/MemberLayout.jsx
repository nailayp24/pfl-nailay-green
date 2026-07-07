import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaList,
  FaSignOutAlt,
  FaCar,
  FaCalendarCheck,
  FaHistory,
  FaUser,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function MemberLayout() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const userName = userSession?.fullName || "Member BengkelGo";
  const membershipTier = userSession?.tier || "Bronze";

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    navigate("/");
  };

  const memberLinks = [
    { to: "/member-dashboard", label: "Dashboard", icon: FaThLarge },
    { to: "/member-booking", label: "Booking", icon: FaCalendarCheck },
    { to: "/member-history", label: "Riwayat", icon: FaHistory },
    { to: "/member-complaints", label: "Aduan", icon: FaList },
    { to: "/member-profile", label: "Profil", icon: FaUser },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all rounded-lg ${
      isActive
        ? "bg-gray-900 text-white"
        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
    }`;

  const bottomLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 py-2 text-[10px] font-bold transition-all ${
      isActive ? "text-gray-900" : "text-gray-400"
    }`;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] font-outfit">
      {/* ===== TOP NAVBAR (Desktop) ===== */}
      <nav className="bg-white border-b border-gray-100 py-3 px-4 md:px-8 flex justify-between items-center sticky top-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <FaCar className="text-white text-sm" />
          </div>
          <span className="text-sm font-black tracking-tight hidden sm:block">
            BengkelGo
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {memberLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              <link.icon size={12} />
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
        >
          {mobileMenuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
        </button>

        {/* Profile Dropdown (Desktop) */}
        <div className="hidden md:flex items-center gap-3 relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50"
          >
            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-[10px] font-black text-white">{userName.charAt(0)}</span>
            </div>
            <span className="text-xs font-bold text-gray-800 max-w-[100px] truncate">{userName}</span>
            <FaChevronDown size={8} className={`text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-2.5 border-b border-gray-50">
                <p className="text-xs font-bold text-gray-800">{userName}</p>
                <span className="text-[9px] font-bold text-gray-400 uppercase">{membershipTier}</span>
              </div>
              <NavLink
                to="/member-profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                <FaUser size={10} /> Lihat Profil
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 w-full text-left border-t border-gray-50"
              >
                <FaSignOutAlt size={10} /> Keluar
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex flex-wrap gap-2">
          {memberLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <link.icon size={12} />
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg ml-auto"
          >
            <FaSignOutAlt size={12} /> Keluar
          </button>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        <Outlet />
      </main>

      {/* ===== BOTTOM NAV (Mobile) ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around px-2 py-1 z-40">
        {memberLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={bottomLinkClass}>
            <link.icon size={16} />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
