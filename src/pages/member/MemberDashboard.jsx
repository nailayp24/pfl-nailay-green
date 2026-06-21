import { useState, useEffect } from "react";
import { FaCrown, FaCar, FaHistory } from "react-icons/fa";

export default function MemberDashboard() {
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("user_session"));
    setMemberData(session);
  }, []);

  const levelMembership = memberData?.levelMembership || "Regular Member";
  const unitMobil = memberData?.lastProduct || "Belum ada unit terdaftar";
  const totalTransaksi = memberData?.spent || "Rp 0";

  return (
    <div className="space-y-6 font-outfit text-gray-800">
      <div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Dashboard Member</h1>
        <p className="text-xs text-gray-400 mt-0.5">Selamat datang kembali, <span className="font-bold text-gray-700">{memberData?.full_name || memberData?.fullName || "Pelanggan Setia"}</span>!</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6 space-y-4">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <FaCrown className="text-[#DEE33E]" /> Status Keanggotaan Anda
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border">
          <div>
            <span className="inline-block px-3 py-1 bg-[#DEE33E] text-black font-black text-xs rounded-xl uppercase tracking-wider shadow-sm mb-2">{levelMembership}</span>
            <p className="text-xs text-gray-500 font-medium">ID Pelanggan: <span className="font-mono font-bold text-gray-700">{memberData?.id || "BG-000"}</span></p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Referral Code Anda</p>
            <p className="text-sm font-mono font-black text-gray-800 bg-white px-3 py-1 rounded-xl border border-gray-100 w-fit sm:ml-auto mt-1">BGO-MEMBER-VIP</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6 space-y-3">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2"><FaCar className="text-[#9FA324]" /> Unit Mobil Terdaftar</h4>
          <div className="p-4 bg-gray-50 rounded-2xl border flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-[#DEE33E] rounded-xl flex items-center justify-center text-lg"><FaCar /></div>
            <div>
              <p className="text-xs font-black text-gray-800">{unitMobil}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Status Unit: <span className="text-emerald-600 font-bold">Aman</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6 space-y-3">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2"><FaHistory className="text-[#9FA324]" /> Riwayat Pengeluaran</h4>
          <div className="p-4 bg-gray-50 rounded-2xl border flex justify-between items-center">
            <div>
              <p className="text-lg font-black text-gray-900">{totalTransaksi}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}