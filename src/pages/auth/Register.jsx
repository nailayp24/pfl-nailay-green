import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { userAPI } from "../../services/userAPI";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Kasir", // Default pilihan awal saat form dimuat
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
      // FIX UTAMA: Mengunci properti menggunakan tanda kutip agar dipetakan pas ke kolom camelCase Supabase
      const payload = {
        "fullName": formData.fullName, 
        "email": formData.email,
        "password": formData.password,
        "role": formData.role,
      };

      await userAPI.registerUser(payload);

      alert("Akun BengkelGo berhasil dibuat! Silakan login menggunakan akun baru Anda.");
      navigate("/login");

    } catch (err) {
      setError(`Pendaftaran gagal: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
        <input
          type="text" name="fullName" required placeholder="Full Name"
          value={formData.fullName}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
          onChange={handleChange}
        />

        <input
          type="email" name="email" required placeholder="Email"
          value={formData.email}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
          onChange={handleChange}
        />

        <input
          type="password" name="password" required placeholder="Password"
          value={formData.password}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
          onChange={handleChange}
        />

        <input
          type="password" name="confirmPassword" required placeholder="Confirm Password"
          value={formData.confirmPassword}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
          onChange={handleChange}
        />

        {/* Pilihan Otorisasi Hak Akses Bengkel */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1">Posisi Jabatan / Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all text-gray-600 font-semibold cursor-pointer"
          >
            <option value="Kasir">Kasir (Garda Depan)</option>
            <option value="Mekanik">Mekanik (Workshop)</option>
            <option value="Owner">Owner (Pemilik Bengkel)</option>
          </select>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-[#DEE33E] hover:bg-opacity-90 text-black font-bold py-3.5 rounded-2xl shadow-sm transition-all flex justify-center items-center gap-2 mt-4 text-sm disabled:opacity-50"
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