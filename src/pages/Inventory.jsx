import { FaSearch } from "react-icons/fa";

export default function Inventory() {
  const stockData = [
    { id: "SP-01", name: "Oli Mesin Matic 1L", category: "Pelumas", stock: 45, price: "Rp 65.000" },
    { id: "SP-02", name: "Kampas Rem Depan", category: "Suku Cadang", stock: 20, price: "Rp 45.000" },
    { id: "SP-03", name: "V-Belt Kit Grand Premium", category: "Transmisi", stock: 12, price: "Rp 135.000" },
    { id: "SP-04", name: "Busi Utama Denso", category: "Kelistrikan", stock: 60, price: "Rp 25.000" },
  ];

  return (
    <div className="p-2 space-y-6 font-outfit">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Inventory</h1>
          <p className="text-xs text-gray-400 mt-0.5">Let's check your Garage today</p>
        </div>
        <div className="relative group w-64">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input 
            type="text" 
            placeholder="Search inventory..." 
            className="w-full bg-white text-gray-700 text-xs rounded-full py-2 px-10 focus:outline-none border border-gray-200 focus:border-[#DEE33E] shadow-sm transition-all" 
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-100">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Daftar Suku Cadang & Pelumas</h2>
            <p className="text-gray-400 text-sm mt-1">Sistem informasi stok manajemen material dan inventory BengkelGo.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-100 bg-gray-50/30">
                <th className="pb-6 font-medium pl-4">ID Barang</th>
                <th className="pb-6 font-medium">Nama Komponen</th>
                <th className="pb-6 font-medium">Kategori</th>
                <th className="pb-6 font-medium">Stok Aktif</th>
                <th className="pb-6 font-medium text-right pr-4">Harga Satuan</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {stockData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100/50 hover:bg-gray-50/50 transition-all group shadow-sm bg-white rounded-xl">
                  <td className="py-5 pl-4 font-mono font-bold text-gray-400 rounded-l-xl">{item.id}</td>
                  <td className="py-5 font-extrabold text-gray-800">{item.name}</td>
                  <td className="py-5">
                    <span className="badge badge-ghost font-bold text-gray-500 px-3 py-2 border border-gray-100 bg-gray-50">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-5 font-black text-amber-600">{item.stock} Unit</td>
                  <td className="py-5 text-right pr-4 font-bold text-gray-900 rounded-r-xl">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}