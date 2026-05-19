import InputField from "./InputField";

export default function ServiceOrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-outfit">
      <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl space-y-6">
        <h2 className="text-xl font-extrabold text-gray-800">New Service Order</h2>
        
        <div className="space-y-4">
          <InputField label="Customer Name" placeholder="Masukkan nama pelanggan" />
          <InputField label="Vehicle" placeholder="e.g. PCX 160 atau NMAX Turbo" />
          <InputField label="Cost (IDR)" placeholder="Rp" type="number" />
        </div>

        <div className="flex justify-end gap-3 pt-2 text-sm font-bold">
          <button 
            type="button" 
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl transition-all"
          >
            Cancel
          </button>
          <button 
            type="button"
            className="bg-[#DEE33E] hover:bg-opacity-95 text-black px-6 py-3 rounded-2xl transition-all shadow-md shadow-[#DEE33E]/20"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}