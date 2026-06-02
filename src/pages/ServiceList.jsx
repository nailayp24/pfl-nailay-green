import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch } from "react-icons/fa";
import serviceData from "../data/Services.json"; 

export default function ServiceList() {
  const [orders, setOrders] = useState(serviceData);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    customerName: '', 
    status: 'Paid', 
    cost: '', 
    orderDate: '', 
    vehicle: '',
    plate: '' 
  });

  const handleAddOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      id: orders.length + 1, 
      orderId: `BG-00${540 + orders.length + 1}`,
      customerName: formData.customerName, // Sinkronisasi properti name
      customer: formData.customerName,     // Cadangan sinkronisasi detail
      email: formData.customerName.toLowerCase().replace(/\s/g, "") + "@gmail.com",
      vehicle: formData.vehicle,
      plate: formData.plate,
      status: formData.status,
      cost: parseInt(formData.cost),
      revenue: parseInt(formData.cost).toLocaleString('id-ID'), // Sinkronisasi properti revenue
      orderDate: new Date(formData.orderDate).toLocaleDateString('en-GB', { 
        day: '2-digit', month: 'short', year: 'numeric' 
      }),
      date: new Date(formData.orderDate).toLocaleDateString('en-GB', { 
        day: '2-digit', month: 'short', year: 'numeric' 
      }),
      mechanic: "Belum Ditentukan", 
      parts: [] 
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
    <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Header Section - Mengikuti Gaya Atas Figma */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Services</h1>
            <p className="text-xs text-gray-400 mt-0.5">Let's check your Garage today</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input 
                type="text" 
                placeholder="Search by name, vehicle, or plate..." 
                className="w-full bg-white text-gray-700 text-xs rounded-xl py-2.5 pl-10 pr-4 focus:outline-none border border-gray-100 focus:border-[#DEE33E] shadow-sm transition-all" 
              />
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-[#DEE33E] text-black px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#c2c72f] shadow-sm flex items-center gap-2 transition-all shrink-0"
            >
              <FaPlus /> Add New Service
            </button>
          </div>
        </div>

        {/* Table Container - Putih Bersih Sesuai Foto Figma */}
        <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Active Service Orders</h2>
            <p className="text-xs text-gray-400 mt-1">Daftar antrean unit dan perbaikan kendaraan aktif ({orders.length} entri data terdaftar).</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                  <th className="py-3 px-4 rounded-l-xl">Customer</th>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Vehicle Unit</th>
                  <th className="py-3 px-4">Entry Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Revenue</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-700">
                {orders.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-600 uppercase text-xs">
                          {item.customerName ? item.customerName.charAt(0) : (item.customer ? item.customer.charAt(0) : 'C')}
                        </div>
                        <div>
                          <Link 
                            to={`/services/${item.id}`} 
                            className="font-extrabold text-gray-800 hover:text-[#9FA324] transition-colors block text-sm"
                          >
                            {item.customerName || item.customer}
                          </Link>
                          <p className="text-[10px] text-gray-400 mt-0.5">{item.email || 'customer@bengkelgo.com'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-gray-400">{item.orderId}</td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-gray-800">{item.vehicle}</p>
                      <p className="text-[10px] text-amber-600 font-extrabold mt-0.5 uppercase tracking-wide">{item.plate}</p>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-500">{item.orderDate || item.date}</td>
                    <td className="py-4 px-4">
                      <span className={`badge font-bold px-3 py-2 border ${
                        item.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-200' : 
                        item.status === 'Refunded' ? 'bg-red-50 text-red-600 border-red-200' : 
                        'bg-gray-50 text-gray-500 border-gray-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-black text-gray-900 text-sm">
                      {item.cost ? formatPrice(item.cost) : `Rp ${item.revenue}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal - Putih Bersih Berlatar Blur */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white border border-gray-100 rounded-[24px] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-4">New Service Order</h2>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">Customer Name</label>
                <input 
                  type="text" placeholder="e.g. Ahmad Subarjo" required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 focus:bg-white focus:border-[#DEE33E] outline-none transition-colors"
                  value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">Vehicle Unit</label>
                  <input 
                    type="text" placeholder="e.g. PCX 160" required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 focus:bg-white focus:border-[#DEE33E] outline-none transition-colors"
                    value={formData.vehicle} onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">Plate Number</label>
                  <input 
                    type="text" placeholder="e.g. BM 1234 XX" required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 focus:bg-white focus:border-[#DEE33E] outline-none uppercase transition-colors"
                    value={formData.plate} onChange={(e) => setFormData({...formData, plate: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">Cost (IDR)</label>
                  <input 
                    type="number" placeholder="e.g. 150000" required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 focus:bg-white focus:border-[#DEE33E] outline-none transition-colors"
                    value={formData.cost} onChange={(e) => setFormData({...formData, cost: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">Entry Date</label>
                  <input 
                    type="date" required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 focus:bg-white focus:border-[#DEE33E] outline-none transition-colors"
                    value={formData.orderDate} onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-50 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 text-xs text-gray-400 font-bold hover:text-gray-600 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-[#DEE33E] text-black font-bold py-2.5 text-xs rounded-xl hover:bg-[#c2c72f] transition-all shadow-sm">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}