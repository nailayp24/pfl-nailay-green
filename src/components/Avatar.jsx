export default function Avatar({ name, image }) {
  return image ? (
    <img 
      src={image} 
      className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" 
      alt={name} 
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-[#DEE33E]/10 text-black flex items-center justify-center font-bold text-sm border border-[#DEE33E]/20">
      {name ? name.charAt(0).toUpperCase() : "N"}
    </div>
  );
}