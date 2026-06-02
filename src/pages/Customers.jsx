import { useState } from "react";
import { FaSearch, FaDownload, FaFilter, FaEye, FaWrench } from "react-icons/fa";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";

export default function Customers() {
  const [customerData, setCustomerData] = useState([
    { 
      id: "BG-001", 
      name: "Ahmad Subarjo", 
      username: "ahmad_barjo",
      gender: "Laki-laki",
      birthDate: "14 Mei 1998",
      phone: "081234567890", 
      email: "ahmadsubarjo@gmail.com", 
      address: "Jl. Sudirman No. 45",
      location: "Pekanbaru, Riau", 
      socialMedia: "@ahmad.barjo",
      regDate: "12 Jan 2025",
      memberStatus: "Aktif",
      levelMembership: "Premium Member", 
      referralCode: "BGO-BARJO98",
      statusAktif: "Aktif",
      interactionChat: "Tanya stok oli MPX2",
      complaint: "Tidak ada",
      ticketHelp: "#TK-8821 (Closed)",
      feedback: "Pelayanan cepat, mantap!",
      adminNote: "Pelanggan setia, motor Vario v22",
      purchaseHistory: "Ganti Oli, Kampas Rem",
      spent: "Rp 3.450.000",
      paymentMethod: "QRIS Bank Riau Kepri",
      lastProduct: "Oli Mesin Matic 1L",
      lastTxDate: "02 Juni 2026",
      lastLogin: "02 Juni 2026 14:25",
      device: "Samsung Galaxy A54",
      loginLocation: "Pekanbaru Kota",
      appActivity: "Cek Estimasi Biaya Servis",
      duration: "12 Menit",
      userSource: "Instagram Ads",
      campaign: "Promo Awal Tahun",
      giveaway: "Tidak Ikut",
      subscription: "Ya (Email & SMS)",
      promoStatus: "Kupon Diskon 10% Terpakai"
    },
    { 
      id: "BG-002", 
      name: "Rian Hidayat", 
      username: "rian_hdayat",
      gender: "Laki-laki",
      birthDate: "22 Nov 2001",
      phone: "085298765432", 
      email: "rianhidayat@gmail.com", 
      address: "Jl. Tuanku Tambusai No. 12",
      location: "Siak, Riau", 
      socialMedia: "@rian.hdayat",
      regDate: "20 Feb 2025",
      memberStatus: "Aktif",
      levelMembership: "Regular Member", 
      referralCode: "BGO-RIAN01",
      statusAktif: "Aktif",
      interactionChat: "Tanya harga v-belt kit",
      complaint: "CVT bunyi berdecit",
      ticketHelp: "#TK-8901 (Resolved)",
      feedback: "Tarikan motor jadi enteng",
      adminNote: "Perlu cek berkala bagian CVT",
      purchaseHistory: "Service CVT, Roler",
      spent: "Rp 245.000",
      paymentMethod: "Tunai / Cash",
      lastProduct: "V-Belt Kit Grand Premium",
      lastTxDate: "01 Juni 2026",
      lastLogin: "01 Juni 2026 09:15",
      device: "Apple iPhone 13",
      loginLocation: "Kecamatan Siak",
      appActivity: "Booking Antrean Montir",
      duration: "8 Menit",
      userSource: "Rekomendasi Teman",
      campaign: "Ganti Oli Rutin",
      giveaway: "Ikut (Undian Ban)",
      subscription: "Ya (WhatsApp)",
      promoStatus: "Tidak Ada Promo"
    },
    { 
      id: "BG-003", 
      name: "Siti Aminah", 
      username: "siti_aminah",
      gender: "Perempuan",
      birthDate: "05 Mar 1995",
      phone: "082344556677", 
      email: "sitiaminah@gmail.com", 
      address: "Jl. Bangkinang No. 8",
      location: "Kampar, Riau", 
      socialMedia: "@siti_aminah95",
      regDate: "05 Mar 2025",
      memberStatus: "Aktif",
      levelMembership: "Premium Member", 
      referralCode: "BGO-SITI95",
      statusAktif: "Aktif",
      interactionChat: "Konsultasi kelistrikan aki",
      complaint: "Tidak ada",
      ticketHelp: "Tidak ada",
      feedback: "Ruang tunggu bersih ber-AC",
      adminNote: "Ganti Aki GS Astra Baru",
      purchaseHistory: "Aki Motor, Busi Denso",
      spent: "Rp 1.980.000",
      paymentMethod: "Transfer Mandiri",
      lastProduct: "Busi Utama Denso",
      lastTxDate: "02 Juni 2026",
      lastLogin: "02 Juni 2026 17:02",
      device: "Oppo Reno 11 5G",
      loginLocation: "Bangkinang Kota",
      appActivity: "Cek Riwayat Nota Lunas",
      duration: "15 Menit",
      userSource: "TikTok Video",
      campaign: "Diskon Aki Ramadhan",
      giveaway: "Tidak Ikut",
      subscription: "Tidak",
      promoStatus: "Potongan Rp 25.000"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12">
      <Container>
        <PageHeader title="Manajemen Pelanggan" breadcrumb="Dashboard / Pelanggan" />

        {/* Kotak Putih Utama */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-50 pb-6">
            <div>
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Lembar Basis Data Hubungan Pelanggan</h3>
              <p className="text-xs text-gray-400 mt-1">Daftar rekam medis operasional kendaraan pemilik unit motor BengkelGo.</p>
            </div>
            
            {/* Navigasi Pencarian */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  placeholder="Cari nama, keluhan, device..." 
                  className="w-full bg-gray-50 text-gray-700 text-xs rounded-xl py-2.5 pl-10 pr-4 focus:outline-none border border-gray-200 focus:border-[#DEE33E] focus:bg-white shadow-inner transition-all" 
                />
              </div>
              <button className="border border-gray-200 text-gray-600 p-2.5 rounded-xl text-xs font-bold bg-gray-50 hover:bg-white transition-colors"><FaFilter /></button>
            </div>
          </div>

          {/* Rangkaian Tabel Responsif Lebar */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4 min-w-[1350px]">
              <thead>
                <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wider bg-gray-50/50">
                  <th className="py-3 px-4 rounded-l-xl">Identitas &amp; Akun</th>
                  <th className="py-3 px-4">Kontak &amp; Sosial Media</th>
                  <th className="py-3 px-4">Membership &amp; Referral</th>
                  <th className="py-3 px-4">Interaksi &amp; Keluhan</th>
                  <th className="py-3 px-4">Aktivitas &amp; Device</th>
                  <th className="py-3 px-4">Sumber Marketing</th>
                  <th className="py-3 px-4 text-right rounded-r-xl pr-6">Data Transaksi</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-700">
                {customerData.map((cust) => (
                  <tr key={cust.id} className="bg-white hover:bg-gray-50/50 transition-colors shadow-sm rounded-xl border border-gray-100/50">
                    
                    {/* 1. DATA IDENTITAS CUSTOMER */}
                    <td className="py-4 px-4 font-bold rounded-l-xl border-l border-y border-gray-100/40">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center font-black text-gray-600 text-xs shadow-inner">
                          {cust.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-sm text-gray-800 leading-none mb-1">{cust.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium">@{cust.username} • {cust.gender}</p>
                          <p className="text-[9px] text-amber-600 font-mono mt-0.5">{cust.id} • Tgl Lahir: {cust.birthDate}</p>
                        </div>
                      </div>
                    </td>

                    {/* 2. KONTAK &amp; ALAMAT */}
                    <td className="py-4 px-4 border-y border-gray-100/40">
                      <p className="font-extrabold text-gray-700">{cust.phone}</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">{cust.email}</p>
                      <p className="text-[10px] text-gray-500 font-semibold mt-1">{cust.address}, <span className="text-gray-800 font-bold">{cust.location}</span></p>
                      <p className="text-[9px] text-blue-500 font-mono mt-0.5">{cust.socialMedia}</p>
                    </td>

                    {/* 3. DATA AKUN / MEMBERSHIP */}
                    <td className="py-4 px-4 border-y border-gray-100/40">
                      <span className="inline-block font-black px-2.5 py-1 rounded-lg border text-[10px] bg-[#DEE33E]/10 text-black border-[#DEE33E]/30 mb-1">
                        {cust.levelMembership}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded text-[9px] border border-green-100">
                          {cust.statusAktif}
                        </span>
                        <p className="text-[10px] text-gray-400 font-medium">Daftar: {cust.regDate}</p>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-1">Kode Reff: <span className="font-mono font-bold text-gray-600">{cust.referralCode}</span></p>
                    </td>

                    {/* 4. RIWAYAT INTERAKSI */}
                    <td className="py-4 px-4 border-y border-gray-100/40 max-w-[200px]">
                      <p className="text-[10px] text-gray-600 font-semibold truncate">💬 {cust.interactionChat}</p>
                      <p className={`text-[10px] font-bold mt-1 ${cust.complaint === "Tidak ada" ? "text-gray-400 italic" : "text-red-500"}`}>
                        ⚠️ Komplain: {cust.complaint}
                      </p>
                      <p className="text-[9px] text-gray-400 mt-0.5">Tiket: {cust.ticketHelp}</p>
                      <p className="text-[9px] text-gray-500 italic mt-0.5 truncate">" {cust.feedback} "</p>
                    </td>

                    {/* 5. AKTIVITAS USER &amp; DEVICE */}
                    <td className="py-4 px-4 border-y border-gray-100/40">
                      <p className="font-bold text-gray-700 text-[11px]">Masuk: {cust.lastLogin}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">📱 {cust.device}</p>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">Lokasi: {cust.loginLocation}</p>
                      <p className="text-[9px] text-amber-700 font-bold mt-0.5">{cust.appActivity} ({cust.duration})</p>
                    </td>

                    {/* 6. MARKETING &amp; ENGAGEMENT */}
                    <td className="py-4 px-4 border-y border-gray-100/40">
                      <p className="font-bold text-blue-600 text-[11px]">Sumber: {cust.userSource}</p>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">Event: {cust.campaign}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">Giveaway: {cust.giveaway}</p>
                      <p className="text-[9px] text-emerald-600 font-bold mt-0.5">{cust.promoStatus}</p>
                    </td>

                    {/* 7. DATA TRANSAKSI */}
                    <td className="py-4 px-4 text-right pr-6 rounded-r-xl border-r border-y border-gray-100/40">
                      <p className="font-black text-gray-900 text-sm">{cust.spent}</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">{cust.paymentMethod}</p>
                      <p className="text-[10px] text-gray-500 font-semibold mt-0.5 truncate">{cust.lastProduct}</p>
                      <p className="text-[9px] text-amber-600 font-bold mt-0.5">Terakhir: {cust.lastTxDate}</p>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}