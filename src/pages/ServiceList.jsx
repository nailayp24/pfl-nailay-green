import { useState } from 'react';
import { Link } from 'react-router-dom'; // Tambahkan ini
import { FaPlus, FaSearch } from "react-icons/fa";
import serviceData from "../data/Services.json"; // Ambil data 30 tadi

export default function ServiceList() {
  // Gunakan data dari JSON sebagai state awal
  const [orders, setOrders] = useState(serviceData);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    customerName: '', 
    status: 'Paid', 
    cost: '', 
    orderDate: '', 
    vehicle: '',
    plate: '' // Tambahkan plat nomor
  });

  const handleAddOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      id: orders.length + 1, // ID untuk keperluan routing
      orderId: `BG-00${540 + orders.length + 1}`,
      email: formData.customerName.toLowerCase().replace(/\s/g, "") + "@gmail.com",
      ...formData,
      cost: parseInt(formData.cost),
      orderDate: new Date(formData.orderDate).toLocaleDateString('en-GB', { 
        day: '2-digit', month: 'short', year: 'numeric' 
      }),
      mechanic: "Belum Ditentukan", // Default mekanik baru
      parts: [] // Default parts kosong
    };
    
    setOrders([newOrder, ...orders]);
    setShowModal(false);
    setFormData({ customerName: '', status: 'Paid', cost: '', orderDate: '', vehicle: '', plate: '' });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="p-2 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Service List</h1>
        <div className="relative group w-64">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF8A00] transition-colors" />
          <input 
            type="text" 
            placeholder="Search service..." 
            className="w-full bg-[#2D3748] text-white rounded-full py-2 px-10 focus:outline-none border border-gray-700 focus:border-[#FF8A00] transition-all" 
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#1A1C23] rounded-[30px] p-8 shadow-xl border border-gray-800">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-xl font-bold text-white">Customer Orders</h2>
            <p className="text-gray-500 text-sm mt-1">Daftar perbaikan kendaraan aktif ({orders.length} data).</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#FF8A00] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all flex items-center gap-2"
          >
            <FaPlus /> Add new service
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-800">
                <th className="pb-6 font-medium">Customer</th>
                <th className="pb-6 font-medium">Order ID</th>
                <th className="pb-6 font-medium">Vehicle</th>
                <th className="pb-6 font-medium">Date</th>
                <th className="pb-6 font-medium">Status</th>
                <th className="pb-6 font-medium text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((item) => (
                <tr key={item.id} className="border-b border-gray-800/50 hover:bg-[#2D3748]/20 transition-all group">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 border-2 border-[#FF8A00] flex items-center justify-center font-bold text-[#1A1C23]">
                        {item.customerName.charAt(0)}
                      </div>
                      <div>
                        {/* Link ke Halaman Detail */}
                        <Link 
                          to={`/services/${item.id}`} 
                          className="font-bold text-white leading-none hover:text-[#FF8A00] transition-colors"
                        >
                          {item.customerName}
                        </Link>
                        <p className="text-[11px] text-gray-500 mt-1">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 text-gray-400 font-mono">{item.orderId}</td>
                  <td className="py-5 text-gray-300">
                    <p>{item.vehicle}</p>
                    <p className="text-[10px] text-[#FF8A00] font-bold">{item.plate}</p>
                  </td>
                  <td className="py-5 text-gray-400">{item.orderDate}</td>
                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      item.status === 'Paid' ? 'bg-orange-500/10 text-[#FF8A00]' : 
                      item.status === 'Refunded' ? 'bg-emerald-500/10 text-emerald-500' : 
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 text-right font-bold text-white">{formatPrice(item.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Dark Theme */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#1A1C23] border border-gray-800 rounded-[30px] shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-white mb-6">New Service Order</h2>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <input 
                type="text" placeholder="Customer Name" required
                className="w-full bg-[#2D3748] border border-gray-700 rounded-xl p-3 text-white focus:border-[#FF8A00] outline-none"
                value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="Vehicle (PCX 160)" required
                  className="w-full bg-[#2D3748] border border-gray-700 rounded-xl p-3 text-white focus:border-[#FF8A00] outline-none"
                  value={formData.vehicle} onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                />
                <input 
                  type="text" placeholder="Plate (BM 1234 XX)" required
                  className="w-full bg-[#2D3748] border border-gray-700 rounded-xl p-3 text-white focus:border-[#FF8A00] outline-none uppercase"
                  value={formData.plate} onChange={(e) => setFormData({...formData, plate: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" placeholder="Cost (IDR)" required
                  className="bg-[#2D3748] border border-gray-700 rounded-xl p-3 text-white focus:border-[#FF8A00] outline-none"
                  value={formData.cost} onChange={(e) => setFormData({...formData, cost: e.target.value})}
                />
                <input 
                  type="date" required
                  className="bg-[#2D3748] border border-gray-700 rounded-xl p-3 text-white focus:border-[#FF8A00] outline-none"
                  value={formData.orderDate} onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 text-gray-400 font-bold hover:text-white transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-[#FF8A00] text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}