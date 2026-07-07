import { useEffect, useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCamera, FaSave, FaEdit } from "react-icons/fa";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { customerAPI } from "../services/userAPI";

export default function AdminProfile() {
  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const userId = userSession?.id || userSession?.user_id;
  const userRole = userSession?.role || "";

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    role: userRole,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const users = await customerAPI.getAllMembers();
      const currentUser = users.find(u => 
        u.id === userId || 
        u.user_id === userId || 
        u.email === userSession?.email
      );
      if (currentUser) {
        setProfile({
          fullName: currentUser.fullName || "",
          email: currentUser.email || "",
          role: currentUser.role || userRole,
        });
      }
    } catch (error) {
      console.error("Gagal memuat profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        fullName: profile.fullName,
        email: profile.email,
      };
      await customerAPI.updateMember(userId, payload);
      
      // Update session
      const updatedSession = { ...userSession, ...payload };
      localStorage.setItem("user_session", JSON.stringify(updatedSession));
      
      alert("Profil berhasil diperbarui!");
      setIsEditing(false);
    } catch (error) {
      console.error("Gagal menyimpan profil:", error);
      alert("Gagal menyimpan profil. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const getInitial = () => {
    return profile.fullName ? profile.fullName.charAt(0).toUpperCase() : "U";
  };

  if (isLoading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Memuat profil...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title="Profil Saya" breadcrumb="Dashboard / Profil" />

      <div className="mt-6 max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-8 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-[#DEE33E] flex items-center justify-center text-3xl font-black text-gray-800 uppercase mx-auto">
                {getInitial()}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-gray-800">
                  <FaCamera size={14} />
                </button>
              )}
            </div>
            <h2 className="text-xl font-black text-white mt-4">{profile.fullName || "User Bengkel"}</h2>
            <span className="inline-block mt-2 px-3 py-1 bg-[#DEE33E] text-gray-800 text-xs font-bold rounded-full uppercase">
              {profile.role}
            </span>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <FaUser size={12} /> Nama Lengkap
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black outline-none disabled:opacity-60"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <FaEnvelope size={12} /> Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black outline-none disabled:opacity-60"
                placeholder="email@example.com"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#DEE33E] text-gray-800 font-bold py-3 rounded-xl hover:bg-[#c2c72f] disabled:opacity-50"
                  >
                    <FaSave size={14} />
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      fetchProfile();
                    }}
                    className="px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-700"
                >
                  <FaEdit size={14} />
                  Edit Profil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
