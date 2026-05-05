import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 font-outfit">
      <div>
        <h2 className="text-lg font-bold text-neutralDark leading-none">Hi, Naila</h2>
        <p className="text-xs text-gray-400 mt-1">Let's check your Garage today</p>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative group w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-greyscale50 border-none rounded-full py-2 pl-12 pr-10 text-sm focus:ring-1 focus:ring-primary"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 border px-1 rounded">⌘ K</span>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <FaEnvelope className="cursor-pointer hover:text-primary" />
          <div className="relative">
            <FaBell className="cursor-pointer hover:text-primary" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l pl-8">
          <div className="text-right">
            <p className="text-sm font-bold">Naila</p>
            <p className="text-[10px] text-gray-400">Owner</p>
          </div>
          <img src="/img/naila.jpeg" className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="Profile" />
        </div>
      </div>
    </header>
  );
}