import { useState, useEffect } from "react";
import { FaExclamationTriangle, FaPaperPlane } from "react-icons/fa";
import { customerAPI } from "../../services/userAPI";

export default function MemberComplaints() {
  const [memberData, setMemberData] = useState(null);
  const [complaintForm, setComplaintForm] = useState({ category: "Layanan Staff", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [complaintHistory, setComplaintHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(false);

  const fetchMemberComplaints = async (memberId) => {
    setIsHistoryLoading(true);
    setHistoryError(false);
    try {
      const complaints = await customerAPI.getMemberComplaints(memberId);
      setComplaintHistory(
        complaints.map((item) => ({
          id: item.id || "TK-000",
          category: item.kategori || "Umum",
          message: item.pesan || "-",
          status: item.status_resolusi || "pending",
          createdAt: item.created_at || "-",
        }))
      );
    } catch (error) {
      console.error("Gagal memuat riwayat komplain member:", error);
      setHistoryError(true);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("user_session"));
    setMemberData(session);
    const memberId = session?.id || session?.user_id || session?.uuid;
    if (memberId) {
      fetchMemberComplaints(memberId);
    }
  }, []);

  const handleSubitComplaint = async (e) => {
    e.preventDefault();
    if (!memberData) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    const complaintPayload = {
      user_id: memberData.id,
      kategori: complaintForm.category,
      pesan: complaintForm.message,
      status_resolusi: "pending",
    };

    try {
      await customerAPI.createComplaint(complaintPayload);
      setSubmitMessage(`✅ Komplain berhasil dikirim! Petugas akan menindaklanjuti segera.`);
      setComplaintForm({ category: "Layanan Staff", message: "" });
      const memberId = memberData?.id || memberData?.user_id || memberData?.uuid;
      if (memberId) {
        fetchMemberComplaints(memberId);
      }
    } catch (error) {
      console.error(error);
      setSubmitMessage("⚠️ Gagal mengirim komplain. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
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
          {submitMessage && (
            <div className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3">
              {submitMessage}
            </div>
          )}
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
          <button type="submit" disabled={isSubmitting} className="w-full h-11 bg-black text-white hover:bg-gray-800 font-black text-xs rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <FaPaperPlane size={10} /> {isSubmitting ? "Mengirim..." : "Kirim Aduan Resmi"}
          </button>
        </form>
      </div>

      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6">
        <h2 className="text-lg font-black text-gray-900">Riwayat Komplain Saya</h2>
        <p className="text-xs text-gray-500 mt-1">Lihat status tiket aduan yang pernah Anda kirim.</p>

        <div className="mt-6 space-y-3">
          {isHistoryLoading ? (
            <div className="py-10 text-center text-gray-500">Memuat riwayat komplain...</div>
          ) : historyError ? (
            <div className="py-10 text-center text-red-500">Gagal memuat riwayat komplain. Coba muat ulang halaman.</div>
          ) : complaintHistory.length === 0 ? (
            <div className="py-10 text-center text-gray-500">Belum ada komplain yang terdaftar.</div>
          ) : (
            complaintHistory.map((complaint) => (
              <div key={complaint.id} className="border border-gray-200 rounded-3xl p-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{complaint.category}</p>
                    <h3 className="font-bold text-gray-900 mt-1">{complaint.message}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${complaint.status === "Resolved" ? "bg-green-50 text-green-700" : complaint.status === "Pending" ? "bg-yellow-50 text-amber-600" : "bg-red-50 text-red-700"}`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 mt-3">Dikirim pada: {complaint.createdAt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
