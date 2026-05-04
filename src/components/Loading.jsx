export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#0F1116]">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(255,138,0,0.3)]"></div>
            <p className="text-orange-500 font-bold tracking-widest animate-pulse">BENGKELGO LOADING...</p>
        </div>
    );
}