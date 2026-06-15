import { useState } from "react";
import { FaSearch, FaFilter, FaPlus, FaTimes, FaUserFriends, FaCalendarCheck, FaExclamationTriangle, FaBullhorn, FaEnvelope, FaWhatsapp, FaTicketAlt } from "react-icons/fa";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const navigate = useNavigate();

  // 1. State Menu Tab Aktif (Default ke list data Customer Utama)
  const [activeTab, setActiveTab] = useState("customer-list");

  // 2. State Modal Tambah Customer Walk-In
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "", phone: "", email: "", address: "", levelMembership: "Regular Member", unitMobil: "", platNomor: ""
  });

  // 3. State Form Tambah Diskon/Promo Baru oleh Admin
  const [newPromo, setNewPromo] = useState({ code: "", name: "", discount: "", expDate: "", type: "Kupon" });

  // 4. State Teks Broadcast CRM Automation
  const [broadcastMessage, setBroadcastMessage] = useState(
    "Halo Pelanggan Setia BengkelGo Mobil! Nikmati diskon spesial 25% untuk layanan Spooring, Balancing, dan General Check-Up khusus minggu ini. Yuk booking antrean Anda sekarang!"
  );

  // 5. DATA TABEL 1: MASTER REKAP DATA PELANGGAN & MOBIL
  const [customerData, setCustomerData] = useState([
    { 
      id: "BG-MOB-001", name: "Ahmad Subarjo", username: "ahmad_barjo", gender: "Laki-laki",
      birthDate: "14 Mei 1998", phone: "081234567890", email: "ahmadsubarjo@gmail.com", 
      address: "Jl. Sudirman No. 45", location: "Pekanbaru, Riau", socialMedia: "@ahmad.barjo",
      regDate: "12 Jan 2025", levelMembership: "Platinum Member", statusAktif: "Aktif",
      interactionChat: "Tanya stok Oli Shell Helix Ultra", complaint: "Tidak ada", ticketHelp: "#TK-8821 (Closed)",
      feedback: "Spooring balancing-nya presisi banget!", lastLogin: "15 Juni 2026 14:25", device: "Samsung Galaxy A35",
      loginLocation: "Pekanbaru Kota", appActivity: "Cek Biaya Service AC", duration: "12 Menit",
      userSource: "Instagram Ads", campaign: "Promo Mudik Nyaman", giveaway: "Tidak Ikut",
      promoStatus: "Kupon Diskon 20% Terpakai", spent: "Rp 4.850.000", paymentMethod: "QRIS BRK",
      lastProduct: "Toyota Avanza - BM 1234 NQ (Ganti Oli & Filter)", lastTxDate: "15 Juni 2026"
    },
    { 
      id: "BG-MOB-002", name: "Rian Hidayat", username: "rian_hdayat", gender: "Laki-laki",
      birthDate: "22 Nov 2001", phone: "085298765432", email: "rianhidayat@gmail.com", 
      address: "Jl. Tuanku Tambusai No. 12", location: "Siak, Riau", socialMedia: "@rian.hdayat",
      regDate: "20 Feb 2025", levelMembership: "Gold Member", statusAktif: "Aktif",
      interactionChat: "Tanya harga Kampas Rem Depan", complaint: "Rem bunyi berdecit", ticketHelp: "#TK-8901 (Resolved)",
      feedback: "Mekanik ramah dan edukatif", lastLogin: "14 Juni 2026 09:15", device: "Apple iPhone 14",
      loginLocation: "Kecamatan Siak", appActivity: "Booking Antrean Montir", duration: "8 Menit",
      userSource: "Rekomendasi Teman", campaign: "Perawatan Rutin", giveaway: "Ikut (Undian Ban Mobil)",
      promoStatus: "Tidak Ada Promo", spent: "Rp 1.245.000", paymentMethod: "Transfer Bank",
      lastProduct: "Honda Jazz - BM 8891 AA (Ganti Kampas Rem)", lastTxDate: "14 Juni 2026"
    }
  ]);

  // DATA TABEL 2: LOG LOGISTIK DATA BOOKING ANTREAN MASUK
  const [bookingLogData] = useState([
    { id: "BK-MOB-901", nama: "Ahmad Subarjo", mobil: "Toyota Avanza (BM 1234 NQ)", tglJadwal: "18 Juni 2026 10:00", paket: "Ganti Oli Premium", status: "Terjadwal" },
    { id: "BK-MOB-902", nama: "Rian Hidayat", mobil: "Honda Jazz (BM 8891 AA)", tglJadwal: "14 Juni 2026 13:30", paket: "Spooring Precision", status: "Selesai" }
  ]);

  // DATA TABEL 3: LOG DATA TIKET KOMPLAIN MASUK
  const [complaintLogData] = useState([
    { id: "TK-COMP-55", nama: "Rian Hidayat", kategori: "Hasil Kerja Mekanik", isi: "Rem depan berdecit kasar pasca ganti part", tglLapor: "14 Juni 2026", status: "Resolved" },
    { id: "TK-COMP-56", nama: "Siti Aminah", kategori: "Pelayanan Staff", isi: "Ruang tunggu AC-nya kurang berasa dingin", tglLapor: "15 Juni 2026", status: "Open" }
  ]);

  // DATA TABEL 4: DATA MASTER DISKON & PROMO YANG DIKELOLA ADMIN
  const [promoData, setPromoData] = useState([
    { id: "PRM-001", code: "BENGKELGOMUDIK", name: "Diskon Mudik Nyaman Shell", discount: "20%", expDate: "2026-06-30", type: "Kupon" },
    { id: "PRM-002", code: "SPOORINGFREE", name: "Potongan Member Baru Spooring", discount: "Rp 50.000", expDate: "2026-07-10", type: "Voucher" }
  ]);

  // Handlers Input Change
  const handleInputChange = (e) => setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  const handlePromoInputChange = (e) => setNewPromo({ ...newPromo, [e.target.name]: e.target.value });
  
  const handleBroadcast = (channel) => alert(`📢 [CRM AUTOMATION] Berhasil mengirimkan broadcast via ${channel.toUpperCase()} ke semua member!`);

  // Submit Tambah Customer Baru (Walk-In)
  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    const idBaru = `BG-MOB-00${customerData.length + 1}`;
    const tanggalHariIni = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "Short", year: "numeric" });

    const customerBaruData = {
      id: idBaru, name: newCustomer.name, username: newCustomer.name.toLowerCase().replace(/\s+/g, "_"),
      gender: "Laki-laki", birthDate: "-", phone: newCustomer.phone, email: newCustomer.email,
      address: newCustomer.address, location: "Pekanbaru, Riau", socialMedia: "-", regDate: tanggalHariIni,
      levelMembership: newCustomer.levelMembership, statusAktif: "Aktif", interactionChat: "Entri manual kasir",
      complaint: "Tidak ada", ticketHelp: "-", feedback: "-", lastLogin: "-", device: "-", loginLocation: "-",
      appActivity: "-", duration: "-", userSource: "Walk-In", campaign: "-", giveaway: "Tidak Ikut",
      promoStatus: "Tidak Ada Promo", spent: "Rp 0", paymentMethod: "-",
      lastProduct: `${newCustomer.unitMobil} - ${newCustomer.platNomor}`, lastTxDate: tanggalHariIni
    };

    setCustomerData([...customerData, customerBaruData]);
    setNewCustomer({ name: "", phone: "", email: "", address: "", levelMembership: "Regular Member", unitMobil: "", platNomor: "" });
    setIsModalOpen(false);
    alert("Pelanggan baru berhasil tersimpan ke baris database!");
  };

  // Submit Tambah Diskon/Promo Baru oleh Admin
  const handleAddPromoSubmit = (e) => {
    e.preventDefault();
    const idPromoBaru = `PRM-00${promoData.length + 1}`;
    const promoBaruData = {
      id: idPromoBaru,
      code: newPromo.code.toUpperCase().replace(/\s+/g, ""),
      name: newPromo.name,
      discount: newPromo.discount,
      expDate: newPromo.expDate,
      type: newPromo.type
    };

    setPromoData([...promoData, promoBaruData]);
    setNewPromo({ code: "", name: "", discount: "", expDate: "", type: "Kupon" });
    alert("📢 Sukses! Kode Diskon & Voucher Promo Baru Berhasil Diaktifkan di Sistem Admin!");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12 p-6">
      <Container>
        <PageHeader title="Manajemen &amp; CRM Pelanggan" breadcrumb="Dashboard / CRM Terpadu" />

        {/* BARIS TOMBOL NAVIGASI TAB SUB-MENU */}
        <div className="flex flex-wrap gap-2 mt-8 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab("customer-list")}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "customer-list" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FaUserFriends /> Data Customer
          </button>
          <button
            onClick={() => setActiveTab("booking-log")}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "booking-log" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FaCalendarCheck /> Log Booking Antrean
          </button>
          <button
            onClick={() => setActiveTab("complaint-log")}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "complaint-log" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FaExclamationTriangle /> Log Komplain Aduan
          </button>
          <button
            onClick={() => setActiveTab("manage-promo")}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "manage-promo" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FaTicketAlt /> Kelola Diskon &amp; Promo
          </button>
        </div>

        {/* SUB-MENU TABEL 1: MASTER DATA PELANGGAN UTAMA ADMIN */}
        {activeTab === "customer-list" && (
          <div className="space-y-6 mt-4 animate-fade-in">
            {/* PANEL CRM AUTOMATION HUB */}
            <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#DEE33E]/20 rounded-lg"><FaBullhorn className="text-gray-800" size={14} /></div>
                <div>
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">CRM Automation &amp; Broadcast Hub</h4>
                  <p className="text-[11px] text-gray-400">Kirim pemberitahuan massal otomatis ke pelanggan terdata berdasarkan preferensi kontak.</p>
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

            {/* TABEL MASTER PELANGGAN */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-50 pb-6">
                <div>
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Lembar Basis Data Hubungan Pelanggan</h3>
                  <p className="text-xs text-gray-400 mt-1">Daftar rekam medis operasional kendaraan unit mobil BengkelGo.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input type="text" placeholder="Cari nama, plat mobil, device..." className="w-full bg-gray-50 text-gray-700 text-xs rounded-xl py-2.5 pl-10 pr-4 focus:outline-none border border-gray-200 focus:border-[#DEE33E]" />
                  </div>
                  <button className="border border-gray-200 text-gray-600 p-2.5 rounded-xl text-xs bg-gray-50"><FaFilter /></button>
                  <button onClick={() => setIsModalOpen(true)} className="bg-black hover:bg-gray-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 uppercase tracking-wider"><FaPlus size={10} /> Tambah Customer</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-4 min-w-[1350px]">
                  <thead>
                    <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wider bg-gray-50/50">
                      <th className="py-3 px-4 rounded-l-xl">Identitas &amp; Akun</th>
                      <th className="py-3 px-4">Kontak &amp; Alamat</th>
                      <th className="py-3 px-4">Membership Tier</th>
                      <th className="py-3 px-4">Interaksi &amp; Keluhan</th>
                      <th className="py-3 px-4">Aktivitas &amp; Device</th>
                      <th className="py-3 px-4">Sumber Marketing</th>
                      <th className="py-3 px-4 text-right rounded-r-xl pr-6">Unit Mobil &amp; Transaksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-gray-700">
                    {customerData.map((cust) => (
                      /* FIX UTAMA: Menambahkan navigasi detail baris onClick dan style hover pointer */
                      <tr 
                        key={cust.id} 
                        onClick={() => navigate(`/members/${cust.id}`)}
                        className="bg-white hover:bg-gray-50 hover:scale-[1.002] cursor-pointer transition-all duration-200 shadow-sm rounded-xl border border-gray-100/50"
                      >
                        <td className="py-4 px-4 font-bold rounded-l-xl border-l border-y border-gray-100/40">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center font-black text-gray-600 shadow-inner">{cust.name.charAt(0)}</div>
                            <div>
                              <p className="font-black text-sm text-gray-800 leading-none mb-1">{cust.name}</p>
                              <p className="text-[10px] text-gray-400">@{cust.username}</p>
                              <p className="text-[9px] text-amber-600 font-mono mt-0.5">{cust.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 border-y border-gray-100/40">
                          <p className="font-extrabold text-gray-700">{cust.phone}</p>
                          <p className="text-[10px] text-gray-500">{cust.address}</p>
                        </td>
                        <td className="py-4 px-4 border-y border-gray-100/40">
                          <span className="inline-block font-black px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-100">{cust.levelMembership}</span>
                        </td>
                        <td className="py-4 px-4 border-y border-gray-100/40 max-w-[200px]">
                          <p className="text-[10px] text-gray-600 font-semibold truncate">💬 {cust.interactionChat}</p>
                          <p className="text-[10px] font-bold mt-1 text-red-500">⚠️ Komplain: {cust.complaint}</p>
                        </td>
                        <td className="py-4 px-4 border-y border-gray-100/40">
                          <p className="font-bold text-gray-700">Masuk: {cust.lastLogin}</p>
                          <p className="text-[10px] text-gray-400">📱 {cust.device}</p>
                        </td>
                        <td className="py-4 px-4 border-y border-gray-100/40">
                          <p className="font-bold text-blue-600">Sumber: {cust.userSource}</p>
                        </td>
                        <td className="py-4 px-4 text-right pr-6 rounded-r-xl border-r border-y border-gray-100/40">
                          <p className="font-black text-gray-900 text-sm">{cust.spent}</p>
                          <p className="text-[10px] text-amber-600 font-bold truncate">🚗 {cust.lastProduct}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MENU TABEL 2: REKAP ANTREAN BOOKING DATA MASUK */}
        {activeTab === "booking-log" && (
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm mt-4 animate-fade-in">
            <div className="mb-6 border-b border-gray-50 pb-4">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Log Logistik Antrean Booking Mobil</h3>
              <p className="text-xs text-gray-400 mt-1">Daftar manifest pemesanan jadwal servis mekanik dari portal luar.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2 min-w-[700px]">
                <thead>
                  <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wider bg-gray-50/50">
                    <th className="py-2.5 px-4 rounded-l-xl">ID Booking</th>
                    <th className="py-2.5 px-4">Nama Pelanggan</th>
                    <th className="py-2.5 px-4">Unit Mobil &amp; Plat</th>
                    <th className="py-2.5 px-4">Rencana Kedatangan</th>
                    <th className="py-2.5 px-4">Paket Servis</th>
                    <th className="py-2.5 px-4 rounded-r-xl pr-4">Status Operational</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {bookingLogData.map((b) => (
                    <tr key={b.id} className="bg-gray-50/50 hover:bg-gray-50 rounded-lg">
                      <td className="py-3 px-4 font-mono font-bold text-amber-700 rounded-l-xl">{b.id}</td>
                      <td className="py-3 px-4 font-black text-gray-800">{b.nama}</td>
                      <td className="py-3 px-4 font-medium text-gray-600">{b.mobil}</td>
                      <td className="py-3 px-4 text-gray-500 font-semibold">{b.tglJadwal}</td>
                      <td className="py-3 px-4 font-bold text-slate-700">{b.paket}</td>
                      <td className="py-3 px-4 rounded-r-xl pr-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status === "Selesai" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-MENU TABEL 3: REKAP ADUAN KOMPLAIN TIKET MASUK */}
        {activeTab === "complaint-log" && (
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm mt-4 animate-fade-in">
            <div className="mb-6 border-b border-gray-50 pb-4">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Log Tiket Resolusi Komplain</h3>
              <p className="text-xs text-gray-400 mt-1">Daftar keluhan masuk pasca-login untuk segera diselesaikan oleh layanan pelanggan.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2 min-w-[700px]">
                <thead>
                  <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wider bg-gray-50/50">
                    <th className="py-2.5 px-4 rounded-l-xl">ID Tiket</th>
                    <th className="py-2.5 px-4">Nama Pelanggan</th>
                    <th className="py-2.5 px-4">Kategori Kendala</th>
                    <th className="py-2.5 px-4">Isi Kronologi Aduan</th>
                    <th className="py-2.5 px-4">Tanggal Masuk</th>
                    <th className="py-2.5 px-4 rounded-r-xl pr-4">Status Resolusi</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {complaintLogData.map((c) => (
                    <tr key={c.id} className="bg-gray-50/50 hover:bg-gray-50 rounded-lg">
                      <td className="py-3 px-4 font-mono font-bold text-gray-500 rounded-l-xl">{c.id}</td>
                      <td className="py-3 px-4 font-black text-gray-800">{c.nama}</td>
                      <td className="py-3 px-4 text-amber-700 font-bold">{c.kategori}</td>
                      <td className="py-3 px-4 text-gray-600 max-w-[250px] truncate">"{c.isi}"</td>
                      <td className="py-3 px-4 text-gray-400 font-medium">{c.tglLapor}</td>
                      <td className="py-3 px-4 rounded-r-xl pr-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.status === "Resolved" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-MENU TABEL 4: KELOLA DISKON & VOUCHER PROMO */}
        {activeTab === "manage-promo" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 animate-fade-in">
            {/* SISI KIRI: FORM INPUT PROMO BARU */}
            <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm h-fit">
              <div className="mb-4">
                <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                  <FaTicketAlt className="text-[#DEE33E]" /> Buat Kode Promo Baru
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Tambah data diskon atau harga coret ke sistem database.</p>
              </div>
              <form onSubmit={handleAddPromoSubmit} className="space-y-3">
                <input 
                  type="text" name="code" required placeholder="KODE PROMO (Contoh: BENGKELGOMERDEKA)" 
                  value={newPromo.code} onChange={handlePromoInputChange} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-mono focus:outline-none focus:border-black uppercase" 
                />
                <input 
                  type="text" name="name" required placeholder="Nama Promo (Contoh: Diskon Ganti Oli)" 
                  value={newPromo.name} onChange={handlePromoInputChange} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" 
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" name="discount" required placeholder="Besar Diskon (%, Rp)" 
                    value={newPromo.discount} onChange={handlePromoInputChange} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" 
                  />
                  <input 
                    type="date" name="expDate" required 
                    value={newPromo.expDate} onChange={handlePromoInputChange} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs text-gray-500 focus:outline-none focus:border-black" 
                  />
                </div>
                <select 
                  name="type" value={newPromo.type} onChange={handlePromoInputChange} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs text-gray-600 focus:outline-none cursor-pointer"
                >
                  <option value="Kupon">Tipe Kupon</option>
                  <option value="Voucher">Tipe Voucher</option>
                  <option value="Harga Coret">Harga Coret Khusus</option>
                </select>
                <button type="submit" className="w-full h-10 bg-[#DEE33E] text-black font-black text-[10px] rounded-xl shadow-sm uppercase tracking-wider mt-2 hover:bg-opacity-90 transition-all">
                  Aktifkan Promo Baru
                </button>
              </form>
            </div>

            {/* SISI KANAN: TABEL LIST VOUCHER/DISKON YANG AKTIF */}
            <div className="lg:col-span-2 bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm overflow-x-auto">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4">Tabel Manifest Promo &amp; Diskon</h3>
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                    <th className="pb-2 pl-2">Kode</th>
                    <th className="pb-2">Nama Program</th>
                    <th className="pb-2">Potongan</th>
                    <th className="pb-2">Berlaku S/D</th>
                    <th className="pb-2 text-right pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium text-gray-700">
                  {promoData.map((promo) => (
                    <tr key={promo.id} className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl">
                      <td className="py-3 pl-3 font-mono font-bold text-blue-700 rounded-l-xl">{promo.code}</td>
                      <td className="py-3 font-black text-gray-800">{promo.name}</td>
                      <td className="py-3 font-extrabold text-red-500">{promo.discount}</td>
                      <td className="py-3 text-gray-500">{promo.expDate}</td>
                      <td className="py-3 text-right pr-3 rounded-r-xl">
                        <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-tighter">Aktif</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </Container>

      {/* POP-UP FORM MODAL: TAMBAH PELANGGAN BARU (WALK-IN) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] p-6 shadow-2xl relative animate-fade-in">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors">
              <FaTimes size={14} />
            </button>
            <div className="mb-6">
              <h4 className="text-sm font-black text-gray-800 uppercase tracking-wider">Registrasi Pelanggan Manual</h4>
              <p className="text-xs text-gray-400 mt-0.5">Entri data profil dan kendaraan pelanggan walk-in oleh Kasir.</p>
            </div>
            <form onSubmit={handleAddCustomerSubmit} className="space-y-4">
              <input type="text" name="name" required placeholder="Nama Lengkap Pemilik" value={newCustomer.name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <input type="text" name="phone" required placeholder="Nomor WhatsApp (Aktif)" value={newCustomer.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <input type="email" name="email" required placeholder="Alamat Email" value={newCustomer.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="unitMobil" required placeholder="Tipe Mobil (Avanza/Jazz)" value={newCustomer.unitMobil} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
                <input type="text" name="platNomor" required placeholder="Plat Nomor (BM XXXX AA)" value={newCustomer.platNomor} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-black" />
              </div>
              <select name="levelMembership" value={newCustomer.levelMembership} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs text-gray-600 focus:outline-none">
                <option value="Regular Member">Regular Member</option>
                <option value="Gold Member">Gold Member</option>
                <option value="Platinum Member">Platinum Member</option>
              </select>
              <button type="submit" className="w-full h-11 bg-black text-white font-black text-xs rounded-xl shadow-sm uppercase tracking-widest mt-2 hover:bg-gray-800 transition-all">
                Daftarkan &amp; Simpan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}