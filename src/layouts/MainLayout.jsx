import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-outfit w-full overflow-hidden">
      {/* Membungkus Sidebar agar ukurannya solid dan tidak mengecil/hilang saat error */}
      <div className="w-[256px] flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Area konten utama sebelah kanan */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto bg-[#F8F9FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}