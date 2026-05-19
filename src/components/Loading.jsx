export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0F1116] font-outfit">
      <div className="w-12 h-12 border-4 border-[#DEE33E] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(222,227,62,0.3)]"></div>
      <p className="text-[#DEE33E] font-bold tracking-widest animate-pulse">BENGKELGO LOADING...</p>
    </div>
  );
}