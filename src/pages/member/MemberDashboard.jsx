import { useState, useEffect } from "react";
import { FaCrown, FaCar, FaHistory, FaTicketAlt, FaGift } from "react-icons/fa";
import { customerAPI } from "../../services/userAPI";
import {
  REWARD_CATALOG,
  getDiscountByTier,
} from "../../utils/membership";

export default function MemberDashboard() {
  const [memberData, setMemberData] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingCount, setBookingCount] = useState(0);
  const [complaintCount, setComplaintCount] = useState(0);
  const [promoCards, setPromoCards] = useState([]);
  const [isPromosLoading, setIsPromosLoading] = useState(true);
  const [rewardMessage, setRewardMessage] = useState("");

  const normalizePromo = (promo) => {
    const desc = promo.deskripsi || "";
    const parts = desc.split(" | ");
    return {
      id: promo.id || "PRM-000",
      title: promo.nama_produk || "Promo",
      discount: promo.harga ? `Rp ${parseFloat(promo.harga).toLocaleString("id-ID")}` : "-",
      desc: parts[0] || "Promo spesial untuk Anda",
      expDate: parts[2]?.replace("Exp: ", "") || "-",
      type: parts[1] || "Promo",
    };
  };

  useEffect(() => {
    const loadMemberData = async () => {
      const session = JSON.parse(localStorage.getItem("user_session"));
      setSessionData(session);
      if (!session) {
        setIsLoading(false);
        return;
      }

      const memberId = session.id || session.user_id || session.uuid;
      if (!memberId) {
        setIsLoading(false);
        return;
      }

      try {
        const [memberRecord, bookings, complaints] = await Promise.all([
          customerAPI.getMemberById(memberId),
          customerAPI.getMemberBookings(memberId),
          customerAPI.getMemberComplaints(memberId),
        ]);

        if (memberRecord) {
          setMemberData(memberRecord);
        }

        setBookingCount(bookings.length);
        setComplaintCount(complaints.length);
      } catch (error) {
        console.error("Gagal memuat dashboard member:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const loadPromos = async () => {
      setIsPromosLoading(true);
      try {
        const promos = await customerAPI.getAllPromos();
        setPromoCards(promos.map(normalizePromo));
      } catch (error) {
        console.error("Gagal memuat promo member:", error);
      } finally {
        setIsPromosLoading(false);
      }
    };

    loadMemberData();
    loadPromos();
  }, []);

  const profile = memberData || sessionData || {};
  const membershipTier = profile?.tier || "Bronze";
  const discountRate = 0; // No discount system in current DB
  const unitMobil = "Belum ada unit terdaftar";
  const totalTransaksi = "Rp 0";
  const memberId = profile?.id;

  const handleRewardRedeem = async (reward) => {
    setRewardMessage("Sistem reward belum tersedia. Fitur akan segera hadir!");
  };

  return (
    <div className="space-y-6 font-outfit text-gray-800">
      <div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Dashboard Member</h1>
        <p className="text-xs text-gray-400 mt-0.5">Selamat datang kembali, <span className="font-bold text-gray-700">{memberData?.fullName || "Pelanggan Setia"}</span>!</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6 space-y-4">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <FaCrown className="text-[#DEE33E]" /> Status Keanggotaan Anda
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border">
          <div>
            <span className="inline-block px-3 py-1 bg-[#DEE33E] text-black font-black text-xs rounded-xl uppercase tracking-wider shadow-sm mb-2">{membershipTier}</span>
            <p className="text-xs text-gray-500 font-medium">ID Pelanggan: <span className="font-mono font-bold text-gray-700">{memberData?.id || "BG-000"}</span></p>
            <p className="text-[10px] text-gray-500 mt-1">Tier: <span className="font-bold text-gray-700 uppercase">{membershipTier}</span></p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Referral Code Anda</p>
            <p className="text-sm font-mono font-black text-gray-800 bg-white px-3 py-1 rounded-xl border border-gray-100 w-fit sm:ml-auto mt-1">BGO-MEMBER-VIP</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2"><FaGift className="text-[#9FA324]" /> Reward Redemption</h4>
            <p className="text-[11px] text-gray-500 mt-1">Tukar poin loyalitas dengan benefit servis.</p>
          </div>
          <span className="text-xs font-black text-gray-800">Tier: {membershipTier}</span>
        </div>
        {rewardMessage && <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs font-bold text-gray-600">{rewardMessage}</div>}
        <div className="grid gap-4 md:grid-cols-3">
          {REWARD_CATALOG.map((reward) => (
            <div key={reward.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500">{reward.cost} poin</p>
              <h3 className="mt-2 text-sm font-black text-gray-900">{reward.title}</h3>
              <p className="mt-2 text-xs text-gray-500">{reward.value}</p>
              <button
                type="button"
                onClick={() => handleRewardRedeem(reward)}
                disabled={false}
                className="mt-4 w-full rounded-xl bg-black px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white disabled:bg-gray-200 disabled:text-gray-400"
              >
                Klaim Reward
              </button>
            </div>
          ))}
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

      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2"><FaTicketAlt className="text-[#9FA324]" /> Promo Aktif untuk Anda</h4>
            <p className="text-[11px] text-gray-500 mt-1">Lihat promo terbaru yang bisa diklaim oleh member.</p>
          </div>
          {isPromosLoading && <span className="text-[10px] text-gray-500">Memuat promo...</span>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {promoCards.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              Tidak ada promo aktif saat ini.
            </div>
          ) : (
            promoCards.map((promo) => (
              <div key={promo.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">{promo.type}</p>
                    <h3 className="mt-2 text-lg font-black text-gray-900">{promo.title}</h3>
                  </div>
                  <span className="rounded-2xl bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">{promo.discount}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600">{promo.desc}</p>
                <p className="mt-4 text-[10px] text-gray-500">Berlaku sampai {promo.expDate}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
