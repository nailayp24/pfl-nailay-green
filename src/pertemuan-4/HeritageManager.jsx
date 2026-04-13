import { useState } from "react";
import heritageData from "./artefak.json";

export default function HeritageManager() {
  const [viewMode, setViewMode] = useState("guest");
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedCondition: "",
  });

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const filteredData = heritageData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(dataForm.searchTerm.toLowerCase());
    const matchesCategory = dataForm.selectedCategory ? item.category === dataForm.selectedCategory : true;
    const matchesCondition = dataForm.selectedCondition ? item.physical.condition === dataForm.selectedCondition : true;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const allCategories = [...new Set(heritageData.map((item) => item.category))];
  const allConditions = [...new Set(heritageData.map((item) => item.physical.condition))];

  return (
    <div className="p-4 md:p-10 bg-stone-50 min-h-screen font-serif">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black text-stone-900 tracking-tighter italic">Sang Nila <span className="text-amber-600">Heritage.</span></h1>
          <p className="text-stone-500 text-xs tracking-[0.4em] font-bold mt-2 uppercase">Digital Artifact Archive | Pekanbaru</p>
        </div>
        <button 
          onClick={() => setViewMode(viewMode === "guest" ? "admin" : "guest")}
          className="bg-stone-900 text-amber-500 border border-amber-900/30 px-8 py-3 rounded-full font-bold hover:bg-amber-600 hover:text-white transition-all shadow-xl"
        >
          {viewMode === "guest" ? "Open Admin Vault" : "Back to Gallery"}
        </button>
      </div>

      {/* Control Panel: Search & 2 Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-white p-8 rounded-[2rem] shadow-sm border border-stone-200">
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Search Artifact</label>
          <input
            type="text"
            name="searchTerm"
            placeholder="Ketik nama benda..."
            value={dataForm.searchTerm}
            onChange={handleChange}
            className="p-3 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:border-amber-500 font-sans"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Category Filter</label>
          <select name="selectedCategory" value={dataForm.selectedCategory} onChange={handleChange} className="p-3 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:border-amber-500 font-sans">
            <option value="">Semua Koleksi</option>
            {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Physical Condition</label>
          <select name="selectedCondition" value={dataForm.selectedCondition} onChange={handleChange} className="p-3 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:border-amber-500 font-sans">
            <option value="">Semua Kondisi</option>
            {allConditions.map(con => <option key={con} value={con}>{con}</option>)}
          </select>
        </div>
      </div>

      {viewMode === "guest" ? <GuestView data={filteredData} /> : <AdminView data={filteredData} />}
    </div>
  );
}

function GuestView({ data }) {
  if (data.length === 0) return <p className="text-center text-stone-400 py-20 font-sans">Koleksi tidak ditemukan dalam arsip.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {data.map((item) => (
        <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-stone-100 p-4">
          <div className="h-60 overflow-hidden rounded-[2rem] relative">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="bg-amber-500 text-stone-900 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                {item.category}
              </span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-amber-700 text-[10px] font-bold tracking-widest mb-1">{item.year} AD</p>
            <h3 className="text-xl font-black text-stone-800 leading-tight mb-3">{item.name}</h3>
            
            {/* Nested Data Physical */}
            <div className="bg-stone-50 p-4 rounded-2xl mb-4 space-y-2 text-[11px] font-sans text-stone-500 border border-stone-100">
              <p className="flex justify-between"><span>Material:</span> <span className="font-bold text-stone-700">{item.physical.material}</span></p>
              <p className="flex justify-between"><span>Condition:</span> <span className={`font-bold ${item.physical.condition === 'Rapuh' ? 'text-red-500' : 'text-green-600'}`}>{item.physical.condition}</span></p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag, idx) => (
                <span key={idx} className="text-[9px] text-stone-400 border border-stone-200 px-2 py-1 rounded-md">#{tag}</span>
              ))}
            </div>

            {/* Nested Data Origin */}
            <p className="text-[10px] text-stone-400 font-medium italic border-t pt-3">
              📍 Origin: {item.origin.city}, {item.origin.island} ({item.origin.dynasty})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminView({ data }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-stone-900 text-amber-500 uppercase text-[10px] tracking-[0.2em]">
            <tr>
              <th className="p-6">Registry ID</th>
              <th className="p-6">Artifact Name</th>
              <th className="p-6">Dynasty/Origin</th>
              <th className="p-6">Physical Details</th>
              <th className="p-6">Condition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 italic">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-amber-50 transition-colors">
                <td className="p-6 font-bold text-stone-400">ARC-{item.id.toString().padStart(3, '0')}</td>
                <td className="p-6 font-black text-stone-800">{item.name}</td>
                <td className="p-6 text-stone-500 text-xs">
                  {item.origin.dynasty} <br/> <span className="text-[10px] font-normal">{item.origin.city}, {item.origin.island}</span>
                </td>
                <td className="p-6 text-xs">
                  {item.physical.material} | {item.physical.weight}
                </td>
                <td className="p-6">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.physical.condition === 'Sangat Baik' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.physical.condition}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}