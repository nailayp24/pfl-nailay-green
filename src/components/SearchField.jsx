import { FaSearch } from "react-icons/fa";

export default function SearchField({ placeholder = "Search..." }) {
  return (
    <div className="relative group w-80 font-outfit">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-12 pr-16 text-sm focus:outline-none focus:ring-1 focus:ring-[#DEE33E] transition-all"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 border bg-white px-1.5 py-0.5 rounded shadow-sm font-mono">⌘ K</span>
    </div>
  );
}