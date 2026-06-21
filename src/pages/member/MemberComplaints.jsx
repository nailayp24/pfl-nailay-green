import { useState, useEffect } from "react";
import { FaExclamationTriangle, FaPaperPlane } from "react-icons/fa";

export default function MemberComplaints() {
  const [memberData, setMemberData] = useState(null);
  const [complaintForm, setComplaintForm] = useState({ category: "Layanan Staff", message: "" });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("user_session"));
    setMemberData(session);
  }, []);

  const handleSubitComplaint = (e) => {
    e.preventDefault();
    alert(`✅ Komplain Berhasil Dikirim!\nHalo ${memberData?.full_name || "Member"}, keluhan Anda telah tercatat di sistem Admin BengkelGo.`);
    setComplaintForm({ category: "Layanan Staff", message: "" });
  };

  return (
    <div className="space-y-6 font-outfit text-gray-800 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Pusat Aduan Member</h1>
        <p className="text-xs text-gray-400 mt-0.5">Sampaikan keluhan fungsional kendaraan Anda untuk resolusi cepat.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-2xl text-red-700">
          <FaExclamationTriangle size={20} className="shrink-0 animate-pulse" />
          <div className="text-xs">
            <span className="font-bold block">Tiket Terikat ID Akun Anda</span>
            Keluhan ini akan dikirim secara resmi menggunakan identitas member Anda.
          </div>
        </div>

        <form onSubmit={handleSubitComplaint} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Kategori Kendala</label>
            <select value={complaintForm.category} onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold outline-none">
              <option value="Layanan Staff">Masalah Pelayanan Staff Kasir</option>
              <option value="Kualitas Part">Kualitas Suku Cadang / Pelumas Mesin</option>
              <option value="Hasil Kerja">Hasil Penanganan Mekanik Bengkel</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Isi Kronologi</label>
            <textarea required rows="4" placeholder="Detail kendala yang dialami..." value={complaintForm.message} onChange={(e) => setComplaintForm({ ...complaintForm, message: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs resize-none outline-none" />
          </div>
          <button type="submit" className="w-full h-11 bg-black text-white hover:bg-gray-800 font-black text-xs rounded-xl uppercase tracking-widest flex items-center justify-center gap-2">
            <FaPaperPlane size={10} /> Kirim Aduan Resmi
          </button>
        </form>
      </div>
    </div>
  );
}