import { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { customerAPI } from "../../services/userAPI";
import { getBookingRewardPoints } from "../../utils/membership";

export default function MemberHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [pointHistory, setPointHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      setLoadError(false);
      try {
        const session = JSON.parse(localStorage.getItem("user_session"));
        const memberId = session?.id || session?.user_id || session?.uuid;
        if (!memberId) {
          throw new Error("Member tidak teridentifikasi");
        }

        const bookings = await customerAPI.getMemberBookings(memberId);
        if (bookings.length > 0) {
          const normalizedBookings = bookings.map((booking) => ({
            id: booking.id || booking.booking_id || booking.uuid,
            service: booking.service || booking.paket || booking.package || "Layanan",
            date: booking.date || booking.tglJadwal || booking.booking_date || booking.created_at,
            status: booking.status || booking.booking_status || "Terjadwal",
            totalPrice: booking.total_price || booking.totalPrice || booking.price || 0,
          }));
          setHistoryData(normalizedBookings);
          setPointHistory(normalizedBookings.map((booking) => ({
            id: `booking-${booking.id}`,
            title: `Booking ${booking.service}`,
            date: booking.date,
            points: getBookingRewardPoints(booking.totalPrice),
            type: "earn",
          })));
        } else {
          setHistoryData([]);
          setPointHistory([]);
        }
      } catch (error) {
        console.error("Gagal memuat riwayat member:", error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FaHistory className="text-gray-500" />
        <div>
          <h1 className="text-2xl font-black">Riwayat Servis</h1>
          <p className="text-gray-500 text-sm">Daftar layanan yang pernah dilakukan.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border shadow-sm">
        {isLoading ? (
          <div className="py-10 text-center text-gray-500">Memuat riwayat servis...</div>
        ) : loadError ? (
          <div className="py-10 text-center text-red-500">Gagal memuat riwayat. Silakan muat ulang halaman.</div>
        ) : historyData.length === 0 ? (
          <div className="py-10 text-center text-gray-500">Belum ada riwayat servis yang tercatat.</div>
        ) : (
          historyData.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 mb-3 flex justify-between">
              <div>
                <h3 className="font-bold">{item.service}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
                {item.status}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-6 rounded-3xl border shadow-sm">
        <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-4">Riwayat Poin & Reward</h2>
        {isLoading ? (
          <div className="py-8 text-center text-gray-500">Memuat riwayat poin...</div>
        ) : pointHistory.length === 0 ? (
          <div className="py-8 text-center text-gray-500">Belum ada aktivitas poin.</div>
        ) : (
          pointHistory.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 mb-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-sm font-bold ${item.points >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {item.points >= 0 ? "+" : ""}{item.points} poin
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
