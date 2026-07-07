import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaCar, FaCertificate, FaSave } from "react-icons/fa";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { customerAPI } from "../services/userAPI";
import { MEMBERSHIP_TIERS, toPointNumber } from "../utils/membership";

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [bookingCount, setBookingCount] = useState(0);
  const [complaintCount, setComplaintCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [membershipForm, setMembershipForm] = useState({ points: 0, levelMembership: "Regular Member" });
  const [isSavingMembership, setIsSavingMembership] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const normalizeMember = (apiMember) => ({
      id: apiMember.id,
      name: apiMember.full_name || apiMember.fullName || apiMember.username || apiMember.name || "Unknown Member",
      email: apiMember.email || apiMember.email_address || "-",
      phone: apiMember.phone || apiMember.phone_number || apiMember.phoneNumber || "-",
      levelMembership: apiMember.levelMembership || apiMember.membership_tier || apiMember.role || "Regular Member",
      points: toPointNumber(apiMember.points || apiMember.loyalty_points || apiMember.reward_points || 0),
      lastProduct: apiMember.lastProduct || apiMember.last_product || apiMember.vehicle || "Tidak ada data kendaraan",
      spent: apiMember.spent || "Rp 0",
      complaint: apiMember.complaint || apiMember.complaint_detail || "-",
      lastLogin: apiMember.last_login || apiMember.updated_at || apiMember.lastLogin || "-",
      address: apiMember.address || apiMember.location || "-",
      statusAktif: apiMember.status || apiMember.statusAktif || "Aktif",
      membershipSince: apiMember.created_at || apiMember.regDate || "-",
      promoStatus: apiMember.promo_status || apiMember.promoStatus || "Tidak Ada Promo",
      ticketHelp: apiMember.ticket_help || apiMember.ticketHelp || "-",
    });

    const fetchMember = async () => {
      setIsLoading(true);
      setLoadError(false);
      try {
        const apiMember = await customerAPI.getMemberById(id);
        if (apiMember) {
          const normalized = normalizeMember(apiMember);
          const currentTier = normalized.levelMembership || "Bronze";
          setMember({ ...normalized, levelMembership: currentTier });
          setMembershipForm({ points: normalized.points, levelMembership: currentTier });
          const [bookings, complaints] = await Promise.all([
            customerAPI.getMemberBookings(id),
            customerAPI.getMemberComplaints(id),
          ]);
          setBookingCount(bookings.length);
          setComplaintCount(complaints.length);
          return;
        }

        setMember(null);
      } catch (error) {
        console.error(`Gagal mengambil member ID ${id}:`, error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleMembershipPointsChange = (e) => {
    const points = toPointNumber(e.target.value);
    setMembershipForm({ points, levelMembership: membershipForm.levelMembership });
  };

  const handleMembershipSave = async (e) => {
    e.preventDefault();
    setIsSavingMembership(true);
    setSaveMessage("");

    const nextTier = membershipForm.levelMembership || "Bronze";
    const payload = {
      tier: nextTier,
    };

    try {
      const updatedMember = await customerAPI.updateMember(id, payload);
      setMember({
        ...member,
        ...(updatedMember || {}),
        points: membershipForm.points,
        levelMembership: nextTier,
      });
      setMembershipForm({ points: membershipForm.points, levelMembership: nextTier });
      setSaveMessage("Membership dan poin berhasil diperbarui.");
    } catch (error) {
      console.error("Gagal menyimpan membership:", error);
      setSaveMessage("Gagal menyimpan perubahan membership.");
    } finally {
      setIsSavingMembership(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] font-outfit p-6">
        <Container>
          <PageHeader title="Detail Customer" breadcrumb="Dashboard / Customer" />
          <div className="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-500">Memuat detail pelanggan...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (loadError || !member) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] font-outfit p-6">
        <Container>
          <PageHeader title="Detail Customer" breadcrumb="Dashboard / Customer" />
          <div className="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-500">Data pelanggan tidak ditemukan atau gagal dimuat.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold"
            >
              <FaArrowLeft /> Kembali
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-outfit p-6">
      <Container>
        <PageHeader title="Detail Customer" breadcrumb="Dashboard / Customer / Detail" />

        <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900">{member.name}</h2>
              <p className="text-xs text-gray-400 mt-1">{member.levelMembership} • {member.statusAktif}</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold hover:bg-gray-50"
            >
              <FaArrowLeft /> Kembali
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F8F9FA] rounded-[24px] p-5 border border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Total Booking</p>
              <p className="mt-3 text-3xl font-black text-gray-900">{bookingCount}</p>
              <p className="text-[10px] text-gray-500 mt-2">Riwayat booking terhubung dengan akun ini.</p>
            </div>
            <div className="bg-[#F8F9FA] rounded-[24px] p-5 border border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Jumlah Komplain</p>
              <p className="mt-3 text-3xl font-black text-gray-900">{complaintCount}</p>
              <p className="text-[10px] text-gray-500 mt-2">Total tiket komplain yang tercatat.</p>
            </div>
            <form onSubmit={handleMembershipSave} className="bg-[#F8F9FA] rounded-[24px] p-5 border border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Edit Membership</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <input
                  type="number"
                  min="0"
                  value={membershipForm.points}
                  onChange={handleMembershipPointsChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold focus:outline-none focus:border-black"
                />
                <select
                  value={membershipForm.levelMembership}
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600"
                >
                  {MEMBERSHIP_TIERS.map((tier) => (
                    <option key={tier.name} value={tier.name}>{tier.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isSavingMembership}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white disabled:opacity-50"
              >
                <FaSave /> {isSavingMembership ? "Menyimpan..." : "Simpan Poin"}
              </button>
              {saveMessage && <p className="mt-2 text-[10px] font-bold text-gray-500">{saveMessage}</p>}
            </form>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="space-y-4 bg-[#F8F9FA] p-6 rounded-[24px] border border-gray-100">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-500">
                <FaUser /> Profil
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Nama</p>
                  <p className="font-black text-gray-900">{member.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Email</p>
                  <p className="font-bold text-gray-700">{member.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Telepon</p>
                  <p className="font-bold text-gray-700">{member.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-[#F8F9FA] p-6 rounded-[24px] border border-gray-100">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-500">
                <FaCar /> Kendaraan
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Unit terakhir</p>
                <p className="font-black text-gray-900">{member.lastProduct}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pengeluaran</p>
                <p className="font-bold text-gray-700">{member.spent}</p>
              </div>
            </div>

            <div className="space-y-4 bg-[#F8F9FA] p-6 rounded-[24px] border border-gray-100">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-500">
                <FaCertificate /> Status
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Komplain Terakhir</p>
                <p className="font-bold text-gray-700">{member.complaint}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Login terakhir</p>
                <p className="font-bold text-gray-700">{member.lastLogin}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Membership</p>
                <p className="font-bold text-gray-700">{member.levelMembership} / {member.points || 0} poin</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

