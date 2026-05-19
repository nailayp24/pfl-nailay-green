export default function Button({ children, type = "primary", onClick }) {
  const types = {
    primary: "bg-[#DEE33E] hover:bg-opacity-90 text-black shadow-lg shadow-[#DEE33E]/10",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${types[type]} px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2`}
    >
      {children}
    </button>
  );
}