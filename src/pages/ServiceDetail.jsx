import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaMapMarkerAlt, FaHistory, FaTag, FaLaptop, FaBullhorn, FaArrowLeft } from "react-icons/fa";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data lengkap yang mencakup seluruh poin kategori dari instruksi dosen
  const customerDetail = {
    id: id || "BG-001",
    // 1. Data Identitas Customer
    name: "Ahmad Subarjo",
    username: "ahmad_barjo",
    gender: "Laki-laki",
    birthDate: "14 Mei 1998",
    profileImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    
    // 2. Kontak
    phone: "081234567890",
    email: "ahmadsubarjo@gmail.com",
    address: "Jl. Jenderal Sudirman No. 45, Marpoyan Damai",
    location: "Pekanbaru, Riau",
    socialMedia: "@ahmad.barjo (Instagram)",
    
    // 3. Data Akun / Membership
    regDate: "12 Januari 2025",
    memberStatus: "Aktif",
    levelMembership: "Premium Member",
    referralCode: "BGO-BARJO98",
    statusAktif: "Aktif",
    
    // 4. Riwayat Interaksi
    chatService: "Konsultasi penggantian v-belt kit grand premium",
    complaintHistory: "Akselerasi awal agak tersendat pada putaran gas rendah",
    ticketHelp: "#TK-8821 (Status: Selesai)",
    feedback: "Mekanik sangat teliti, ruang tunggu bersih dan nyaman",
    adminNote: "Motor Honda Vario 160cc, disarankan servis CVT rutin tiap 3 bulan",
    
    // 5. Data Transaksi
    purchaseHistory: "Servis Ringan Paket Lengkap + Pembersihan Injektor",
    spent: "Rp 3.450.000",
    paymentMethod: "QRIS - Bank Riau Kepri",
    lastProduct: "Oli Mesin Matic 1L & Kampas Rem Depan",
    lastTxDate: "02 Juni 2026",
    
    // 6. Aktivitas User
    lastLogin: "02 Juni 2026 14:25 WIB",
    device: "Samsung Galaxy A35 5G",
    loginLocation: "Kecamatan Bukit Raya",
    appActivity: "Mengecek Estimasi Biaya Nota Perbaikan",
    duration: "12 Menit Kunjungan Aplikasi",
    
    // 7. Marketing & Engagement
    userSource: "Instagram Ads (Iklan Digital)",
    campaign: "Promo Servis Awal Tahun BengkelGo",
    giveaway: "Pernah Ikut (Undian Jaket Eksklusif)",
    subscription: "Aktif (Email & SMS Berlangganan)",
    promoStatus: "Kupon Diskon Potongan Rp 25.000 Berhasil Digunakan"
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12">
      <div className="max-w-5xl mx-auto px-4 pt-4">
        
        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm"
        >
          <FaArrowLeft className="text-[10px]" /> Kembali ke Daftar Pelanggan
        </button>

        {/* Kotak Utama Putih Bersih */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm space-y-8">
          
          {/* Bagian Atas / Profil Utama */}
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center border-b border-gray-50 pb-6">
            <div className="flex items-center gap-4">
              <img src={customerDetail.profileImg} alt="Profil" className="w-16 h-16 rounded-full border-2 border-[#DEE33E] object-cover p-0.5 shadow-sm" />
              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Lembar Rekam Medis Unit</span>
                <h1 className="text-xl font-black text-gray-800 tracking-tight">{customerDetail.name}</h1>
                <p className="text-xs text-gray-400 font-medium">@{customerDetail.username} • ID: <span className="font-mono font-bold text-gray-700">{customerDetail.id}</span></p>
              </div>
            </div>
            <span className="bg-[#DEE33E]/10 text-black border border-[#DEE33E]/30 font-black text-xs px-4 py-2 rounded-xl">
              {customerDetail.levelMembership}
            </span>
          </div>

          {/* Grid Konten 2 Kolom Pembagian Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* KOLOM KIRI */}
            <div className="space-y-6">
              {/* Kategori 1 & 2: Identitas & Kontak */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2"><FaUser /> Profil &amp; Kontak</h3>
                <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100/50 space-y-2.5 text-xs text-gray-600">
                  <p><span className="text-gray-400 font-medium">Jenis Kelamin:</span> <span className="font-bold text-gray-800">{customerDetail.gender}</span></p>
                  <p><span className="text-gray-400 font-medium">Tanggal Lahir:</span> <span className="font-bold text-gray-800">{customerDetail.birthDate}</span></p>
                  <p><span className="text-gray-400 font-medium">Nomor HP:</span> <span className="font-bold text-gray-800">{customerDetail.phone}</span></p>
                  <p><span className="text-gray-400 font-medium">Email:</span> <span className="font-bold text-gray-800">{customerDetail.email}</span></p>
                  <p><span className="text-gray-400 font-medium">Media Sosial:</span> <span className="font-bold text-blue-600">{customerDetail.socialMedia}</span></p>
                </div>
              </div>

              {/* Kategori 3: Alamat & Geografis */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2"><FaMapMarkerAlt /> Domisili Geografis</h3>
                <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100/50 space-y-2.5 text-xs text-gray-600">
                  <p><span className="text-gray-400 font-medium">Alamat Rumah:</span> <span className="font-bold text-gray-800">{customerDetail.address}</span></p>
                  <p><span className="text-gray-400 font-medium">Kota / Provinsi:</span> <span className="font-bold text-gray-800">{customerDetail.location}</span></p>
                  <p><span className="text-gray-400 font-medium">Wilayah Daftar:</span> <span className="font-bold text-gray-800">Politeknik Caltex Riau Area</span></p>
                </div>
              </div>

              {/* Kategori 4: Akun & Keanggotaan */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2"><FaTag /> Akun &amp; Kode Referral</h3>
                <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100/50 space-y-2.5 text-xs text-gray-600">
                  <p><span className="text-gray-400 font-medium">Tanggal Registrasi:</span> <span className="font-bold text-gray-800">{customerDetail.regDate}</span></p>
                  <p><span className="text-gray-400 font-medium">Status Member:</span> <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-100">{customerDetail.memberStatus}</span></p>
                  <p><span className="text-gray-400 font-medium">Status Aktif Aplikasi:</span> <span className="font-bold text-gray-800">{customerDetail.statusAktif}</span></p>
                  <p><span className="text-gray-400 font-medium">Kode Kupon Referral:</span> <span className="font-mono font-bold text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200">{customerDetail.referralCode}</span></p>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN */}
            <div className="space-y-6">
              {/* Kategori 5: Riwayat Interaksi & Komplain */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2"><FaHistory /> Riwayat Keluhan &amp; Interaksi</h3>
                <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100/50 space-y-2.5 text-xs text-gray-600">
                  <p><span className="text-gray-400 font-medium">Pesan Terakhir Chat:</span> <span className="font-semibold text-gray-800">" {customerDetail.chatService} "</span></p>
                  <p><span className="text-gray-400 font-medium">Riwayat Komplain:</span> <span className="font-bold text-red-500">{customerDetail.complaintHistory}</span></p>
                  <p><span className="text-gray-400 font-medium">Tiket Bantuan Masuk:</span> <span className="font-mono font-bold text-gray-700">{customerDetail.ticketHelp}</span></p>
                  <p><span className="text-gray-400 font-medium">Ulasan Balasan (Feedback):</span> <span className="italic text-gray-600">" {customerDetail.feedback} "</span></p>
                  <p><span className="text-gray-400 font-medium">Catatan Admin Kasir:</span> <span className="font-bold text-amber-700">{customerDetail.adminNote}</span></p>
                </div>
              </div>

              {/* Kategori 6: Aktivitas User & Device */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2"><FaLaptop /> Log Aktivitas Aplikasi</h3>
                <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100/50 space-y-2.5 text-xs text-gray-600">
                  <p><span className="text-gray-400 font-medium">Kunjungan Terakhir:</span> <span className="font-bold text-gray-800">{customerDetail.lastLogin}</span></p>
                  <p><span className="text-gray-400 font-medium">Device Gawai:</span> <span className="font-bold text-gray-800">{customerDetail.device}</span></p>
                  <p><span className="text-gray-400 font-medium">Lokasi Koordinat Login:</span> <span className="font-bold text-gray-800">{customerDetail.loginLocation}</span></p>
                  <p><span className="text-gray-400 font-medium">Aktivitas Terakhir:</span> <span className="font-bold text-gray-800">{customerDetail.appActivity}</span></p>
                  <p><span className="text-gray-400 font-medium">Durasi Penggunaan:</span> <span className="font-bold text-gray-800">{customerDetail.duration}</span></p>
                </div>
              </div>

              {/* Kategori 7: Marketing & Engagement */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2"><FaPaperPlane /> Saluran Promosi Marketing</h3>
                <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100/50 space-y-2.5 text-xs text-gray-600">
                  <p><span className="text-gray-400 font-medium">Sumber Awal User:</span> <span className="font-bold text-blue-600">{customerDetail.userSource}</span></p>
                  <p><span className="text-gray-400 font-medium">Campaign yang Diikuti:</span> <span className="font-bold text-gray-800">{customerDetail.campaign}</span></p>
                  <p><span className="text-gray-400 font-medium">Giveaway Participation:</span> <span className="font-bold text-gray-800">{customerDetail.giveaway}</span></p>
                  <p><span className="text-gray-400 font-medium">SMS/Email Langganan:</span> <span className="font-bold text-gray-800">{customerDetail.subscription}</span></p>
                  <p><span className="text-gray-400 font-medium">Status Penggunaan Promo:</span> <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">{customerDetail.promoStatus}</span></p>
                </div>
              </div>
            </div>

          </div>

          {/* Bagian Bawah / Banner Nota Transaksi Terakhir */}
          <div className="pt-6 border-t border-gray-50">
            <div className="flex justify-between items-center bg-[#DEE33E] p-5 rounded-2xl shadow-sm shadow-[#DEE33E]/10">
              <div className="text-black">
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-60">Total Akumulasi Pembelian Nota</span>
                <p className="text-xs font-semibold mt-0.5">Produk terakhir: <span className="font-bold">{customerDetail.lastProduct}</span> ({customerDetail.lastTxDate})</p>
                <p className="text-[10px] opacity-75 font-medium">Metode Bayar: {customerDetail.paymentMethod}</p>
              </div>
              <span className="text-xl font-black text-black tracking-tight">
                {customerDetail.spent}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}