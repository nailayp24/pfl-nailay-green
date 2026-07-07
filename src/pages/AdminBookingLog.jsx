import { useEffect, useMemo, useState } from "react";
import { FaCalendarCheck, FaClipboardList, FaSearch, FaFilter, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { customerAPI } from "../services/userAPI";

const BOOKING_STATUSES = ["booked", "pending", "in_progress", "completed", "cancelled"];

export default function AdminBookingLog() {
  // Get user role from session
  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const userRole = userSession?.role || "";
  const canDelete = userRole === "Owner"; // Only Owner can delete
  const canEdit = userRole === "Owner" || userRole === "Kasir"; // Owner & Kasir can edit

  const [bookingLogData, setBookingLogData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [updatingBookingId, setUpdatingBookingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Edit modal state
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const normalizeBooking = (item, userMap) => ({
    id: item.id || "BK-000",
    nama: userMap?.[item.user_id] || "Pelanggan",
    email: "-",
    mobil: item.kendaraan || "-",
    tglJadwal: item.tanggal_booking || "-",
    paket: item.jenis_servis || "-",
    keluhan: item.keluhan || "-",
    status: item.status || "booked",
    harga: parseFloat(item.total_harga) || 0,
    diskon: parseFloat(item.diskon_applied) || 0,
    totalHarga: parseFloat(item.total_harga) || 0,
  });

  const fetchBookings = async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const [apiBookings, members] = await Promise.all([
        customerAPI.getAllBookings(),
        customerAPI.getAllMembers().catch(() => []),
      ]);
      const userMap = {};
      (members || []).forEach((m) => { userMap[m.id] = m.fullName || m.email; });
      setBookingLogData(apiBookings.map((b) => normalizeBooking(b, userMap)));
    } catch (error) {
      console.error("Gagal memuat data booking:", error);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingStatusChange = async (bookingId, newStatus) => {
    setUpdatingBookingId(bookingId);
    try {
      await customerAPI.updateBooking(bookingId, { status: newStatus });
      setBookingLogData((current) =>
        current.map((item) =>
          item.id === bookingId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Gagal memperbarui status booking:", error);
      alert("Gagal memperbarui status booking. Silakan coba lagi.");
    } finally {
      setUpdatingBookingId(null);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Yakin ingin menghapus data booking ini? Tindakan ini tidak dapat dibatalkan.")) return;
    setDeletingId(bookingId);
    try {
      await customerAPI.deleteBooking(bookingId);
      setBookingLogData((current) => current.filter((item) => item.id !== bookingId));
    } catch (error) {
      console.error("Gagal menghapus booking:", error);
      alert("Gagal menghapus booking. Silakan coba lagi.");
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (booking) => {
    setEditModal(booking);
    setEditForm({
      member_name: booking.nama,
      vehicle: booking.mobil,
      service: booking.paket,
      date: booking.tglJadwal ? booking.tglJadwal.substring(0, 10) : "",
      complaint: booking.keluhan === "-" ? "" : booking.keluhan,
      status: booking.status,
      price: booking.harga,
      discount_rate: booking.diskon,
      total_price: booking.totalHarga,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editModal) return;
    setIsEditing(true);
    try {
      const payload = {
        kendaraan: editForm.vehicle,
        jenis_servis: editForm.service,
        tanggal_booking: editForm.date,
        keluhan: editForm.complaint,
        status: editForm.status,
        total_harga: parseInt(editForm.price, 10) || 0,
        diskon_applied: parseInt(editForm.discount_rate, 10) || 0,
      };
      await customerAPI.updateBooking(editModal.id, payload);
      setBookingLogData((current) =>
        current.map((item) =>
          item.id === editModal.id
            ? {
                ...item,
                mobil: editForm.vehicle,
                paket: editForm.service,
                tglJadwal: editForm.date,
                keluhan: editForm.complaint || "-",
                status: editForm.status,
                harga: parseInt(editForm.price, 10) || 0,
                diskon: parseInt(editForm.discount_rate, 10) || 0,
                totalHarga: parseInt(editForm.total_price, 10) || 0,
              }
            : item
        )
      );
      setEditModal(null);
    } catch (error) {
      console.error("Gagal mengupdate booking:", error);
      alert("Gagal menyimpan perubahan. Silakan coba lagi.");
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookingLog = useMemo(() => {
    return bookingLogData.filter((item) => {
      const matchesSearch = [item.id, item.nama, item.mobil, item.paket, item.tglJadwal]
        .some((field) => String(field || "").toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookingLogData, searchTerm, statusFilter]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

  const statusBadge = (status) => {
    const map = {
      booked: "bg-blue-50 text-blue-700 border-blue-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      in_progress: "bg-purple-50 text-purple-700 border-purple-200",
      completed: "bg-green-50 text-green-700 border-green-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };
    return map[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen font-outfit text-gray-800">
      <Container>
        <PageHeader title="Data Pesanan Booking" breadcrumb="Dashboard / Data Pesanan" />

        <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-black text-gray-900">Log Booking Antrean</h2>
              <p className="text-xs text-gray-500 mt-1">Kelola semua pemesanan servis pelanggan. CRUD terhubung Supabase.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                <FaClipboardList /> Total entri: {filteredBookingLog.length}
              </div>
              <button
                type="button"
                onClick={fetchBookings}
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
                placeholder="Cari ID, nama, kendaraan, layanan..."
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
                {BOOKING_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
      
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3 min-w-[900px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400">
                  <th className="py-3 px-4 rounded-l-xl bg-gray-50">ID Booking</th>
                  <th className="py-3 px-4 bg-gray-50">Nama Pelanggan</th>
                  <th className="py-3 px-4 bg-gray-50">Kendaraan</th>
                  <th className="py-3 px-4 bg-gray-50">Jadwal</th>
                  <th className="py-3 px-4 bg-gray-50">Layanan</th>
                  <th className="py-3 px-4 bg-gray-50">Total Harga</th>
                  <th className="py-3 px-4 bg-gray-50">Status</th>
                  <th className="py-3 px-4 rounded-r-xl bg-gray-50 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500">Memuat data booking...</td>
                  </tr>
                ) : loadError ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-red-500">Tidak dapat memuat data booking. Coba refresh halaman.</td>
                  </tr>
                ) : filteredBookingLog.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500">Tidak ditemukan data booking sesuai filter.</td>
                  </tr>
                ) : (
                  filteredBookingLog.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-all rounded-xl shadow-sm">
                      <td className="py-4 px-4 font-mono font-black text-amber-700 text-xs">{String(item.id).slice(0, 8)}</td>
                      <td className="py-4 px-4 font-bold text-gray-800">{item.nama}</td>
                      <td className="py-4 px-4 text-gray-600">{item.mobil}</td>
                      <td className="py-4 px-4 text-gray-500 text-xs">{item.tglJadwal ? item.tglJadwal.substring(0, 10) : "-"}</td>
                      <td className="py-4 px-4 text-gray-700 font-bold">{item.paket}</td>
                      <td className="py-4 px-4 font-black text-gray-900">{formatPrice(item.totalHarga)}</td>
                      <td className="py-4 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleBookingStatusChange(item.id, e.target.value)}
                          disabled={updatingBookingId === item.id}
                          className={`rounded-xl border py-2 px-3 text-xs font-bold ${statusBadge(item.status)}`}
                        >
                          {BOOKING_STATUSES.map((s) => (
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
                              title="Edit Booking"
                            >
                              <FaEdit size={12} />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDeleteBooking(item.id)}
                              disabled={deletingId === item.id}
                              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all border border-red-100 disabled:opacity-50"
                              title="Hapus Booking"
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

      {/* MODAL EDIT BOOKING */}
      {editModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setEditModal(null)} />
          <div className="relative bg-white border border-gray-100 rounded-[24px] shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setEditModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black"><FaTimes /></button>
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-1">Edit Data Booking</h2>
            <p className="text-xs text-gray-400 mb-5">Perubahan akan disimpan ke Supabase.</p>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Nama Pelanggan</label>
                <input type="text" required value={editForm.member_name} onChange={(e) => setEditForm({ ...editForm, member_name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kendaraan</label>
                  <input type="text" required value={editForm.vehicle} onChange={(e) => setEditForm({ ...editForm, vehicle: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tanggal</label>
                  <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Layanan/Paket</label>
                <input type="text" required value={editForm.service} onChange={(e) => setEditForm({ ...editForm, service: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Keluhan</label>
                <textarea rows="2" value={editForm.complaint} onChange={(e) => setEditForm({ ...editForm, complaint: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Harga (Rp)</label>
                  <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Diskon (%)</label>
                  <input type="number" value={editForm.discount_rate} onChange={(e) => setEditForm({ ...editForm, discount_rate: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Total (Rp)</label>
                  <input type="number" value={editForm.total_price} onChange={(e) => setEditForm({ ...editForm, total_price: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Status</label>
                <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none">
                  {BOOKING_STATUSES.map((s) => (
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
