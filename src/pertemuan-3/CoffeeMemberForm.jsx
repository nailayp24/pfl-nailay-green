// src/pertemuan-3/CoffeeMemberForm.jsx
import { useState } from "react";
import CoffeeInput from "./components/CoffeeInput";

export default function CoffeeMemberForm() {
  const [memberData, setMemberData] = useState({
    fullName: "",
    emailAddress: "",
    dailyBudget: "",
    beanChoice: "",
    brewMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);

  // VALIDASI UNIK (3 per input)
  const validate = (name, value) => {
    let msg = "";
    if (name === "fullName") {
      if (!value) msg = "Nama wajib diisi untuk ID Member";
      else if (/\d/.test(value)) msg = "Nama tidak boleh berisi angka";
      else if (value.length < 5) msg = "Minimal 5 karakter agar eksklusif";
    }
    if (name === "emailAddress") {
      if (!value) msg = "Email diperlukan untuk promo";
      else if (!value.includes("@")) msg = "Alamat email tidak valid";
      else if (!value.endsWith(".com")) msg = "Gunakan domain .com";
    }
    if (name === "dailyBudget") {
      if (!value) msg = "Masukkan budget ngopi harian";
      else if (value < 10000) msg = "Budget minimal Rp 10.000";
      else if (value > 500000) msg = "Budget terlalu tinggi (Max 500rb)";
    }
    return msg;
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
    setShowReceipt(false);
  };

  const isFormComplete = 
    Object.values(memberData).every(v => v !== "") && 
    Object.values(errors).every(e => e === "");

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 border-[12px] border-stone-100">
      <div className="bg-white p-10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] w-full max-w-md border border-stone-50 relative overflow-hidden">
        
        {/* Dekorasi Estetik */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full opacity-50"></div>

        <header className="text-left mb-10 relative">
          <h2 className="text-4xl font-serif font-black text-stone-800 leading-tight">
            Kopi <br/><span className="text-orange-500">Puan.</span>
          </h2>
          <p className="text-stone-400 text-xs mt-3 tracking-widest font-bold">EST. 2026 | PEKANBARU</p>
        </header>

        {/* 3 INPUT TEXT/NUMBER */}
        <CoffeeInput label="Nama Lengkap" name="fullName" type="text" value={memberData.fullName} onChange={handleUpdate} error={errors.fullName} placeholder="Naila Yohanda..." />
        <CoffeeInput label="Email Personal" name="emailAddress" type="email" value={memberData.emailAddress} onChange={handleUpdate} error={errors.emailAddress} placeholder="naila@kopi.com" />
        <CoffeeInput label="Budget Harian (Rp)" name="dailyBudget" type="number" value={memberData.dailyBudget} onChange={handleUpdate} error={errors.dailyBudget} placeholder="Rp 25.000" />

        {/* SELECT 1 */}
        <div className="mb-6 text-left">
          <label className="block text-stone-600 text-[10px] font-black mb-1.5 ml-1 uppercase tracking-[0.2em]">Biji Kopi Favorit</label>
          <select name="beanChoice" value={memberData.beanChoice} onChange={handleUpdate} className="w-full px-5 py-3.5 rounded-2xl border-2 border-stone-100 bg-stone-50/50 outline-none focus:border-orange-300">
            <option value="">-- Pilih Karakter --</option>
            <option value="Arabica Floral">Arabica Floral (Asam Segar)</option>
            <option value="Robusta Bold">Robusta Bold (Pahit Mantap)</option>
            <option value="House Blend">House Blend (Cokelat & Kacang)</option>
          </select>
        </div>

        {/* SELECT 2 */}
        <div className="mb-10 text-left">
          <label className="block text-stone-600 text-[10px] font-black mb-1.5 ml-1 uppercase tracking-[0.2em]">Metode Seduh</label>
          <select name="brewMethod" value={memberData.brewMethod} onChange={handleUpdate} className="w-full px-5 py-3.5 rounded-2xl border-2 border-stone-100 bg-stone-50/50 outline-none focus:border-orange-300">
            <option value="">-- Pilih Teknik --</option>
            <option value="Manual Brew">V60 / Manual Brew</option>
            <option value="Espresso Based">Espresso Based</option>
            <option value="Cold Brew">Cold Brew</option>
          </select>
        </div>

        {/* CONDITIONAL RENDERING: TOMBOL */}
        {isFormComplete ? (
          <button 
            onClick={() => setShowReceipt(true)}
            className="w-full bg-stone-900 text-white font-black py-4 rounded-2xl hover:bg-orange-600 transition-all duration-500 shadow-xl shadow-orange-100 tracking-widest text-sm"
          >
            CREATE MEMBER ID
          </button>
        ) : (
          <div className="py-4 px-6 bg-stone-50 rounded-2xl border border-stone-100 text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center">
            Selesaikan Form Terlebih Dahulu
          </div>
        )}

        {/* CONDITIONAL RENDERING: RECEIPT */}
        {showReceipt && (
          <div className="mt-8 p-8 bg-stone-900 rounded-[2rem] text-white shadow-2xl animate-slideUp relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
             <p className="text-[10px] text-orange-400 font-black tracking-[0.3em] mb-4 text-center">MEMBERSHIP CARD</p>
             <div className="space-y-3 font-mono text-xs border-b border-stone-700 pb-4">
                <div className="flex justify-between"><span>NAME:</span> <span className="text-orange-200">{memberData.fullName}</span></div>
                <div className="flex justify-between"><span>BEANS:</span> <span>{memberData.beanChoice}</span></div>
                <div className="flex justify-between"><span>METHOD:</span> <span>{memberData.brewMethod}</span></div>
             </div>
             <p className="mt-4 text-[9px] text-stone-500 italic text-center italic">"Coffee is a language in itself."</p>
          </div>
        )}
      </div>
    </div>
  );
}