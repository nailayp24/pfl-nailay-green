import { FaWrench, FaUsers, FaWallet, FaChartLine, FaEye, FaEdit } from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    { title: "New Net Income", value: "£8,245.00", change: "-0.5%", icon: <FaWallet />, color: "bg-primary" },
    { title: "Total Bookings", value: "256", change: "+1.0%", icon: <FaWrench />, color: "bg-primary" },
    { title: "Resolved issues", value: "1,256", change: "+1.0%", icon: <FaChartLine />, color: "bg-primary" },
  ];

  const latestRepairs = [
    { id: "ORD-001", user: "Andriana", vehicle: "Vario v22", service: "Ganti Oli", cost: "Rp150.000", status: "Completed" },
    { id: "ORD-002", user: "Vacinzo", vehicle: "NMAX Turbo", service: "Service Rutin", cost: "Rp450.000", status: "Pending" },
    { id: "ORD-003", user: "Jone Smith", vehicle: "PCX 160", service: "Tune Up", cost: "Rp300.000", status: "Completed" },
  ];

  return (
    <div className="space-y-8 font-outfit text-neutralDark">
      {/* Stat Cards - Sekarang Putih dengan Ikon Lime Volt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
             <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-neutralDark text-xl shadow-sm">
    {stat.icon}
  </div>
  <span className="text-emerald-500 text-[10px] font-bold">{stat.change} from last week</span>
</div>
            <h3 className="text-2xl font-black">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Tabel Perbaikan - Sekarang Terang sesuai Figma */}
      <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-50 font-bold">Recent Order</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
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
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 text-secondary font-bold">{item.id}</td>
                  <td className="p-5 font-bold">{item.user}</td>
                  <td className="p-5 text-gray-500">{item.vehicle}</td>
                  <td className="p-5 font-bold">{item.cost}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-5 flex justify-center gap-2">
                    <button className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><FaEye size={12}/></button>
                    <button className="p-2 bg-primary/20 text-secondary rounded-lg hover:bg-primary transition-all"><FaEdit size={12}/></button>
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