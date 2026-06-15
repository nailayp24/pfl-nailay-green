import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { customerAPI } from "../../services/userAPI"; 

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Ambil list data dari tabel bengkel_users Supabase
      const usersList = await customerAPI.getAllMembers();
      console.log("Data mentah dari Supabase:", usersList);

      if (!usersList || usersList.length === 0) {
        throw new Error("Database kosong atau gagal memuat data.");
      }

      // 2. Cari akun yang cocok berdasarkan email (Gunakan .trim() & .toLowerCase() agar kebal salah ketik)
      const userData = usersList.find(
        (u) => u.email.trim().toLowerCase() === formData.email.trim().toLowerCase()
      );

      if (!userData) {
        throw new Error("Email tidak terdaftar di database Supabase!");
      }

      // 3. Validasi kecocokan password mentah
      if (userData.password !== formData.password) {
        throw new Error("Password yang Anda masukkan salah!");
      }

      // 4. FIX UTAMA: Membaca nama lengkap secara aman dari kolom full_name Supabase kamu!
      const userFullName = userData.full_name || userData.fullName || "User BengkelGo";

      // Simpan session objek utuh ke localStorage untuk Route Guard
      localStorage.setItem("user_session", JSON.stringify(userData));

      alert(`Selamat Datang Kembali, ${userFullName}!`);
      
      // Lempar sukses masuk ke halaman dashboard internal bengkel
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError(`Login gagal: ${err.message || "Terjadi kesalahan sistem!"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-extrabold text-gray-800 mb-6">Welcome Back</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold mb-4 flex items-center gap-2 border border-red-100">
          <BsFillExclamationDiamondFill size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-black transition-all"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#DEE33E] hover:bg-opacity-90 text-black font-bold py-3.5 rounded-2xl shadow-sm transition-all flex justify-center items-center gap-2 mt-4 text-sm disabled:opacity-50"
        >
          {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Sign in to account"}
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-[#DEE33E] font-bold hover:underline brightness-90">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
}