import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    // PERBAIKAN: bg-primary diganti warna Lime sesuai palet figma
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#DEE33E] font-outfit p-4">
      {/* Logo Utama Hitam */}
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-2">
           <div className="flex gap-1.5">
              {/* Tiga baris miring warna hitam pekat */}
              <div className="w-4 h-12 bg-black rounded-full rotate-[15deg]"></div>
              <div className="w-4 h-12 bg-black rounded-full rotate-[15deg]"></div>
              <div className="w-4 h-12 bg-black rounded-full rotate-[15deg]"></div>
           </div>
        </div>
        <h1 className="text-xl font-black text-black tracking-tight uppercase">Lorem Ipsum</h1>
      </div>
      
      {/* Box Form Putih Bersih */}
      <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-sm p-10">
        <Outlet />
      </div>
    </div>
  );
}