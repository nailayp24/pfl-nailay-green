import { FaEye, FaEdit, FaWrench, FaUsers, FaWallet, FaChartLine } from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    { title: "Active Services", value: "280", change: "+55%", icon: <FaWrench />, color: "bg-emerald-500" },
    { title: "Today Users", value: "2000", change: "+8%", icon: <FaUsers />, color: "bg-blue-500" },
    { title: "Revenue", value: "35k", change: "+2%", icon: <FaWallet />, color: "bg-orange-500" },
    { title: "Performance", value: "98%", change: "+35%", icon: <FaChartLine />, color: "bg-purple-500" },
  ];

  const latestRepairs = [
    { id: "ORD-001", user: "Andriana", vehicle: "Vario v22", service: "Ganti Oli", cost: "Rp150.000", status: "Completed" },
    { id: "ORD-002", user: "Vacinzo", vehicle: "NMAX Turbo", service: "Service Rutin", cost: "Rp450.000", status: "Pending" },
    { id: "ORD-003", user: "Jone Smith", vehicle: "PCX 160", service: "Tune Up", cost: "Rp300.000", status: "Completed" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1A1C2E] p-6 rounded-[30px] border border-white/5 shadow-xl transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>{stat.icon}</div>
              <span className="text-emerald-500 text-sm font-bold">{stat.change}</span>
            </div>
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-[#1A1C2E] rounded-[30px] overflow-hidden border border-white/5 shadow-xl">
        <div className="p-6 border-b border-white/5 font-bold text-white">Daftar Perbaikan Terbaru</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#25283D] text-gray-400 text-xs uppercase">
              <tr>
                <th className="p-5">ID Order</th>
                <th className="p-5">Pelanggan</th>
                <th className="p-5">Kendaraan</th>
                <th className="p-5">Biaya</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {latestRepairs.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-5 text-[#FF8A00] font-mono font-bold">{item.id}</td>
                  <td className="p-5 font-bold text-white">{item.user}</td>
                  <td className="p-5 text-gray-300">{item.vehicle}</td>
                  <td className="p-5 font-bold text-white">{item.cost}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{item.status}</span>
                  </td>
                  <td className="p-5 flex justify-center gap-2">
                    <button className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><FaEye size={12}/></button>
                    <button className="p-2 bg-orange-500/10 text-[#FF8A00] rounded-lg hover:bg-[#FF8A00] hover:text-white transition-all"><FaEdit size={12}/></button>
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