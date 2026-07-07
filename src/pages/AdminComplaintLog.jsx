import { useEffect, useMemo, useState } from "react";
import { FaExclamationTriangle, FaClipboardList, FaSearch, FaFilter, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { customerAPI } from "../services/userAPI";

const COMPLAINT_STATUSES = ["pending", "in_progress", "resolved"];

export default function AdminComplaintLog() {
  // Get user role from session
  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const userRole = userSession?.role || "";
  const canDelete = userRole === "Owner"; // Only Owner can delete
  const canEdit = userRole === "Owner" || userRole === "Kasir"; // Owner & Kasir can edit

  const [complaintLogData, setComplaintLogData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [updatingComplaintId, setUpdatingComplaintId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Edit modal state
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const normalizeComplaint = (item, userMap) => ({
    id: item.id || "TK-000",
    nama: userMap?.[item.user_id] || "Pelanggan",
    email: "-",
    kategori: item.kategori || "Umum",
    isi: item.pesan || "-",
    tglLapor: item.created_at ? item.created_at.substring(0, 10) : "-",
    status: item.status_resolusi || "pending",
  });

  const fetchComplaints = async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const [apiComplaints, members] = await Promise.all([
        customerAPI.getAllComplaints(),
        customerAPI.getAllMembers().catch(() => []),
      ]);
      const userMap = {};
      (members || []).forEach((m) => { userMap[m.id] = m.fullName || m.email; });
      setComplaintLogData(apiComplaints.map((c) => normalizeComplaint(c, userMap)));
    } catch (error) {
      console.error("Gagal memuat data komplain:", error);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplaintStatusChange = async (complaintId, newStatus) => {
    setUpdatingComplaintId(complaintId);
    try {
      await customerAPI.updateComplaint(complaintId, { status_resolusi: newStatus });
      setComplaintLogData((current) =>
        current.map((item) =>
          item.id === complaintId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Gagal memperbarui status komplain:", error);
      alert("Gagal memperbarui status komplain. Silakan coba lagi.");
    } finally {
      setUpdatingComplaintId(null);
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (!window.confirm("Yakin ingin menghapus tiket komplain ini? Tindakan tidak dapat dibatalkan.")) return;
    setDeletingId(complaintId);
    try {
      await customerAPI.deleteComplaint(complaintId);
      setComplaintLogData((current) => current.filter((item) => item.id !== complaintId));
    } catch (error) {
      console.error("Gagal menghapus komplain:", error);
      alert("Gagal menghapus komplain. Silakan coba lagi.");
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (complaint) => {
    setEditModal(complaint);
    setEditForm({
      member_name: complaint.nama,
      complaint: complaint.isi === "-" ? "" : complaint.isi,
      status: complaint.status,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editModal) return;
    setIsEditing(true);
    try {
      const payload = {
        pesan: editForm.complaint,
        status_resolusi: editForm.status,
      };
      await customerAPI.updateComplaint(editModal.id, payload);
      setComplaintLogData((current) =>
        current.map((item) =>
          item.id === editModal.id
            ? { ...item, isi: payload.pesan || "-", status: payload.status_resolusi }
            : item
        )
      );
      setEditModal(null);
    } catch (error) {
      console.error("Gagal mengupdate komplain:", error);
      alert("Gagal menyimpan perubahan. Silakan coba lagi.");
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaintLog = useMemo(() => {
    return complaintLogData.filter((item) => {
      const matchesSearch = [item.id, item.nama, item.kategori, item.isi, item.tglLapor]
        .some((field) => String(field || "").toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [complaintLogData, searchTerm, statusFilter]);

  const statusBadge = (status) => {
    const map = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      in_progress: "bg-blue-50 text-blue-700 border-blue-200",
      resolved: "bg-green-50 text-green-700 border-green-200",
    };
    return map[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen font-outfit text-gray-800">
      <Container>
        <PageHeader title="Data Komplain Aduan" breadcrumb="Dashboard / Data Komplain" />

        <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-black text-gray-900">Log Komplain Pelanggan</h2>
              <p className="text-xs text-gray-500 mt-1">Monitor seluruh tiket aduan pelanggan. CRUD lengkap terhubung Supabase.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                <FaClipboardList /> Total tiket: {filteredComplaintLog.length}
              </div>
              <button
                type="button"
                onClick={fetchComplaints}
                className="text-[10px] px-3 py-2 rounded-2xl border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                Refresh Data
              </button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_200px] mb-6">
            <div className="relative">
              <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari ID, nama, kategori atau tanggal..."
                className="w-full border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm text-gray-700 focus:border-black focus:outline-none"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm text-gray-700 focus:border-black focus:outline-none appearance-none"
              >
                <option value="All">Semua Status</option>
                {COMPLAINT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3 min-w-[860px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400">
                  <th className="py-3 px-4 rounded-l-xl bg-gray-50">ID Tiket</th>
                  <th className="py-3 px-4 bg-gray-50">Nama Pelanggan</th>
                  <th className="py-3 px-4 bg-gray-50">Kategori</th>
                  <th className="py-3 px-4 bg-gray-50">Deskripsi Komplain</th>
                  <th className="py-3 px-4 bg-gray-50">Tanggal</th>
                  <th className="py-3 px-4 bg-gray-50">Status</th>
                  <th className="py-3 px-4 rounded-r-xl bg-gray-50 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">Memuat data komplain...</td>
                  </tr>
                ) : loadError ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-red-500">Tidak dapat memuat data komplain. Coba refresh halaman.</td>
                  </tr>
                ) : filteredComplaintLog.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">Tidak ditemukan data komplain sesuai filter.</td>
                  </tr>
                ) : (
                  filteredComplaintLog.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-all rounded-xl shadow-sm">
                      <td className="py-4 px-4 font-mono font-black text-gray-600 text-xs">{String(item.id).slice(0, 8)}</td>
                      <td className="py-4 px-4 font-bold text-gray-800">{item.nama}</td>
                      <td className="py-4 px-4 text-amber-700 font-bold">{item.kategori}</td>
                      <td className="py-4 px-4 text-gray-600 max-w-[280px] truncate">{item.isi}</td>
                      <td className="py-4 px-4 text-gray-500 text-xs">{item.tglLapor}</td>
                      <td className="py-4 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleComplaintStatusChange(item.id, e.target.value)}
                          disabled={updatingComplaintId === item.id}
                          className={`rounded-xl border py-2 px-3 text-xs font-bold ${statusBadge(item.status)}`}
                        >
                          {COMPLAINT_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {canEdit && (
                            <button
                              type="button"
                              onClick={() => openEditModal(item)}
                              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all border border-blue-100"
                              title="Edit Komplain"
                            >
                              <FaEdit size={12} />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDeleteComplaint(item.id)}
                              disabled={deletingId === item.id}
                              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all border border-red-100 disabled:opacity-50"
                              title="Hapus Komplain"
                            >
                              <FaTrash size={12} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      {/* MODAL EDIT KOMPLAIN */}
      {editModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setEditModal(null)} />
          <div className="relative bg-white border border-gray-100 rounded-[24px] shadow-2xl max-w-md w-full p-6">
            <button onClick={() => setEditModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black"><FaTimes /></button>
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-1">Edit Tiket Komplain</h2>
            <p className="text-xs text-gray-400 mb-5">Perubahan akan disimpan ke Supabase.</p>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Nama Pelanggan</label>
                <input type="text" required value={editForm.member_name} onChange={(e) => setEditForm({ ...editForm, member_name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Isi Komplain</label>
                <textarea rows="3" value={editForm.complaint} onChange={(e) => setEditForm({ ...editForm, complaint: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none resize-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Status</label>
                <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none">
                  {COMPLAINT_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <button type="button" onClick={() => setEditModal(null)} className="flex-1 px-4 py-2.5 text-xs text-gray-400 font-bold hover:text-gray-600">Batal</button>
                <button type="submit" disabled={isEditing} className="flex-1 bg-[#DEE33E] text-black font-bold py-2.5 text-xs rounded-xl hover:bg-[#c2c72f] disabled:opacity-50">
                  {isEditing ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
