// src/pertemuan-3/components/CoffeeInput.jsx
export default function CoffeeInput({ label, type, name, value, onChange, error, placeholder }) {
  return (
    <div className="mb-5 text-left">
      <label className="block text-stone-600 text-[10px] font-black mb-1.5 ml-1 uppercase tracking-[0.2em]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-5 py-3.5 rounded-2xl border-2 transition-all duration-500 outline-none shadow-sm ${
          error 
          ? "border-red-300 bg-red-50 focus:border-red-500 text-red-900" 
          : "border-stone-100 bg-stone-50/50 focus:border-orange-300 focus:bg-white text-stone-800"
        }`}
      />
      {/* Alert Error di bawah input */}
      {error && (
        <div className="flex items-center mt-1.5 ml-2 text-red-500 animate-bounce-short">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          <p className="text-[11px] font-bold italic tracking-tight">{error}</p>
        </div>
      )}
    </div>
  );
}