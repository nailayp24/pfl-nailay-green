import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { customerAPI } from "../services/userAPI";

const normalizeBooking = (item, userMap) => ({
  id: item.id || "BK-000",
  orderId: `BG-00${item.id || 0}`,
  customerName: userMap?.[item.user_id] || "Pelanggan",
  email: "-",
  vehicle: item.kendaraan || "-",
  plate: "-",
  status: item.status || "booked",
  orderDate: item.tanggal_booking ? item.tanggal_booking.substring(0, 10) : "-",
  mechanic: "Belum Ditentukan",
  problem: item.keluhan || "-",
  parts: [],
  cost: parseFloat(item.total_harga) || 0,
  service: item.jenis_servis || "-",
  discount: parseFloat(item.diskon_applied) || 0,
});

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceDetail, setServiceDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  useEffect(() => {
    const loadServiceDetail = async () => {
      setIsLoading(true);
      setLoadError(false);
      try {
        const [booking, members] = await Promise.all([
          customerAPI.getBookingById(id),
          customerAPI.getAllMembers().catch(() => []),
        ]);
        const userMap = {};
        (members || []).forEach((m) => { userMap[m.id] = m.fullName || m.email; });
        if (!booking) {
          setServiceDetail(null);
        } else {
          setServiceDetail(normalizeBooking(booking, userMap));
        }
      } catch (error) {
        console.error("Gagal memuat detail service:", error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadServiceDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12">
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <div className="rounded-[24px] border border-gray-100 bg-white p-10 shadow-sm text-center">
            <p className="text-sm font-bold text-gray-700">Memuat detail service...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loadError || !serviceDetail) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12">
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm"
          >
            <FaArrowLeft className="text-[10px]" /> Kembali
          </button>
          <div className="rounded-[24px] border border-gray-100 bg-white p-10 shadow-sm text-center">
            <p className="text-sm font-bold text-gray-700">
              {loadError ? "Terjadi kesalahan saat memuat data." : `Detail service dengan ID ${id} tidak ditemukan.`}
            </p>
            <p className="text-xs text-gray-400 mt-2">Silakan kembali ke daftar layanan untuk memilih ulang.</p>
          </div>
        </div>
      </div>
    );
  }

  const parts = serviceDetail.parts || [];
  const partCost = parts.reduce((sum, part) => sum + (part.price || 0), 0);
  const totalCost = serviceDetail.cost || partCost;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12">
      <div className="max-w-5xl mx-auto px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm"
        >
          <FaArrowLeft className="text-[10px]" /> Kembali ke Daftar Layanan
        </button>

        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm space-y-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#9FA324]">Order Service</p>
              <h1 className="mt-3 text-3xl font-black text-gray-900">{serviceDetail.customerName}</h1>
              <p className="mt-2 text-sm text-gray-500">{serviceDetail.orderId} • {serviceDetail.vehicle} • {serviceDetail.service}</p>
            </div>
            <div className="rounded-3xl bg-[#DEE33E]/10 px-5 py-4 text-right">
              <p className="text-[10px] uppercase tracking-widest text-gray-600">Status</p>
              <p className="mt-2 text-lg font-black text-gray-900">{serviceDetail.status}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_0.7fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Informasi Pelanggan</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 text-xs text-gray-600">
                    <p className="font-bold text-gray-900">{serviceDetail.customerName}</p>
                    <p>{serviceDetail.email}</p>
                    <p>{serviceDetail.orderDate}</p>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p className="font-bold text-gray-900">Mekanik</p>
                    <p>{serviceDetail.mechanic}</p>
                    <p className="text-gray-500">{serviceDetail.problem}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Detail Pekerjaan</h2>
                    <p className="mt-2 text-sm text-gray-600">Rincian suku cadang dan jasa pada order ini.</p>
                  </div>
                  <span className="rounded-2xl bg-black px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">{serviceDetail.status}</span>
                </div>

                <div className="mt-6 space-y-4">
                  {parts.length > 0 ? (
                    parts.map((part) => (
                      <div key={part.name} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3">
                        <div>
                          <p className="font-bold text-gray-900">{part.name}</p>
                          <p className="text-xs text-gray-500">Suku cadang / biaya jasa</p>
                        </div>
                        <p className="text-sm font-black text-gray-900">{formatCurrency(part.price || 0)}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
                      Tidak ada detail suku cadang atau jasa terdaftar untuk order ini.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-[#F8FFF2] p-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Ringkasan Tagihan</h2>
                <div className="mt-6 space-y-3 text-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <p>Biaya suku cadang</p>
                    <p>{formatCurrency(partCost)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p>Biaya jasa</p>
                    <p>{formatCurrency(totalCost - partCost)}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between font-black text-gray-900">
                    <p>Total</p>
                    <p>{formatCurrency(totalCost)}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Kontak Cepat</h2>
                <div className="mt-4 space-y-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />
                    <span>support@bengkelgo.co.id</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    <span>0812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>BengkelGo, Pekanbaru</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    <span>08:00 - 18:00 WIB</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
