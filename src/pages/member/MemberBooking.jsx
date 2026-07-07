import { useState, useEffect } from "react";
import { FaCalendarCheck, FaTag } from "react-icons/fa";
import { customerAPI } from "../../services/userAPI";
import { getDiscountByTier } from "../../utils/membership";

export default function MemberBooking() {
  const [formData, setFormData] = useState({
    vehicle: "",
    service: "",
    date: "",
    complaint: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const [productCatalog, setProductCatalog] = useState([]);

  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const membershipTier = userSession?.tier || "Bronze";

  const servicePrices = {
    "Ganti Oli": 250000,
    "Tune Up": 350000,
    "Servis Berkala": 450000,
    "Perbaikan Mesin": 650000,
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await customerAPI.getAllPromos();
        setProductCatalog(products || []);
      } catch {
        setProductCatalog([]);
      }
    };
    loadProducts();
  }, []);

  const discountRate = getDiscountByTier(membershipTier);
  const servicePrice = servicePrices[formData.service] || 0;
  const discountAmount = Math.round((servicePrice * discountRate) / 100);
  const finalPrice = servicePrice ? servicePrice - discountAmount : 0;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vehicle || !formData.service || !formData.date) return;

    const session = JSON.parse(localStorage.getItem("user_session"));
    if (!session) {
      setSubmitMessage("Mohon login ulang untuk melakukan booking.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    const memberId = session.id || session.user_id || session.uuid;
    const bookingPayload = {
      user_id: memberId,
      kendaraan: formData.vehicle,
      jenis_servis: formData.service,
      tanggal_booking: formData.date,
      keluhan: formData.complaint,
      total_harga: finalPrice,
      diskon_applied: discountRate,
      status: "booked",
    };

    try {
      const createdBooking = await customerAPI.createBooking(bookingPayload);

      if (!createdBooking) {
        throw new Error("Booking tidak berhasil tersimpan di Supabase.");
      }

      setSubmitMessage(`Booking berhasil. Total pembayaran ${formatCurrency(finalPrice)}.`);
      setFormData({ vehicle: "", service: "", date: "", complaint: "" });
    } catch (error) {
      console.error("Gagal membuat booking:", error);
      setSubmitMessage("Gagal membuat booking. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-outfit">
      <div>
        <h1 className="text-2xl font-black text-gray-800">Booking Servis</h1>
        <p className="text-xs text-gray-400 mt-1">Jadwalkan servis kendaraan Anda dengan mudah.</p>
      </div>

      {/* Service Catalog */}
      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-4">
          <FaTag className="text-gray-500" /> Katalog Layanan & Harga
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(servicePrices).map(([name, price]) => (
            <button
              key={name}
              type="button"
              onClick={() => setFormData({ ...formData, service: name })}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                formData.service === name
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-100 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <p className="text-xs font-bold truncate">{name}</p>
              <p className={`text-sm font-black mt-1 ${formData.service === name ? "text-white" : "text-gray-900"}`}>
                {formatCurrency(price)}
              </p>
              {discountRate > 0 && (
                <p className={`text-[9px] font-bold mt-1 ${formData.service === name ? "text-gray-300" : "text-emerald-600"}`}>
                  Diskon {discountRate}% tier {membershipTier}
                </p>
              )}
            </button>
          ))}
        </div>

        {productCatalog.length > 0 && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Produk & Sparepart Tersedia</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {productCatalog.map((p) => (
                <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-800">{p.nama_produk}</p>
                    <p className="text-[10px] text-gray-400">Stok: {p.stok ?? "-"}</p>
                  </div>
                  <span className="text-xs font-black text-gray-900">{formatCurrency(parseFloat(p.harga) || 0)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Form */}
      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitMessage && (
            <div className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3">
              {submitMessage}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-500">Kendaraan</label>
            <input
              type="text"
              placeholder="Contoh: Toyota Avanza"
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              className="w-full mt-1 border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500">Jenis Servis</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full mt-1 border rounded-xl p-3"
              required
            >
              <option value="">Pilih Servis</option>
              <option>Ganti Oli</option>
              <option>Tune Up</option>
              <option>Servis Berkala</option>
              <option>Perbaikan Mesin</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500">Tanggal Booking</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full mt-1 border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500">Keluhan Kendaraan</label>
            <textarea
              rows="4"
              placeholder="Jelaskan keluhan kendaraan..."
              value={formData.complaint}
              onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
              className="w-full mt-1 border rounded-xl p-3"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-black text-white rounded-xl font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaCalendarCheck />
            {isSubmitting ? "Memproses..." : "Booking Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}
