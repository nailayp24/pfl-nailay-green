export default function DatePicker({ label }) {
  return (
    <div className="space-y-1 w-full font-outfit">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>
      <input
        type="date"
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-[#DEE33E] text-gray-700 transition-all"
      />
    </div>
  );
}