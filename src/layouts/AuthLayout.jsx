import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary font-outfit p-4">
      {/* Logo Utama Hitam (S3) */}
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-2">
           <div className="flex gap-1">
              {/* Tiga baris miring sesuai logo figma */}
              <div className="w-5 h-14 bg-neutralDark rounded-full rotate-[15deg]"></div>
              <div className="w-5 h-14 bg-neutralDark rounded-full rotate-[15deg]"></div>
              <div className="w-5 h-14 bg-neutralDark rounded-full rotate-[15deg]"></div>
           </div>
        </div>
        <h1 className="text-2xl font-black text-neutralDark tracking-tighter">BengkelGo</h1>
      </div>
      
      {/* Box Form Putih (S4) */}
      <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-xl p-12">
        <Outlet />
      </div>
    </div>
  );
}