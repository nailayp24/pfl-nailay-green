import { useCallback, useEffect, useState } from "react";
import { FaSearch, FaFilter, FaPlus, FaTimes, FaUserFriends, FaCalendarCheck, FaExclamationTriangle, FaBullhorn, FaEnvelope, FaWhatsapp, FaTicketAlt, FaTrash, FaEdit } from "react-icons/fa";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { customerAPI } from "../services/userAPI";
import { getTierByPoints, toPointNumber } from "../utils/membership";

export default function Customers() {
  const navigate = useNavigate();

  // Get user role from session
  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const userRole = userSession?.role || "";
  const canDelete = userRole === "Owner"; // Only Owner can delete

  const [activeTab, setActiveTab] = useState("customer-list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "", phone: "", email: "", address: "", levelMembership: "Regular Member", unitMobil: "", platNomor: "", points: "0"
  });
  const [newPromo, setNewPromo] = useState({ code: "", name: "", discount: "", expDate: "", type: "Kupon" });
  const [broadcastMessage, setBroadcastMessage] = useState(
    "Halo Pelanggan Setia BengkelGo Mobil! Nikmati diskon spesial 25% untuk layanan Spooring, Balancing, dan General Check-Up khusus minggu ini. Yuk booking antrean Anda sekarang!"
  );
  const [customerData, setCustomerData] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [promoData, setPromoData] = useState([]);
  const [customerPage, setCustomerPage] = useState(1);
  const CUSTOMER_PER_PAGE = 10;
  const [promoPage, setPromoPage] = useState(1);
  const PROMO_PER_PAGE = 5;
  const [isLoadingPromos, setIsLoadingPromos] = useState(false);
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const [deletingPromoId, setDeletingPromoId] = useState(null);
  const [isSeedingPromos, setIsSeedingPromos] = useState(false);

  // Edit member modal
  const [editMemberModal, setEditMemberModal] = useState(null);
  const [editMemberForm, setEditMemberForm] = useState({});
  const [isEditingMember, setIsEditingMember] = useState(false);

  // Edit promo modal
  const [editPromoModal, setEditPromoModal] = useState(null);
  const [editPromoForm, setEditPromoForm] = useState({});
  const [isEditingPromo, setIsEditingPromo] = useState(false);

  const handleInputChange = (e) => setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  const handlePromoInputChange = (e) => setNewPromo({ ...newPromo, [e.target.name]: e.target.value });
  const handleBroadcast = (channel) => alert(`ðŸ“¢ [CRM AUTOMATION] Berhasil mengirimkan broadcast via ${channel.toUpperCase()} ke semua member!`);

  const normalizeMember = (member) => ({
    id: member.id || member.user_id || member.uuid || "BG-000",
    name: member.fullName || member.full_name || member.name || "Unknown Member",
    username: member.email ? member.email.split("@")[0] : "unknown_user",
    phone: member.phone || "-",
    email: member.email || "-",
    address: member.address || "-",
    levelMembership: member.tier || member.levelMembership || member.membership_tier || "Bronze",
    statusAktif: "Aktif",
    points: toPointNumber(member.points || member.reward_points || member.loyalty_points || 0),
    lastProduct: member.last_product || member.vehicle || member.lastProduct || "-",
    userSource: member.user_source || "Database",
    promoStatus: "Tidak Ada Promo",
    regDate: member.created_at || "-",
  });

  const normalizePromo = (promo) => {
    const desc = promo.deskripsi || "";
    const parts = desc.split(" | ");
    return {
      id: promo.id || "PRM-000",
      code: parts[0] || promo.nama_produk || "Product",
      name: promo.nama_produk || "Produk",
      discount: promo.harga || 0,
      expDate: parts[2]?.replace("Exp: ", "") || "-",
      type: parts[1] || "Produk",
    };
  };

  const fetchCustomers = useCallback(async () => {
    setIsLoadingCustomers(true);
    try {
      const apiMembers = await customerAPI.getAllMembers();
      setCustomerData(apiMembers.map(normalizeMember));
    } catch (err) {
      console.error("Gagal memuat data customer Supabase:", err);
      setCustomerData([]);
    } finally {
      setIsLoadingCustomers(false);
    }
  }, []);

  const fetchPromos = useCallback(async () => {
    setIsLoadingPromos(true);
    try {
      const apiPromos = await customerAPI.getAllPromos();
      setPromoData((apiPromos || []).map(normalizePromo));
    } catch (err) {
      console.error("Gagal memuat promo Supabase:", err);
      setPromoData([]);
    } finally {
      setIsLoadingPromos(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
    fetchPromos();
  }, [fetchCustomers, fetchPromos]);

  // CRUD: Create Member
  const handleAddCustomerSubmit = async (e) => {
    e.preventDefault();
    const pointsValue = toPointNumber(newCustomer.points);
    const payload = {
      fullName: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      address: newCustomer.address,
      unitMobil: newCustomer.unitMobil,
      platNomor: newCustomer.platNomor,
      points: pointsValue,
      role: "Member",
      tier: getTierByPoints(pointsValue),
    };
    try {
      const createdMember = await customerAPI.createMember(payload);
      if (createdMember) {
        setCustomerData([...customerData, normalizeMember(createdMember)]);
        alert("Pelanggan baru berhasil disimpan!");
      }
    } catch (err) {
      console.error("Gagal menyimpan customer baru:", err);
      alert("Gagal menyimpan customer baru. Periksa koneksi.");
    } finally {
      setNewCustomer({ name: "", phone: "", email: "", address: "", levelMembership: "Regular Member", unitMobil: "", platNomor: "", points: "0" });
      setIsModalOpen(false);
    }
  };

  // CRUD: Delete Member
  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Yakin ingin menghapus data member ini?")) return;
    setDeletingMemberId(memberId);
    try {
      await customerAPI.deleteMember(memberId);
      setCustomerData((current) => current.filter((c) => c.id !== memberId));
    } catch (err) {
      console.error("Gagal menghapus member:", err);
      alert("Gagal menghapus member.");
    } finally {
      setDeletingMemberId(null);
    }
  };

  // CRUD: Edit Member
  const openEditMember = (member) => {
    setEditMemberModal(member);
    setEditMemberForm({
      fullName: member.name,
      email: member.email === "-" ? "" : member.email,
      tier: member.levelMembership || "Bronze"
    });
  };

  const handleEditMemberSubmit = async (e) => {
    e.preventDefault();
    if (!editMemberModal) return;
    setIsEditingMember(true);
    try {
      const payload = {
        fullName: editMemberForm.fullName,
        email: editMemberForm.email,
        tier: editMemberForm.tier,
      };
      await customerAPI.updateMember(editMemberModal.id, payload);
      setCustomerData((current) =>
        current.map((c) =>
          c.id === editMemberModal.id
            ? { ...c, name: payload.fullName, email: payload.email || "-", levelMembership: payload.tier }
            : c
        )
      );
      setEditMemberModal(null);
    } catch (err) {
      console.error("Gagal mengupdate member:", err);
      alert("Gagal menyimpan perubahan member.");
    } finally {
      setIsEditingMember(false);
    }
  };

  // CRUD: Create Promo
  const handleAddPromoSubmit = async (e) => {
    e.preventDefault();
    const promoPayload = {
      nama_produk: newPromo.name || "Promo",
      harga: parseFloat(newPromo.discount) || 0,
      stok: 0,
      deskripsi: `${newPromo.code?.toUpperCase()?.replace(/\s+/g, "") || "PROMO"} | ${newPromo.type} | Exp: ${newPromo.expDate}`,
    };
    console.log("Promo payload:", promoPayload);
    try {
      const createdPromo = await customerAPI.createPromo(promoPayload);
      if (createdPromo) {
        setPromoData([...promoData, normalizePromo(createdPromo)]);
        alert("Kode Promo berhasil tersimpan!");
      }
    } catch (err) {
      console.error("Gagal menyimpan promo baru:", err);
      console.error("Error response:", err.response?.data);
      alert(`Gagal menyimpan promo: ${err.response?.data?.message || err.message || "Unknown error"}`);
    } finally {
      setNewPromo({ code: "", name: "", discount: "", expDate: "", type: "Kupon" });
    }
  };

  // CRUD: Delete Promo
  const handleDeletePromo = async (promoId) => {
    if (!window.confirm("Yakin ingin menghapus promo ini?")) return;
    setDeletingPromoId(promoId);
    try {
      await customerAPI.deletePromo(promoId);
      setPromoData((current) => current.filter((p) => p.id !== promoId));
    } catch (err) {
      console.error("Gagal menghapus promo:", err);
      alert("Gagal menghapus promo.");
    } finally {
      setDeletingPromoId(null);
    }
  };

  // CRUD: Edit Promo
  const openEditPromo = (promo) => {
    setEditPromoModal(promo);
    setEditPromoForm({
      code: promo.code,
      name: promo.name,
      discount: promo.discount,
      expDate: promo.expDate === "-" ? "" : promo.expDate,
      type: promo.type,
    });
  };

  const handleEditPromoSubmit = async (e) => {
    e.preventDefault();
    if (!editPromoModal) return;
    setIsEditingPromo(true);
    try {
      const payload = {
        nama_produk: editPromoForm.name || "Promo",
        harga: parseFloat(editPromoForm.discount) || 0,
        deskripsi: `${editPromoForm.code?.toUpperCase()?.replace(/\s+/g, "") || "PROMO"} | ${editPromoForm.type} | Exp: ${editPromoForm.expDate}`,
      };
      await customerAPI.updatePromo(editPromoModal.id, payload);
      setPromoData((current) =>
        current.map((p) =>
          p.id === editPromoModal.id
            ? normalizePromo({ ...p, ...payload })
            : p
        )
      );
      setEditPromoModal(null);
    } catch (err) {
      console.error("Gagal mengupdate promo:", err);
      alert("Gagal menyimpan perubahan promo.");
    } finally {
      setIsEditingPromo(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12 p-6">
      <Container>
        <PageHeader title="Manajemen &amp; CRM Pelanggan" breadcrumb="Dashboard / CRM Terpadu" />

        {/* NAV TABS */}
        <div className="flex flex-wrap gap-2 mt-8 items-center">
          <button onClick={() => setActiveTab("customer-list")} className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${activeTab === "customer-list" ? "bg-black text-white" : "bg-white text-black border border-gray-200 hover:bg-gray-50"}`}>
            <FaUserFriends /> Data Customer
          </button>
          <button onClick={() => navigate("/admin/bookings")} className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-white text-black border border-gray-200 hover:bg-gray-50 transition-all">
            <FaCalendarCheck /> Data Pesanan
          </button>
          <button onClick={() => navigate("/admin/complaints")} className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-white text-black border border-gray-200 hover:bg-gray-50 transition-all">
            <FaExclamationTriangle /> Data Komplain
          </button>
          <button onClick={() => setActiveTab("manage-promo")} className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${activeTab === "manage-promo" ? "bg-[#DEE33E] text-black" : "text-gray-500 bg-gray-50 hover:text-black hover:bg-gray-100"}`}>
            <FaTicketAlt /> Kelola Diskon &amp; Promo
          </button>
        </div>

        {/* TAB: CUSTOMER LIST */}
        {activeTab === "customer-list" && (
          <div className="space-y-6 mt-4">
            {/* CRM BROADCAST */}
            <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#DEE33E]/20 rounded-lg"><FaBullhorn className="text-gray-800" size={14} /></div>
                <div>
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">CRM Automation &amp; Broadcast Hub</h4>
                  <p className="text-[11px] text-gray-400">Kirim pemberitahuan massal otomatis ke pelanggan.</p>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <textarea value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 focus:outline-none focus:border-black font-mono leading-relaxed" rows="2" />
                <div className="flex justify-end gap-2">
                  <button onClick={() => handleBroadcast("email")} className="flex items-center gap-2 bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-wider"><FaEnvelope /> Blast Email</button>
                  <button onClick={() => handleBroadcast("whatsapp")} className="flex items-center gap-2 bg-emerald-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-wider"><FaWhatsapp /> Blast WhatsApp</button>
                </div>
              </div>
            </div>

            {/* CUSTOMER TABLE */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-50 pb-6">
                <div>
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Basis Data Pelanggan</h3>
                  <p className="text-xs text-gray-400 mt-1">Data member terhubung Supabase - CRUD lengkap (Tambah, Edit, Hapus).</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} type="text" placeholder="Cari nama, email, telp..." className="w-full bg-gray-50 text-gray-700 text-xs rounded-xl py-2.5 pl-10 pr-4 focus:outline-none border border-gray-200 focus:border-[#DEE33E]" />
                  </div>
                  <button type="button" onClick={fetchCustomers} className="border border-gray-200 text-gray-600 p-2.5 rounded-xl text-xs bg-gray-50 hover:bg-gray-100">Refresh</button>
                  <button onClick={() => setIsModalOpen(true)} className="bg-black hover:bg-gray-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 uppercase tracking-wider"><FaPlus size={10} /> Tambah Customer</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3 min-w-[900px]">
                  <thead>
                    <tr className="text-gray-400 text-[10px] font-bold uppercase tracking-wider bg-gray-50/50">
                      <th className="py-3 px-4 rounded-l-xl">Nama &amp; Email</th>
                      <th className="py-3 px-4">Telepon</th>
                      <th className="py-3 px-4">Tier &amp; Poin</th>
                      <th className="py-3 px-4">Kendaraan</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center rounded-r-xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-gray-700">
                    {isLoadingCustomers ? (
                      <tr><td colSpan="6" className="py-8 text-center text-gray-500">Memuat data pelanggan...</td></tr>
                    ) : (() => {
                        const search = customerSearch.toLowerCase();
                        const visible = customerData.filter((cust) =>
                          cust.name.toLowerCase().includes(search) || cust.email.toLowerCase().includes(search) || cust.phone.toLowerCase().includes(search)
                        );
                        const total = visible.length;
                        const pages = Math.max(1, Math.ceil(total / CUSTOMER_PER_PAGE));
                        const page = Math.min(Math.max(1, customerPage), pages);
                        const start = (page - 1) * CUSTOMER_PER_PAGE;
                        const slice = visible.slice(start, start + CUSTOMER_PER_PAGE);
                        return (
                          <>
                            {slice.map((cust) => (
                              <tr key={cust.id} className="bg-white hover:bg-gray-50 transition-all shadow-sm rounded-xl border border-gray-100/50">
                        <td className="py-4 px-4 rounded-l-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center font-black text-gray-600">{cust.name.charAt(0)}</div>
                            <div>
                              <p className="font-black text-sm text-gray-800 cursor-pointer hover:text-[#9FA324]" onClick={() => navigate(`/members/${cust.id}`)}>{cust.name}</p>
                              <p className="text-[10px] text-gray-400">{cust.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold">{cust.phone}</td>
                        <td className="py-4 px-4">
                          <span className="inline-block font-black px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-100">{cust.levelMembership}</span>
                          <p className="text-[10px] text-gray-500 mt-1">Poin: <span className="font-bold">{cust.points}</span></p>
                        </td>
                        <td className="py-4 px-4 text-amber-600 font-bold text-[11px]">{cust.lastProduct}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cust.statusAktif === "Aktif" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{cust.statusAktif}</span>
                        </td>
                        <td className="py-4 px-4 rounded-r-xl">
                          <div className="flex items-center justify-center gap-2">
                            <button type="button" onClick={() => openEditMember(cust)} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 border border-blue-100" title="Edit"><FaEdit size={11} /></button>
                            {canDelete && (
                              <button type="button" onClick={() => handleDeleteMember(cust.id)} disabled={deletingMemberId === cust.id} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 border border-red-100 disabled:opacity-50" title="Hapus"><FaTrash size={11} /></button>
                            )}
                          </div>
                        </td>
                      </tr>
                          ))}
                          <tr>
                            <td colSpan="6" className="py-3">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div>Menampilkan {Math.min(total, start + 1)}-{Math.min(total, start + slice.length)} dari {total} pelanggan</div>
                                <div className="flex items-center gap-2">
                                  <button disabled={page <= 1} onClick={() => setCustomerPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded-xl border text-xs bg-white disabled:opacity-50">Prev</button>
                                  <span className="px-2">{`${page}/${pages}`}</span>
                                  <button disabled={page >= pages} onClick={() => setCustomerPage((p) => Math.min(pages, p + 1))} className="px-3 py-1 rounded-xl border text-xs bg-white disabled:opacity-50">Next</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: MANAGE PROMO */}
        {activeTab === "manage-promo" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            {/* FORM PROMO */}
            <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm h-fit">
              <div className="mb-4">
                <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-2"><FaTicketAlt className="text-[#DEE33E]" /> Buat Kode Promo Baru</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Tambah diskon baru ke Supabase.</p>
              </div>
              <form onSubmit={handleAddPromoSubmit} className="space-y-3">
                <input type="text" name="code" required placeholder="KODE PROMO" value={newPromo.code} onChange={handlePromoInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-mono focus:outline-none focus:border-black uppercase" />
                <input type="text" name="name" required placeholder="Nama Promo" value={newPromo.name} onChange={handlePromoInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" name="discount" required placeholder="Diskon (%, Rp)" value={newPromo.discount} onChange={handlePromoInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
                  <input type="date" name="expDate" required value={newPromo.expDate} onChange={handlePromoInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs text-gray-500 focus:outline-none focus:border-black" />
                </div>
                <select name="type" value={newPromo.type} onChange={handlePromoInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs text-gray-600 focus:outline-none cursor-pointer">
                  <option value="Kupon">Tipe Kupon</option>
                  <option value="Voucher">Tipe Voucher</option>
                  <option value="Harga Coret">Harga Coret</option>
                </select>
                <button type="submit" className="w-full h-10 bg-[#DEE33E] text-black font-black text-[10px] rounded-xl shadow-sm uppercase tracking-wider mt-2 hover:bg-opacity-90">Aktifkan Promo Baru</button>
                <button type="button" disabled={isSeedingPromos} onClick={async () => {
                  if (!window.confirm('Isi promo dummy ke Supabase?')) return;
                  setIsSeedingPromos(true);
                  try {
                    const samples = [
                      { code: 'WELCOME10', name: 'Diskon Pembukaan 10%', discount: '10%', type: 'Kupon', exp: '2026-12-31' },
                      { code: 'SERVICE50', name: 'Potongan Rp50.000 Service', discount: '50000', type: 'Harga Coret', exp: '2026-09-30' },
                      { code: 'OTW20', name: 'Diskon 20% untuk Member', discount: '20%', type: 'Kupon', exp: '2026-11-30' },
                    ];
                    for (const p of samples) {
                      const payload = {
                        nama_produk: p.name,
                        harga: parseFloat(p.discount) || 0,
                        stok: 0,
                        deskripsi: `${p.code} | ${p.type} | Exp: ${p.exp}`,
                      };
                      // eslint-disable-next-line no-await-in-loop
                      await customerAPI.createPromoRemote(payload);
                    }
                    alert('Selesai menambahkan promo dummy ke Supabase.');
                    fetchPromos();
                  } catch (err) {
                    console.error('Gagal menulis promo ke Supabase:', err);
                    alert('Gagal menambahkan promo. Pastikan Supabase tersedia.');
                  } finally {
                    setIsSeedingPromos(false);
                  }
                }} className="w-full h-10 mt-2 border border-gray-200 bg-white text-gray-700 font-bold text-[10px] rounded-xl shadow-sm uppercase tracking-wider hover:bg-gray-50 disabled:opacity-50">{isSeedingPromos ? 'Menambahkan...' : 'Isi Dummy Promo (Supabase)'}</button>
              </form>
            </div>

            {/* PROMO TABLE */}
            <div className="lg:col-span-2 bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm overflow-x-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Daftar Promo &amp; Diskon Aktif</h3>
                <button type="button" onClick={fetchPromos} className="text-[10px] px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100">Refresh</button>
              </div>
              {isLoadingPromos ? (
                <p className="text-center text-gray-500 py-8 text-xs">Memuat data promo...</p>
              ) : promoData.length === 0 ? (
                <p className="text-center text-gray-500 py-8 text-xs">Belum ada promo terdaftar.</p>
              ) : (
                <>
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                      <th className="pb-2 pl-2">Kode</th>
                      <th className="pb-2">Nama</th>
                      <th className="pb-2">Potongan</th>
                      <th className="pb-2">Berlaku S/D</th>
                      <th className="pb-2">Tipe</th>
                      <th className="pb-2 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-medium text-gray-700">
                    {(() => {
                      const total = promoData.length;
                      const pages = Math.max(1, Math.ceil(total / PROMO_PER_PAGE));
                      const page = Math.min(Math.max(1, promoPage), pages);
                      const start = (page - 1) * PROMO_PER_PAGE;
                      const slice = promoData.slice(start, start + PROMO_PER_PAGE);
                      return (
                        <>
                          {slice.map((promo) => (
                            <tr key={promo.id} className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl">
                        <td className="py-3 pl-3 font-mono font-bold text-blue-700 rounded-l-xl">{promo.code}</td>
                        <td className="py-3 font-black text-gray-800">{promo.name}</td>
                        <td className="py-3 font-extrabold text-red-500">{promo.discount}</td>
                        <td className="py-3 text-gray-500">{promo.expDate}</td>
                        <td className="py-3"><span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[9px] uppercase">{promo.type}</span></td>
                        <td className="py-3 rounded-r-xl">
                          <div className="flex items-center justify-center gap-2">
                            <button type="button" onClick={() => openEditPromo(promo)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 border border-blue-100" title="Edit"><FaEdit size={10} /></button>
                            {canDelete && (
                              <button type="button" onClick={() => handleDeletePromo(promo.id)} disabled={deletingPromoId === promo.id} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-100 disabled:opacity-50" title="Hapus"><FaTrash size={10} /></button>
                            )}
                          </div>
                        </td>
                      </tr>
                          ))}
                          <tr>
                            <td colSpan={6} className="py-3">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div>Menampilkan {Math.min(total, start + 1)}-{Math.min(total, start + slice.length)} dari {total} promo</div>
                                <div className="flex items-center gap-2">
                                  <button disabled={page <= 1} onClick={() => setPromoPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded-xl border text-xs bg-white disabled:opacity-50">Prev</button>
                                  <span className="px-2">{`${page}/${pages}`}</span>
                                  <button disabled={page >= pages} onClick={() => setPromoPage((p) => Math.min(pages, p + 1))} className="px-3 py-1 rounded-xl border text-xs bg-white disabled:opacity-50">Next</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })()}
                  </tbody>
                </table>
                </>
              )}
            </div>
          </div>
        )}
      </Container>

      {/* MODAL: TAMBAH CUSTOMER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-black"><FaTimes size={14} /></button>
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-1">Registrasi Pelanggan Baru</h4>
            <p className="text-xs text-gray-400 mb-5">Data akan tersimpan ke Supabase.</p>
            <form onSubmit={handleAddCustomerSubmit} className="space-y-4">
              <input type="text" name="name" required placeholder="Nama Lengkap" value={newCustomer.name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <input type="text" name="phone" required placeholder="Nomor WhatsApp" value={newCustomer.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <input type="email" name="email" required placeholder="Email" value={newCustomer.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <input type="text" name="address" placeholder="Alamat" value={newCustomer.address} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="unitMobil" required placeholder="Kendaraan" value={newCustomer.unitMobil} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
                <input type="text" name="platNomor" required placeholder="Plat Nomor" value={newCustomer.platNomor} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black uppercase" />
              </div>
              <input type="number" min="0" name="points" placeholder="Poin Loyalitas Awal" value={newCustomer.points} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <p className="text-[10px] text-gray-400 -mt-2">Tier otomatis berdasarkan poin: Regular(0), Bronze(100), Silver(250), Gold(500), Platinum(1000)</p>
              <button type="submit" className="w-full h-11 bg-black text-white font-black text-xs rounded-xl uppercase tracking-widest hover:bg-gray-800">Daftarkan &amp; Simpan</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT MEMBER */}
      {editMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] p-6 shadow-2xl relative">
            <button onClick={() => setEditMemberModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-black"><FaTimes size={14} /></button>
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-1">Edit Data Member</h4>
            <p className="text-xs text-gray-400 mb-5">Perubahan tersimpan ke Supabase.</p>
            <form onSubmit={handleEditMemberSubmit} className="space-y-4">
              <input type="text" required placeholder="Nama Lengkap" value={editMemberForm.fullName} onChange={(e) => setEditMemberForm({ ...editMemberForm, fullName: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <input type="email" placeholder="Email" value={editMemberForm.email} onChange={(e) => setEditMemberForm({ ...editMemberForm, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">Tier</label>
                <select value={editMemberForm.tier} onChange={(e) => setEditMemberForm({ ...editMemberForm, tier: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black">
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <button type="button" onClick={() => setEditMemberModal(null)} className="flex-1 px-4 py-2.5 text-xs text-gray-400 font-bold hover:text-gray-600">Batal</button>
                <button type="submit" disabled={isEditingMember} className="flex-1 bg-red-600 text-white font-bold py-2.5 text-xs rounded-xl hover:bg-red-700 disabled:opacity-50">{isEditingMember ? "Menyimpan..." : "Simpan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PROMO */}
      {editPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] p-6 shadow-2xl relative">
            <button onClick={() => setEditPromoModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-black"><FaTimes size={14} /></button>
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-1">Edit Promo</h4>
            <p className="text-xs text-gray-400 mb-5">Perubahan tersimpan ke Supabase.</p>
            <form onSubmit={handleEditPromoSubmit} className="space-y-4">
              <input type="text" required placeholder="Kode Promo" value={editPromoForm.code} onChange={(e) => setEditPromoForm({ ...editPromoForm, code: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-mono focus:outline-none focus:border-black uppercase" />
              <input type="text" required placeholder="Nama Promo" value={editPromoForm.name} onChange={(e) => setEditPromoForm({ ...editPromoForm, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" required placeholder="Diskon" value={editPromoForm.discount} onChange={(e) => setEditPromoForm({ ...editPromoForm, discount: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
                <input type="date" value={editPromoForm.expDate} onChange={(e) => setEditPromoForm({ ...editPromoForm, expDate: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs text-gray-500 focus:outline-none focus:border-black" />
              </div>
              <select value={editPromoForm.type} onChange={(e) => setEditPromoForm({ ...editPromoForm, type: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs text-gray-600 focus:outline-none cursor-pointer">
                <option value="Kupon">Kupon</option>
                <option value="Voucher">Voucher</option>
                <option value="Harga Coret">Harga Coret</option>
              </select>
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <button type="button" onClick={() => setEditPromoModal(null)} className="flex-1 px-4 py-2.5 text-xs text-gray-400 font-bold hover:text-gray-600">Batal</button>
                <button type="submit" disabled={isEditingPromo} className="flex-1 bg-[#DEE33E] text-black font-bold py-2.5 text-xs rounded-xl hover:bg-[#c2c72f] disabled:opacity-50">{isEditingPromo ? "Menyimpan..." : "Simpan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
