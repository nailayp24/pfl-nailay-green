import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // Menggunakan latar belakang transparan/terang agar menyatu dengan dashboard putih kamu
    <footer className="bg-transparent text-gray-600 py-10 mt-12 border-t border-gray-100 font-outfit">
      <div className="container mx-auto px-6 text-center">
        
        {/* Identitas BengkelGo */}
        {/* PERBAIKAN: Mengubah warna kata "Bengkel" menjadi hitam pekat (text-gray-900 / text-black) */}
        <h2 className="text-2xl font-black mb-1 tracking-tight text-gray-900">
          Bengkel<span className="text-[#DEE33E]">Go</span>
        </h2>
        
        <p className="text-gray-400 text-[10px] mb-6 uppercase tracking-widest font-bold">
          Workshop CRM & Fleet Management System
        </p>
        
        {/* Links Navigasi */}
        <div className="flex justify-center gap-6 mb-6 text-xs font-semibold text-gray-400">
          <Link to="/" className="hover:text-[#DEE33E] transition-colors">Dashboard</Link>
          <Link to="/inventory" className="hover:text-[#DEE33E] transition-colors">Inventory</Link>
          <Link to="/services" className="hover:text-[#DEE33E] transition-colors">Services</Link>
          <Link to="/components" className="hover:text-[#DEE33E] transition-colors">Components</Link>
        </div>
        
        <hr className="border-gray-100 my-4 max-w-xs mx-auto" />
        
        <p className="text-gray-400 text-[10px] tracking-wider">
          © 2026 <span className="font-bold text-gray-500">BengkelGo Team</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}