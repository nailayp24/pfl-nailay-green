import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-outfit w-full">
      {/* Sidebar handles its own responsive behavior (hamburger on mobile) */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-8 pt-16 lg:pt-8 overflow-y-auto bg-[#F8F9FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
