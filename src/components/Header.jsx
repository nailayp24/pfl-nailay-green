import { FaBell, FaEnvelope } from "react-icons/fa";
import SearchField from "./SearchField";
import Avatar from "./Avatar";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 font-outfit">
      <div>
        <h2 className="text-lg font-bold text-gray-800 leading-none">Hi, Naila</h2>
        <p className="text-xs text-gray-400 mt-1">Let's check your Garage today</p>
      </div>

      <div className="flex items-center gap-8">
        <SearchField placeholder="Search..." />

        <div className="flex items-center gap-4 text-gray-400">
          <FaEnvelope className="cursor-pointer hover:text-black" />
          <div className="relative">
            <FaBell className="cursor-pointer hover:text-black" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l pl-8">
          <div className="text-right">
            <p className="text-sm font-bold">Naila</p>
            <p className="text-[10px] text-gray-400">Owner</p>
          </div>
          <Avatar name="Naila" image="/img/naila.jpeg" />
        </div>
      </div>
    </header>
  );
}