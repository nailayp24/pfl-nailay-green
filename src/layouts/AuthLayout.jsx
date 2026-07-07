import { Outlet, useLocation } from "react-router-dom";
import { FaCar, FaCalendarCheck, FaTools, FaShieldAlt, FaCheckCircle, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import workshopImage from "../assets/workshop.jpg";

export default function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isForgot = location.pathname === "/forgot";

  return (
    <div className="min-h-screen flex font-outfit bg-[#F8F9FA]">
      {/* Left Side - Hero/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative bg-white overflow-hidden">
        {/* Foto workshop asli + overlay putih tipis agar teks tetap terbaca */}
        <div className="absolute inset-0">
          <img
            src={workshopImage}
            alt=""
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/30" />
        </div>

        {/* Pattern Overlay - tekstur halus abu-abu di atas putih */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231F2937' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <FaCar className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#1F2937] tracking-tight">BengkelGo</h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Auto Service Center</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-red-600">
              <FaTools size={10} /> Bengkel Mobil Terpercaya
            </span>

            <h2 className="mt-6 text-4xl xl:text-5xl font-black text-[#1F2937] leading-tight">
              Solusi Terbaik
              <span className="text-red-600"> Perawatan Mobilmu.</span>
            </h2>

            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Layanan servis profesional dengan mekanik berpengalaman. Booking mudah, harga transparan, hasil berkualitas.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">
              {[
                { icon: <FaCalendarCheck />, text: "Booking online 24 jam", desc: "Pilih jadwal sesuai kebutuhanmu" },
                { icon: <FaTools />, text: "Mekanik bersertifikat", desc: "Teknisi profesional & berpengalaman" },
                { icon: <FaShieldAlt />, text: "Garansi servis", desc: "Jaminan kualitas pekerjaan & sparepart" },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:border-[#DEE33E] hover:shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1F2937] block">{feature.text}</span>
                    <span className="text-xs text-gray-500">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-500">
              <FaPhone size={12} className="text-red-600" />
              <span className="text-xs font-bold">0812-3456-7890</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <FaClock size={12} className="text-red-600" />
              <span className="text-xs font-bold">08:00 - 21:00</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <FaMapMarkerAlt size={12} className="text-red-600" />
              <span className="text-xs font-bold">Jakarta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 bg-white" style={{ textAlign: 'center' }}>
        {/* Mobile Logo (Only shown on mobile/tablet) */}
        <div className="lg:hidden mb-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20 mb-2">
            <FaCar className="text-white text-xl" />
          </div>
          <h1 className="text-lg font-black text-[#1F2937] tracking-tight">BengkelGo</h1>
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Auto Service Center</p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[400px]" style={{ margin: '0 auto' }}>
          {/* Page Title */}
          <div className="mb-6" style={{ textAlign: 'center' }}>
            <h2 className="text-2xl font-black text-[#1F2937]" style={{ textAlign: 'center' }}>
              {isLogin ? "Masuk ke Akun" : isRegister ? "Daftar Akun Baru" : isForgot ? "Reset Password" : "BengkelGo"}
            </h2>
            <p className="text-xs text-gray-500 mt-1" style={{ textAlign: 'center' }}>
              {isLogin
                ? "Selamat datang kembali! Masuk untuk melanjutkan."
                : isRegister
                ? "Buat akun untuk menikmati layanan bengkel."
                : isForgot
                ? "Masukkan email untuk reset password Anda."
                : "Kelola akun bengkel Anda"}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <Outlet />
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-gray-400">
              <span className="flex items-center gap-1"><FaCheckCircle className="text-red-600" /> Part Original</span>
              <span className="flex items-center gap-1"><FaCheckCircle className="text-red-600" /> Mekanik Profesional</span>
              <span className="flex items-center gap-1"><FaCheckCircle className="text-red-600" /> Garansi Resmi</span>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-3">
              © 2026 BengkelGo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}