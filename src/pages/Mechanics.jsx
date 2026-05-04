export default function Mechanics() {
  const mechanics = [
    { name: "Budi Santoso", skill: "Senior Engine Specialist", status: "Active", rating: "4.9" },
    { name: "Agus Salim", skill: "Electrical Expert", status: "On Duty", rating: "4.8" },
    { name: "Dedi Kurniawan", skill: "Body & Paint Specialist", status: "Active", rating: "4.7" },
    { name: "Iwan Fals", skill: "Tuning & Performance", status: "Off", rating: "5.0" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">BengkelGo Mechanics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mechanics.map((m, i) => (
          <div key={i} className="bg-[#1A1C2E] p-6 rounded-[30px] border border-white/5 text-center group hover:border-[#FF8A00] transition-all hover:shadow-2xl hover:shadow-orange-500/10">
            <div className="w-20 h-20 bg-orange-500/20 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-[#FF8A00] shadow-lg shadow-orange-500/20">
              <span className="text-2xl font-bold text-[#FF8A00]">{m.name.charAt(0)}</span>
            </div>
            <h3 className="font-bold text-lg text-white">{m.name}</h3>
            <p className="text-gray-400 text-xs mb-4">{m.skill}</p>
            <div className="flex justify-between items-center bg-[#25283D] p-3 rounded-2xl text-sm border border-white/5">
              <span className={m.status === 'Off' ? 'text-red-500 font-semibold' : 'text-emerald-500 font-semibold'}>● {m.status}</span>
              <span className="text-yellow-500 font-bold">★ {m.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}