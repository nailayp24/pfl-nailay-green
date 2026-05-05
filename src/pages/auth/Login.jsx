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
      <h2 className="text-xl font-bold text-center text-neutralDark mb-10">Login to your account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text" name="email" required placeholder="Email"
          className="w-full h-[56px] bg-greyscale50 border-none rounded-component px-5 text-sm focus:ring-1 focus:ring-primary outline-none"
          onChange={handleChange}
        />
        <input
          type="password" name="password" required placeholder="Password"
          className="w-full h-[56px] bg-greyscale50 border-none rounded-component px-5 text-sm focus:ring-1 focus:ring-primary outline-none"
          onChange={handleChange}
        />

        <button 
          type="submit" disabled={loading}
          className="w-full h-[56px] bg-primary hover:bg-secondary text-neutralDark font-bold rounded-component shadow-sm transition-all mt-4"
        >
          {loading ? "Logging in..." : "Sign in with email"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-10">
          Don't have an account? <Link to="/register" className="text-secondary font-bold hover:underline">Get Started</Link>
        </p>
      </form>
    </div>
  );
}