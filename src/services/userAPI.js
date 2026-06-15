import axios from "axios";

const API_URL = "https://pehwwztrbeupnnvnjsnq.supabase.co/rest/v1/bengkel_users";
const API_KEY = "sb_publishable_59d0MhZa_UBrmJJz5s0OMQ_aUpCiETU";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const customerAPI = {
  // 1. Ambil semua user dari database Supabase (Dibuat global tanpa filter role tebang pilih)
  async getAllMembers() {
    try {
      const response = await axios.get(`${API_URL}?order=created_at.desc`, { headers });
      // PROTEKSI: Jika data dari server kosong atau undefined, otomatis kembalikan array kosong []
      return response.data || []; 
    } catch (error) {
      console.error("Gagal mengambil data dari Supabase bengkel_users:", error);
      return []; // Kembalikan array kosong agar aplikasi tidak crash
    }
  },

  // 2. Ambil 1 member berdasarkan id
  async getMemberById(id) {
    try {
      const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      console.error(`Gagal mengambil data member ID ${id}:`, error);
      return null;
    }
  },

  // 3. Update data member (nama, email, dll)
  async updateMember(id, payload) {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, payload, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      console.error(`Gagal mengupdate data member ID ${id}:`, error);
      throw error;
    }
  },

  // 4. Tambah user staff/owner baru (Pendaftaran / Register)
  async registerUser(userData) {
    const response = await axios.post(API_URL, userData, { headers });
    return response.data;
  }
};