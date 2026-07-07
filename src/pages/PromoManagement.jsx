import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaTag, FaCalendarAlt, FaPercent } from "react-icons/fa";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { customerAPI } from "../services/userAPI";

export default function PromoManagement() {
  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const userRole = userSession?.role || "";
  const canDelete = userRole === "Owner";

  const [promoData, setPromoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Form states
  const [newPromo, setNewPromo] = useState({
    code: "",
    name: "",
    discount: "",
    expDate: "",
    type: "Kupon",
    description: "",
    minPurchase: ""
  });
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    setIsLoading(true);
    try {
      const promos = await customerAPI.getAllPromos();
      setPromoData(promos || []);
    } catch (error) {
      console.error("Gagal memuat promo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newPromo.code || !newPromo.name || !newPromo.discount) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        code: newPromo.code.toUpperCase(),
        name: newPromo.name,
        discount: newPromo.discount,
        exp_date: newPromo.expDate,
        type: newPromo.type,
        description: newPromo.description,
        min_purchase: newPromo.minPurchase
      };
      await customerAPI.createPromo(payload);
      setIsModalOpen(false);
      setNewPromo({ code: "", name: "", discount: "", expDate: "", type: "Kupon", description: "", minPurchase: "" });
      fetchPromos();
    } catch (error) {
      console.error("Gagal membuat promo:", error);
      alert("Gagal membuat promo. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const payload = {
        code: editForm.code?.toUpperCase(),
        name: editForm.name,
        discount: editForm.discount,
        exp_date: editForm.expDate || editForm.exp_date,
        type: editForm.type,
        description: editForm.description,
        min_purchase: editForm.minPurchase || editForm.min_purchase
      };
      await customerAPI.updatePromo(editModal.id, payload);
      setEditModal(null);
      fetchPromos();
    } catch (error) {
      console.error("Gagal memperbarui promo:", error);
      alert("Gagal memperbarui promo. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (promoId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus promo ini?")) return;
    setDeletingId(promoId);
    try {
      await customerAPI.deletePromo(promoId);
      fetchPromos();
    } catch (error) {
      console.error("Gagal menghapus promo:", error);
      alert("Gagal menghapus promo. Silakan coba lagi.");
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (promo) => {
    setEditModal(promo);
    setEditForm({
      code: promo.code || "",
      name: promo.name || "",
      discount: promo.discount || "",
      expDate: promo.exp_date || promo.expDate || "",
      type: promo.type || "Kupon",
      description: promo.description || "",
      minPurchase: promo.min_purchase || promo.minPurchase || ""
    });
  };

  const normalizePromo = (p) => ({
    id: p.id || p.promo_id || p.uuid || "PR-000",
    code: p.code || p.promo_code || "-",
    name: p.name || p.promo_name || p.title || "-",
    discount: p.discount || p.discount_value || p.discount_amount || "0",
    expDate: p.exp_date || p.expDate || p.expiry_date || "-",
    type: p.type || p.promo_type || "Kupon",
    description: p.description || p.desc || "-",
    minPurchase: p.min_purchase || p.minPurchase || "-"
  });

  const filteredPromos = promoData
    .map(normalizePromo)
    .filter((p) => {
      const matchSearch = [p.code, p.name, p.type].some((f) =>
        String(f || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchType = filterType === "All" || p.type === filterType;
      return matchSearch && matchType;
    });

  return (
    <Container>
      <PageHeader title="Manajemen Promo" breadcrumb="Dashboard / Promo" />

      <div className="mt-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-gray-900">Daftar Promo</h2>
            <p className="text-xs text-gray-500 mt-1">Kelola promo dan diskon untuk pelanggan</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#DEE33E] text-gray-800 font-bold px-4 py-2.5 rounded-xl hover:bg-[#c2c72f] text-sm"
          >
            <FaPlus size={12} /> Tambah Promo
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari kode atau nama promo..."
              className="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-black outline-none"
            />
          </div>
          <div className="relative sm:w-40">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-black outline-none appearance-none"
            >
              <option value="All">Semua Tipe</option>
              <option value="Kupon">Kupon</option>
              <option value="Diskon">Diskon</option>
              <option value="Cashback">Cashback</option>
            </select>
          </div>
        </div>

        {/* Promo Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Memuat data promo...</div>
        ) : filteredPromos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FaTag className="mx-auto text-4xl text-gray-300 mb-3" />
            <p>Belum ada promo tersedia</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPromos.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 bg-[#DEE33E]/20 rounded-xl flex items-center justify-center">
                      <FaTag className="text-[#DEE33E]" size={16} />
                    </span>
                    <div>
                      <p className="font-mono font-bold text-sm text-gray-800">{promo.code}</p>
                      <p className="text-[10px] text-gray-400 uppercase">{promo.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditModal(promo)}
                      className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                      title="Edit"
                    >
                      <FaEdit size={11} />
                    </button>
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(promo.id)}
                        disabled={deletingId === promo.id}
                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50"
                        title="Hapus"
                      >
                        <FaTrash size={11} />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-1">{promo.name}</h3>
                {promo.description && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{promo.description}</p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-red-500">
                    <FaPercent size={12} />
                    <span className="font-bold text-sm">{promo.discount}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                    <FaCalendarAlt size={10} />
                    <span>{promo.expDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-900">Tambah Promo Baru</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Kode Promo *</label>
                <input
                  type="text"
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none uppercase"
                  placeholder="DISKON50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Nama Promo *</label>
                <input
                  type="text"
                  value={newPromo.name}
                  onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none"
                  placeholder="Diskon Akhir Tahun"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Diskon (%) *</label>
                  <input
                    type="number"
                    value={newPromo.discount}
                    onChange={(e) => setNewPromo({ ...newPromo, discount: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Tipe</label>
                  <select
                    value={newPromo.type}
                    onChange={(e) => setNewPromo({ ...newPromo, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none"
                  >
                    <option value="Kupon">Kupon</option>
                    <option value="Diskon">Diskon</option>
                    <option value="Cashback">Cashback</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Berlaku Sampai</label>
                <input
                  type="date"
                  value={newPromo.expDate}
                  onChange={(e) => setNewPromo({ ...newPromo, expDate: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Deskripsi</label>
                <textarea
                  value={newPromo.description}
                  onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none resize-none"
                  placeholder="Deskripsi promo..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleCreate}
                disabled={isSaving}
                className="flex-1 py-2.5 bg-[#DEE33E] text-gray-800 font-bold rounded-xl hover:bg-[#c2c72f] disabled:opacity-50 text-sm"
              >
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-900">Edit Promo</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Kode Promo</label>
                <input
                  type="text"
                  value={editForm.code || ""}
                  onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none uppercase"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Nama Promo</label>
                <input
                  type="text"
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Diskon (%)</label>
                  <input
                    type="number"
                    value={editForm.discount || ""}
                    onChange={(e) => setEditForm({ ...editForm, discount: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Tipe</label>
                  <select
                    value={editForm.type || "Kupon"}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none"
                  >
                    <option value="Kupon">Kupon</option>
                    <option value="Diskon">Diskon</option>
                    <option value="Cashback">Cashback</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Berlaku Sampai</label>
                <input
                  type="date"
                  value={editForm.expDate || ""}
                  onChange={(e) => setEditForm({ ...editForm, expDate: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Deskripsi</label>
                <textarea
                  value={editForm.description || ""}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                disabled={isSaving}
                className="flex-1 py-2.5 bg-[#DEE33E] text-gray-800 font-bold rounded-xl hover:bg-[#c2c72f] disabled:opacity-50 text-sm"
              >
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
