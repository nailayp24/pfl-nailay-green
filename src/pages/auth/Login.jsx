import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
    })
    .then(() => navigate("/"))
    .catch(() => alert("Login gagal!"))
    .finally(() => setLoading(false));
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-extrabold text-center text-gray-800 mb-8">Login to your account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text" name="email" required placeholder="Email"
          className="w-full h-[52px] bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm focus:outline-none focus:border-black transition-all"
          onChange={handleChange}
        />
        <input
          type="password" name="password" required placeholder="Password"
          className="w-full h-[52px] bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm focus:outline-none focus:border-black transition-all"
          onChange={handleChange}
        />

        <div className="flex justify-between items-center text-xs pt-1">
          <label className="flex items-center gap-2 text-gray-500 font-medium cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-0" /> Remember me
          </label>
          <Link to="/forgot" className="text-[#DEE33E] font-bold hover:underline brightness-90">Forgot Password?</Link>
        </div>

        {/* PERBAIKAN: Tombol menjadi warna Lime sesuai Figma */}
        <button 
          type="submit" disabled={loading}
          className="w-full h-[52px] bg-[#DEE33E] hover:bg-opacity-90 text-black font-bold rounded-2xl shadow-sm transition-all mt-4 text-sm"
        >
          {loading ? "Logging in..." : "Sign in with email"}
        </button>

        <p className="text-center text-xs text-gray-400 pt-6">
          Don't have an account? <Link to="/register" className="text-[#DEE33E] font-bold hover:underline brightness-90">Get Started</Link>
        </p>
      </form>
    </div>
  );
}