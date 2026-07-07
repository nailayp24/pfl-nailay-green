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
      const userData = await customerAPI.getMemberByEmail(formData.email.trim().toLowerCase());

      if (!userData) {
        throw new Error("Email tidak terdaftar di database Supabase!");
      }

      // 3. Validasi kecocokan password mentah
      if (userData.password !== formData.password) {
        throw new Error("Password yang Anda masukkan salah!");
      }

// ... proses validasi password berhasil ...

const userFullName = userData.fullName || "User BengkelGo";
const userRole = userData.role || "Member";

// Simpan session objek utuh ke localStorage
localStorage.setItem("user_session", JSON.stringify(userData));
// Clean stale local overrides that might interfere with role/tier
localStorage.removeItem("bengkelgo_local_member_overrides");
localStorage.removeItem("bengkelgo_local_members");

alert(`Selamat Datang Kembali, ${userFullName}!\n\nRole Anda: ${userRole}`);

// Pengalihan rute tujuan setelah login sukses
if (userRole === "Member") {
  navigate("/member-dashboard", { replace: true }); 
} else if (userRole === "Kasir" || userRole === "Mekanik" || userRole === "Owner") {
  navigate("/dashboard", { replace: true });
} else {
  navigate("/login", { replace: true });
}
      // =====================================================================

    } catch (err) {
      console.error(err);
      setError(`Login gagal: ${err.message || "Terjadi kesalahan sistem!"}`);
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
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl shadow-sm shadow-red-600/30 transition-all flex justify-center items-center gap-2 mt-4 text-sm disabled:opacity-50"
        >
          {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Masuk Sekarang"}
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-red-600 font-bold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </form>
    </div>
  );
}