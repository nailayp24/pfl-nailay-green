import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#11131F] p-6">
      {/* Container Utama - Two Column */}
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row min-h-[550px]">
        
        {/* Kolom Kiri: Area Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8 flex items-center gap-2">
             <div className="w-8 h-8 bg-[#FF8A00] rounded-lg flex items-center justify-center text-white font-black">G</div>
             <span className="text-xl font-bold text-gray-800">Bengkel<b className="text-[#FF8A00]">Go.</b></span>
          </div>
          
          <Outlet />
        </div>

        {/* Kolom Kanan: Panel Dekoratif (Sesuai Gambar) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#FF8A00] to-[#FFB800] relative items-end p-12 overflow-hidden">
          {/* Elemen Lingkaran Dekoratif */}
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full"></div>
          <div className="absolute top-[20%] left-[-20%] w-60 h-60 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/20 rounded-full"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-white leading-tight">
              Hey <br /> Welcome <br /> Back
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}