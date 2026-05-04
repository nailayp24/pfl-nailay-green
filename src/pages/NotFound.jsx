import React from 'react';

// Pastikan namanya "NotFound" (sesuai file kamu) dan pakai export default
export default function NotFound({ 
  code = "404", 
  title = "Halaman Tidak Ditemukan", 
  description = "Meja ini belum disiapkan.", 
  image = "https://cdn-icons-png.flaticon.com/512/2748/2748558.png", 
  color = "#00B074" 
}) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full font-sans p-6">
      <div className="bg-white rounded-[40px] shadow-lg max-w-5xl w-full overflow-hidden flex flex-col md:flex-row items-stretch min-h-[480px]">
        <div style={{ backgroundColor: color }} className="w-full md:w-2/5 flex flex-col items-center justify-center p-12 text-white relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <img src={image} alt="Error" className="w-40 h-40 object-contain mb-4 z-10" />
          <h1 className="text-[80px] font-black leading-none z-10">{code}</h1>
        </div>
        <div className="w-full md:w-3/5 p-12 flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-2">
            <div style={{ backgroundColor: color }} className="h-1 w-12 rounded-full"></div>
            <span style={{ color: color }} className="font-bold tracking-widest uppercase text-xs">System Error</span>
          </div>
          <h2 className="text-4xl font-bold text-[#2D2D2D] mb-6 leading-tight">{title}</h2>
          <p className="text-[#A3A3A3] text-lg mb-10">{description}</p>
          <a href="/" style={{ backgroundColor: color }} className="inline-flex items-center text-white font-bold py-4 px-10 rounded-2xl shadow-lg w-fit">
            Kembali ke Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}