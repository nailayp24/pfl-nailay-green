import { useParams, useNavigate } from "react-router-dom";
import serviceData from "../data/Services.json"; // Pastikan path dan nama file JSON sesuai

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mencari data service berdasarkan ID yang diklik
  const service = serviceData.find((item) => item.id === parseInt(id));

  if (!service) {
    return <div className="p-10 text-white">Data Service tidak ditemukan!</div>;
  }

  return (
    <div className="p-6 text-white min-h-screen bg-[#F8F9FB]">
      {/* Tombol Back */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
      >
        ← Kembali ke Daftar Service
      </button>

      <div className="bg-[#1F2128] rounded-3xl p-8 shadow-xl max-w-4xl">
        <div className="flex justify-between items-start border-b border-gray-700 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Detail Perbaikan</h1>
            <p className="text-gray-400">Order ID: <span className="text-orange-400 font-mono">{service.orderId}</span></p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            service.status === 'Paid' ? 'bg-green-500/20 text-green-500' : 
            service.status === 'Refunded' ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/20 text-gray-400'
          }`}>
            {service.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri: Informasi Customer */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Informasi Pelanggan</h3>
            <div className="bg-[#282B33] p-4 rounded-2xl">
              <p className="text-sm text-gray-400">Nama Pemilik</p>
              <p className="text-lg font-medium">{service.customer}</p>
            </div>
            <div className="bg-[#282B33] p-4 rounded-2xl">
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-medium">{service.email || 'N/A'}</p>
            </div>
          </div>

          {/* Kolom Kanan: Informasi Kendaraan */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Unit Kendaraan</h3>
            <div className="bg-[#282B33] p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Model Kendaraan</p>
                <p className="text-lg font-medium">{service.vehicle}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">No. Plat</p>
                <p className="text-lg font-mono font-bold text-orange-400">{service.plate || 'BG-0000'}</p>
              </div>
            </div>
            <div className="bg-[#282B33] p-4 rounded-2xl">
              <p className="text-sm text-gray-400">Tanggal Masuk</p>
              <p className="text-lg font-medium">{service.date}</p>
            </div>
          </div>
        </div>

        {/* Ringkasan Biaya */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex justify-between items-center bg-orange-500 p-6 rounded-2xl">
            <span className="text-lg font-bold text-white">Total Revenue</span>
            <span className="text-2xl font-black text-white">Rp {service.revenue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}