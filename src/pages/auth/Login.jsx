
import { useState } from "react";
import {
  BsFillExclamationDiamondFill,
  BsEnvelope,
  BsKey,
} from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then(() => navigate("/"))
      .catch((err) => setError(err.response?.data?.message || "Login gagal!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-black text-gray-800 mb-2">Login</h2>
      <p className="text-gray-400 text-sm mb-8">
        Selamat datang kembali di BengkelGo
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-2 border border-red-100">
          <BsFillExclamationDiamondFill size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 ml-1">Email</label>
          <div className="relative">
            <input
              type="text"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 pr-12 text-sm focus:outline-none focus:border-[#FF8A00] transition-all"
              onChange={handleChange}
            />
            <BsEnvelope className="absolute right-5 top-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 ml-1">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              placeholder="********"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 pr-12 text-sm focus:outline-none focus:border-[#FF8A00] transition-all"
              onChange={handleChange}
            />
            <BsKey className="absolute right-5 top-4 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            size={14}
            className="text-xs font-bold text-[#FF8A00] hover:underline"
          >
            Forgot password
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF8A00] hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2"
        >
          {loading ? <ImSpinner2 className="animate-spin" /> : "Log in"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-6 font-semibold">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#FF8A00] font-bold hover:underline transition-all"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
