import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { customerAPI } from "../../services/userAPI"; 

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Member", // Default ke Member (pelanggan)
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

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        tier: "Bronze"
      };

      await customerAPI.registerUser(payload);

      alert("Akun BengkelGo berhasil dibuat! Silakan login menggunakan akun baru Anda.");
      navigate("/login");

    } catch (err) {
      console.error("Register error:", err);
      console.error("Error response:", err.response?.data);
      const supabaseMsg = err.response?.data?.message || err.response?.data?.hint || "";
      const duplicateMsg = supabaseMsg.includes("duplicate") || err.response?.status === 409 
        ? "Email sudah terdaftar! Gunakan email lain atau login dengan akun yang sudah ada." 
        : "";
      setError(`Pendaftaran gagal: ${duplicateMsg || supabaseMsg || err.message || "Terjadi kesalahan koneksi database!"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold mb-4 flex items-center gap-2 border border-red-100">
          <BsFillExclamationDiamondFill size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text" name="fullName" required placeholder="Full Name"
          value={formData.fullName} onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
        />

        <input
          type="email" name="email" required placeholder="Email"
          value={formData.email} onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
        />

        <input
          type="password" name="password" required placeholder="Password"
          value={formData.password} onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
        />

        <input
          type="password" name="confirmPassword" required placeholder="Confirm Password"
          value={formData.confirmPassword} onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
        />

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1">Tipe Akun</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all text-gray-600 font-semibold cursor-pointer"
          >
            <option value="Member">Member (Pelanggan Bengkel)</option>
            <option value="Kasir">Kasir (Staf Bengkel)</option>
            <option value="Mekanik">Mekanik (Staf Bengkel)</option>
            <option value="Owner">Owner (Pemilik Bengkel)</option>
          </select>
          <p className="text-[10px] text-gray-400 pl-1 mt-1">
            {formData.role === "Member" 
              ? "Daftar sebagai pelanggan untuk menikmati layanan bengkel"
              : "Daftar sebagai staf internal bengkel"}
          </p>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl shadow-sm shadow-red-600/30 transition-all flex justify-center items-center gap-2 mt-4 text-sm disabled:opacity-50"
        >
          {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Daftar Sekarang"}
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">
          Sudah punya akun? <Link to="/login" className="text-red-600 font-bold hover:underline">Masuk di sini</Link>
        </p>
      </form>
    </div>
  );
}