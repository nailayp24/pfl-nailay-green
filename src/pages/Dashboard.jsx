import { useEffect, useState } from "react";
import { FaWrench, FaUsers, FaWallet, FaTicketAlt, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { customerAPI } from "../services/userAPI";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeBookings: 0,
    totalMembers: 0,
    totalComplaints: 0,
    totalPromos: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
  setIsLoading(true);
  try {
    // Jalankan fetch dengan fallback array kosong jika salah satu tabel gagal
    const [bookingsData, membersData, complaintsData, promosData] = await Promise.all([
      customerAPI.getAllBookings().catch(() => []),
      customerAPI.getAllMembers().catch(() => []),
      customerAPI.getAllComplaints().catch(() => []),
      customerAPI.getAllPromos().catch(() => []),
    ]);

    const bookings = bookingsData || [];
    const members = membersData || [];
    const complaints = complaintsData || [];
    const promos = promosData || [];

    const userMap = {};
    members.forEach((m) => { userMap[m.id] = m.fullName || m.email; });

    const totalRevenue = bookings.reduce((sum, b) => sum + (parseFloat(b.total_harga) || 0), 0);
    const activeBookings = bookings.filter((b) => b.status === "booked" || b.status === "in_progress" || b.status === "pending").length;
    const openComplaints = complaints.filter((c) => c.status_resolusi === "pending" || c.status_resolusi === "open").length;

    setStats({
      totalRevenue,
      activeBookings,
      totalMembers: members.length,
      totalComplaints: openComplaints,
      totalPromos: promos.length,
    });

    setRecentBookings(
      bookings.slice(0, 5).map((b) => ({
        id: b.id || "BK-000",
        user: userMap[b.user_id] || "Pelanggan",
        vehicle: b.kendaraan || "-",
        service: b.jenis_servis || "-",
        cost: parseFloat(b.total_harga) || 0,
        status: b.status || "booked",
        date: b.tanggal_booking ? b.tanggal_booking.substring(0, 10) : "-",
      }))
    );
  } catch (error) {
    console.error("Gagal memuat data dashboard:", error);
  } finally {
    setIsLoading(false);
  }
};

    loadDashboardData();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

  const statCards = [
    { title: "Total Pendapatan", value: formatPrice(stats.totalRevenue), icon: <FaWallet />, desc: "Total dari seluruh booking terhubung Supabase", color: "bg-[#DEE33E]/20 text-black border-[#DEE33E]/40" },
    { title: "Booking Aktif", value: `${stats.activeBookings} Unit`, icon: <FaWrench />, desc: "Kendaraan dalam antrean/proses servis", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { title: "Total Member", value: `${stats.totalMembers} Orang`, icon: <FaUsers />, desc: "Pelanggan terdaftar di database", color: "bg-green-50 text-green-600 border-green-100" },
    { title: "Komplain Terbuka", value: `${stats.totalComplaints} Tiket`, icon: <FaExclamationTriangle />, desc: "Tiket aduan belum terselesaikan", color: "bg-red-50 text-red-600 border-red-100" },
    { title: "Promo Aktif", value: `${stats.totalPromos} Promo`, icon: <FaTicketAlt />, desc: "Kode diskon tersedia untuk member", color: "bg-purple-50 text-purple-600 border-purple-100" },
  ];

  const statusBadge = (status) => {
    const map = {
      booked: "bg-blue-50 text-blue-600 border-blue-200",
      pending: "bg-amber-50 text-amber-600 border-amber-200",
      in_progress: "bg-purple-50 text-purple-600 border-purple-200",
      completed: "bg-green-50 text-green-600 border-green-200",
      cancelled: "bg-red-50 text-red-600 border-red-200",
    };
    return map[status] || "bg-gray-50 text-gray-500 border-gray-200";
  };

  return (
    <div className="p-2 space-y-8 font-outfit text-gray-800">
      <div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Ringkasan Utama Bengkel</h1>
        <p className="text-xs text-gray-400 mt-0.5">Data realtime terhubung langsung ke Supabase database.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500 text-sm">Memuat data dashboard...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {statCards.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                <p className="text-xs font-bold text-gray-700 mt-0.5">{stat.title}</p>
                <p className="text-[10px] text-gray-400 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Booking Terbaru dari Supabase</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">5 transaksi terakhir yang masuk ke database.</p>
              </div>
              <button onClick={() => navigate("/admin/bookings")} className="text-[10px] px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-bold">
                Lihat Semua
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                    <th className="py-4 px-6">Nama Pelanggan</th>
                    <th className="py-4 px-6">Kendaraan</th>
                    <th className="py-4 px-6">Layanan</th>
                    <th className="py-4 px-6">Tanggal</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-500">Belum ada data booking.</td>
                    </tr>
                  ) : (
                    recentBookings.map((item) => (
                      <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                        <td className="py-4 px-6 font-extrabold text-gray-800">{item.user}</td>
                        <td className="py-4 px-6 font-bold text-gray-700">{item.vehicle}</td>
                        <td className="py-4 px-6 font-medium text-gray-500">{item.service}</td>
                        <td className="py-4 px-6 text-gray-500">{item.date}</td>
                        <td className="py-4 px-6">
                          <span className={`font-bold px-3 py-1.5 rounded-lg border text-[10px] ${statusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-black text-gray-900">{formatPrice(item.cost)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button onClick={() => navigate("/customers")} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md hover:border-[#DEE33E] transition-all text-left group">
              <FaUsers className="text-lg text-gray-400 group-hover:text-[#9FA324] mb-2" />
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Kelola Member</h3>
              <p className="text-[10px] text-gray-400 mt-1">CRUD data pelanggan & tier</p>
            </button>
            <button onClick={() => navigate("/admin/bookings")} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md hover:border-[#DEE33E] transition-all text-left group">
              <FaWrench className="text-lg text-gray-400 group-hover:text-[#9FA324] mb-2" />
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Kelola Booking</h3>
              <p className="text-[10px] text-gray-400 mt-1">Edit status, hapus pesanan</p>
            </button>
            <button onClick={() => navigate("/admin/complaints")} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md hover:border-[#DEE33E] transition-all text-left group">
              <FaExclamationTriangle className="text-lg text-gray-400 group-hover:text-[#9FA324] mb-2" />
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Kelola Aduan</h3>
              <p className="text-[10px] text-gray-400 mt-1">Resolusi tiket komplain</p>
            </button>
            <button onClick={() => navigate("/services")} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md hover:border-[#DEE33E] transition-all text-left group">
              <FaTicketAlt className="text-lg text-gray-400 group-hover:text-[#9FA324] mb-2" />
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Service Orders</h3>
              <p className="text-[10px] text-gray-400 mt-1">Daftar order aktif bengkel</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
