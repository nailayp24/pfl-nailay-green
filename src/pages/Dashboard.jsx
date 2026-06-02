import { FaWrench, FaUsers, FaWallet, FaEye, FaEdit, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    { title: "Pendapatan Bersih (Mingguan)", value: "Rp 19.750.000", change: "+12.5%", isUp: true, icon: <FaWallet />, desc: "Total pemasukan kas masuk minggu ini" },
    { title: "Antrean Servis Aktif", value: "111 Unit", change: "+4.2%", isUp: true, icon: <FaWrench />, desc: "Kendaraan dalam penanganan montir" },
    { title: "Tingkat Kunjungan Ulang", value: "84.3%", change: "-0.5%", isUp: false, icon: <FaUsers />, desc: "Persentase loyalitas kedatangan pelanggan" },
  ];

  const latestRepairs = [
    { id: "BG-00540", user: "Naila Putri", vehicle: "Vario v22", plate: "BM 1234 NP", service: "Ganti Oli Mesin", cost: "Rp 191.589", status: "Lunas" },
    { id: "BG-00541", user: "Naila Yohanda", vehicle: "NMAX Turbo", plate: "BM 5678 NY", service: "Service Kaki-Kaki", cost: "Rp 386.226", status: "Pending" },
    { id: "BG-00542", user: "Ahmed", vehicle: "Vario v22", plate: "BM 9912 AD", service: "Tune Up Injeksi", cost: "Rp 149.106", status: "Proses" },
  ];

  return (
    <div className="p-2 space-y-8 font-outfit text-gray-800">
      <div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Ringkasan Utama Bengkel</h1>
        <p className="text-xs text-gray-400 mt-0.5">Let's check your Garage today</p>
      </div>

      {/* Rangkaian Kartu Informasi Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 bg-[#DEE33E]/20 text-black rounded-xl flex items-center justify-center text-lg border border-[#DEE33E]/40">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
                stat.isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}>
                {stat.isUp ? <FaArrowUp /> : <FaArrowDown />} {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
            <p className="text-sm font-bold text-gray-700 mt-0.5">{stat.title}</p>
            <p className="text-[11px] text-gray-400 mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Grafik Monitor Omset Kerja Bengkel (SVG Aman Bebas Error) */}
      <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
        <div className="mb-6">
          <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Grafik Tren Pemasukan Harian</h2>
          <p className="text-xs text-gray-400 mt-0.5">Visualisasi data fluktuasi grafik total uang masuk seminggu terakhir.</p>
        </div>
        
        <div className="w-full bg-white pt-4 relative">
          <svg viewBox="0 0 700 200" className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#DEE33E', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#DEE33E', stopOpacity: 0.0 }} />
              </linearGradient>
            </defs>

            <line x1="0" y1="40" x2="700" y2="40" stroke="#F3F4F6" strokeWidth="1" />
            <line x1="0" y1="90" x2="700" y2="90" stroke="#F3F4F6" strokeWidth="1" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="#F3F4F6" strokeWidth="1" />

            <path d="M 10,160 L 120,120 L 230,150 L 340,70 L 450,110 L 560,20 L 680,40 L 680,180 L 10,180 Z" fill="url(#grad)" />
            <path d="M 10,160 L 120,120 L 230,150 L 340,70 L 450,110 L 560,20 L 680,40" fill="none" stroke="#9FA324" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            <circle cx="10" cy="160" r="4" fill="#9FA324" />
            <circle cx="120" cy="120" r="4" fill="#9FA324" />
            <circle cx="230" cy="150" r="4" fill="#9FA324" />
            <circle cx="340" cy="70" r="4" fill="#9FA324" />
            <circle cx="450" cy="110" r="4" fill="#9FA324" />
            <circle cx="560" cy="20" r="5" fill="#9FA324" stroke="#ffffff" strokeWidth="2" />
            <circle cx="680" cy="40" r="4" fill="#9FA324" />

            <g transform="translate(510, -15)">
              <rect width="100" height="24" rx="6" fill="#1F2937" />
              <text x="50" y="15" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Rp 4.500.000</text>
            </g>
          </svg>

          <div className="flex justify-between text-[10px] font-bold text-gray-400 px-1 mt-3">
            <span>Senin</span><span>Selasa</span><span>Rabu</span><span>Kamis</span><span>Jumat</span><span>Sabtu</span><span>Minggu</span>
          </div>
        </div>
      </div>

      {/* Tabel Data Nota Masuk Terbaru */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Antrean Nota Servis Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <th className="py-4 px-6">ID Nota</th>
                <th className="py-4 px-6">Nama Pemilik</th>
                <th className="py-4 px-6">Unit Kendaraan</th>
                <th className="py-4 px-6">Jenis Pengerjaan</th>
                <th className="py-4 px-6">Status Unit</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700">
              {latestRepairs.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-gray-400">{item.id}</td>
                  <td className="py-4 px-6 font-extrabold text-gray-800">{item.user}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-700">{item.vehicle}</p>
                    <p className="text-[10px] text-amber-600 font-black uppercase mt-0.5">{item.plate}</p>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-500">{item.service}</td>
                  <td className="py-4 px-6">
                    <span className={`badge font-bold px-3 py-2 border ${
                      item.status === 'Lunas' ? 'bg-green-50 text-green-600 border-green-200' : 
                      item.status === 'Pending' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex justify-center gap-2">
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-black hover:text-white transition-all"><FaEye size={11}/></button>
                    <button className="p-2 bg-[#DEE33E]/20 text-black border border-[#DEE33E]/40 rounded-xl hover:bg-[#DEE33E] transition-all"><FaEdit size={11}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}