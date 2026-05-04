import { useState } from "react";
import { BsEnvelope, BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleResetRequest = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi pengiriman email reset password
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 2000);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-black text-gray-800 mb-2">Forgot Password?</h2>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
        Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
      </p>

      {emailSent ? (
        <div className="bg-emerald-50 text-emerald-600 p-6 rounded-[30px] border border-emerald-100 text-center space-y-3">
          <BsCheckCircleFill className="mx-auto text-3xl mb-2" />
          <p className="font-bold">Email Terkirim!</p>
          <p className="text-xs leading-relaxed text-emerald-500">
            Kami telah mengirimkan instruksi pemulihan ke <b>{email}</b>. Silakan periksa kotak masuk atau folder spam Anda.
          </p>
          <Link 
            to="/login" 
            className="inline-block mt-4 text-xs font-black uppercase tracking-widest text-emerald-700 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleResetRequest} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <input
                type="email" 
                required 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 pr-12 text-sm focus:outline-none focus:border-[#FF8A00] transition-all shadow-sm"
              />
              <BsEnvelope className="absolute right-5 top-4.5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit" 
            disabled={loading}
            className="w-full bg-[#FF8A00] hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2"
          >
            {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Send Reset Link"}
          </button>

          <div className="text-center mt-6">
            <Link to="/login" className="text-xs font-bold text-gray-400 hover:text-[#FF8A00] transition-colors uppercase tracking-widest">
              ← Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}