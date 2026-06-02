export default function Mechanics() {
  const mechanics = [
    { name: "Budi Santoso", skill: "Senior Engine Specialist", status: "Active", rating: "4.9" },
    { name: "Agus Salim", skill: "Electrical Expert", status: "On Duty", rating: "4.8" },
    { name: "Dedi Kurniawan", skill: "Body & Paint Specialist", status: "Active", rating: "4.7" },
    { name: "Iwan Fals", skill: "Tuning & Performance", status: "Off", rating: "5.0" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Mechanics Team</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manajemen alokasi status dan rating performa montir aktif BengkelGo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mechanics.map((m, i) => (
            <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 text-center shadow-sm hover:border-[#DEE33E] transition-all hover:shadow-md group">
              <div className="w-20 h-20 bg-gray-50 rounded-full mx-auto mb-4 flex items-center justify-center border border-gray-100 shadow-inner group-hover:bg-[#DEE33E]/10 group-hover:border-[#DEE33E]/30 transition-colors">
                <span className="text-2xl font-black text-gray-700 group-hover:text-black">{m.name.charAt(0)}</span>
              </div>
              <h3 className="font-extrabold text-base text-gray-800 tracking-tight">{m.name}</h3>
              <p className="text-gray-400 text-[11px] font-medium mt-0.5 mb-5">{m.skill}</p>
              <div className="flex justify-between items-center bg-gray-50/80 p-3 rounded-xl text-xs border border-gray-50 font-bold">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] ${
                  m.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' :
                  m.status === 'On Duty' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  ● {m.status}
                </span>
                <span className="text-gray-700 flex items-center gap-1"><span className="text-amber-500">★</span> {m.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}