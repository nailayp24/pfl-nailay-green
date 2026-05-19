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

    loading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Akun BengkelGo berhasil dibuat! Silakan login.");
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-extrabold text-gray-800 mb-6">Create your ID</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold mb-4 flex items-center gap-2 border border-red-100">
          <BsFillExclamationDiamondFill size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text" name="fullName" required placeholder="First name"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-black transition-all"
            onChange={handleChange}
          />
          <input
            type="text" placeholder="Last name"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-black transition-all"
          />
        </div>

        <input
          type="email" name="email" required placeholder="Email"
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-black transition-all"
          onChange={handleChange}
        />

        <input
          type="password" name="password" required placeholder="Password"
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-black transition-all"
          onChange={handleChange}
        />

        {/* PERBAIKAN: Tombol pendaftaran menggunakan warna Lime */}
        <button
          type="submit" disabled={loading}
          className="w-full bg-[#DEE33E] hover:bg-opacity-90 text-black font-bold py-3.5 rounded-2xl shadow-sm transition-all flex justify-center items-center gap-2 mt-4 text-sm"
        >
          {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Sign up with email"}
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">
          Already have an account? <Link to="/login" className="text-[#DEE33E] font-bold hover:underline brightness-90">Login Now</Link>
        </p>
      </form>
    </div>
  );
}