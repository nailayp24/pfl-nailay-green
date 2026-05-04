import { useState, useEffect } from "react";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";

export default function Header() {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    return (
        <header className="h-24 flex items-center justify-between px-8 bg-transparent">
            {/* Search Bar */}
            <div className="relative group w-96">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search service ID or customer..." 
                    className="w-full bg-[#1A1C2E] border border-white/5 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-white"
                />
            </div>

            {/* Profile & Notifications */}
            <div className="flex items-center gap-6">
                <div className="relative text-gray-400 hover:text-white cursor-pointer transition-colors">
                    <FaBell size={20} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-[#0F1116]">3</span>
                </div>

                <div className="flex items-center gap-4 bg-[#1A1C2E] py-1.5 pl-1.5 pr-4 rounded-full border border-white/5 cursor-pointer hover:bg-[#25283D] transition-all">
                    <img 
                        src="/img/naila.jpeg" 
                        alt="Naila Yohanda Putri" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                    />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white leading-none">Naila Yohanda Putri</span>
                        <span className="text-[10px] text-gray-500 mt-1">{greeting}</span>
                    </div>
                    <FaChevronDown size={10} className="ml-2 text-gray-500" />
                </div>
            </div>
        </header>
    );
}