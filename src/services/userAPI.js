import axios from "axios";

const API_URL = "https://pehwwztrbeupnnvnjsnq.supabase.co/rest/v1/bengkel_users";
const API_KEY = "sb_publishable_59d0MhZa_UBrmJJz5s0OMQ_aUpCiETU";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const userAPI = {
  // 1. Ambil data user berdasarkan email untuk proses Login
  async getUserByEmail(email) {
    const response = await axios.get(`${API_URL}?email=eq.${email}`, { headers });
    return response.data; 
  },

  // 2. Tambah user baru (Pendaftaran / Register)
  async registerUser(userData) {
    const response = await axios.post(API_URL, userData, { headers });
    return response.data;
  }
};