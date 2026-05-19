import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetRequest = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 2000);
  };

  return (
    <div className="w-full">
      {emailSent ? (
        /* Sesuai dengan figma kotak nomor 6 (Sukses) */
        <div className="text-center space-y-4 py-2">
          <div className="w-12 h-12 bg-[#DEE33E]/10 rounded-full flex items-center justify-center mx-auto text-[#DEE33E] brightness-90">
            <BsCheckCircleFill size={24} />
          </div>
          <h2 className="text-xl font-extrabold text-gray-800">Your successfully changed your password</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Kata sandi akun Anda berhasil diperbarui. Silakan kembali menggunakan kredensial baru Anda.
          </p>
          <Link 
            to="/login" 
            className="block w-full bg-[#DEE33E] text-black font-bold py-3.5 rounded-2xl text-sm hover:bg-opacity-90 transition-all shadow-sm"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        /* Sesuai dengan figma kotak nomor 5 (Form Input Password Baru) */
        <form onSubmit={handleResetRequest} className="space-y-4">
          <h2 className="text-xl font-extrabold text-gray-800">Create new password</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Please enter a new password. Your new password must be different from previous password.
          </p>
          
          <input
            type="password" required placeholder="New password"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
          />
          <input
            type="password" required placeholder="Confirm new password"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
          />

          <button
            type="submit" disabled={loading}
            className="w-full bg-[#DEE33E] hover:bg-opacity-90 text-black font-bold py-3.5 rounded-2xl shadow-sm transition-all flex justify-center items-center gap-2 text-sm pt-2"
          >
            {loading ? <ImSpinner2 className="animate-spin text-md" /> : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}