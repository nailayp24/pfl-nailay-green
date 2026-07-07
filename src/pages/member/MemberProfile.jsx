import { useEffect, useState } from "react";
import { FaUser, FaCrown, FaEnvelope, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { customerAPI } from "../../services/userAPI";

export default function MemberProfile() {
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem("user_session")));
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      const session = JSON.parse(localStorage.getItem("user_session"));
      const memberId = session?.id;
      if (!memberId) return;

      const memberRecord = await customerAPI.getMemberById(memberId);
      if (memberRecord) {
        const nextProfile = { ...session, ...memberRecord };
        localStorage.setItem("user_session", JSON.stringify(nextProfile));
        setProfile(nextProfile);
      }
    };

    loadProfile();
  }, []);

  const membershipTier = profile?.tier || "Bronze";
  const memberId = profile?.id;

  const startEdit = () => {
    setEditForm({
      fullName: profile?.fullName || "",
      email: profile?.email || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!memberId) {
      alert("Mohon login ulang untuk memperbarui profil.");
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        fullName: editForm.fullName,
        email: editForm.email,
      };
      const updated = await customerAPI.updateMember(memberId, payload);
      const newProfile = { ...profile, ...payload, ...(updated || {}) };
      setProfile(newProfile);
      localStorage.setItem("user_session", JSON.stringify(newProfile));
      setIsEditing(false);
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      alert("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const getInitial = () => {
    const name = profile?.fullName || "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="space-y-4 font-outfit text-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-800 tracking-tight">Profil Saya</h1>
          <p className="text-xs text-gray-400 mt-0.5">Kelola informasi akun Anda</p>
        </div>
        {!isEditing ? (
          <button
            onClick={startEdit}
            className="flex items-center gap-2 bg-gray-800 text-white font-bold px-4 py-2 rounded-xl hover:bg-gray-700 text-sm"
          >
            <FaEdit size={12} /> Edit Profil
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 text-sm"
            >
              <FaTimes size={12} /> Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-red-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-red-700 disabled:opacity-50 text-sm"
            >
              <FaSave size={12} /> {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-6 sm:px-6 text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-2xl font-black text-white uppercase mx-auto">
              {getInitial()}
            </div>
          </div>
          <h2 className="text-lg font-black text-white mt-3">
            {isEditing ? editForm.fullName : (profile?.fullName || "Member")}
          </h2>
          <span className="inline-block mt-2 px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full uppercase">
            {membershipTier}
          </span>
        </div>

        {/* Form Fields */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Nama */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              <FaUser size={10} /> Nama Lengkap
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-black outline-none"
              />
            ) : (
              <p className="text-sm font-bold text-gray-800 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                {profile?.fullName || "-"}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              <FaEnvelope size={10} /> Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-black outline-none"
              />
            ) : (
              <p className="text-sm font-bold text-gray-800 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                {profile?.email || "-"}
              </p>
            )}
          </div>

          {/* Tier Info */}
          <div className="pt-4 border-t border-gray-100">
            <div className="bg-red-600/10 rounded-xl p-4 text-center border border-red-600/30">
              <FaCrown className="text-red-600 mx-auto mb-2" size={20} />
              <p className="text-[10px] text-gray-500 font-bold uppercase">Tier Anda</p>
              <p className="text-lg font-black text-gray-800 mt-1 uppercase">{membershipTier}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
