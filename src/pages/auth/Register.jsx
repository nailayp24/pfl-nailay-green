import { useState } from "react";
import { BsEnvelope, BsKey, BsPerson, BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Konfirmasi password tidak cocok!");
    }

    setLoading(true);
    // Simulasi proses pendaftaran
    setTimeout(() => {
      setLoading(false);
      alert("Akun BengkelGo berhasil dibuat! Silakan login.");
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-black text-gray-800 mb-2">Sign Up</h2>
      <p className="text-gray-400 text-sm mb-8">Daftar sekarang untuk mulai mengelola layanan bengkel.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-2 border border-red-100">
          <BsFillExclamationDiamondFill size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest">Full Name</label>
          <div className="relative">
            <input
              type="text" name="fullName" required placeholder="Naila Yohanda Putri"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 pr-12 text-sm focus:outline-none focus:border-[#FF8A00] transition-all"
              onChange={handleChange}
            />
            <BsPerson className="absolute right-5 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest">Email Address</label>
          <div className="relative">
            <input
              type="email" name="email" required placeholder="you@example.com"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 pr-12 text-sm focus:outline-none focus:border-[#FF8A00] transition-all"
              onChange={handleChange}
            />
            <BsEnvelope className="absolute right-5 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input
                type="password" name="password" required placeholder="********"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 pr-12 text-sm focus:outline-none focus:border-[#FF8A00] transition-all"
                onChange={handleChange}
              />
              <BsKey className="absolute right-5 top-3.5 text-gray-400" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest">Confirm</label>
            <div className="relative">
              <input
                type="password" name="confirmPassword" required placeholder="********"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 pr-12 text-sm focus:outline-none focus:border-[#FF8A00] transition-all"
                onChange={handleChange}
              />
              <BsKey className="absolute right-5 top-3.5 text-gray-400" />
            </div>
          </div>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-[#FF8A00] hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2 mt-4"
        >
          {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Create Account"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-6 font-semibold">
          Already have an account? <Link to="/login" className="text-[#FF8A00] font-bold hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}