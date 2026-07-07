import { useEffect, useState, useMemo } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaTimes, FaBox, FaExclamationTriangle } from "react-icons/fa";
import { customerAPI } from "../services/userAPI";

export default function Inventory() {
  const userSession = JSON.parse(localStorage.getItem("user_session"));
  const userRole = userSession?.role || "";
  const canEdit = userRole === "Owner" || userRole === "Kasir";
  const canDelete = userRole === "Owner";

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama_produk: "",
    harga: "",
    stok: "",
    deskripsi: "",
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const data = await customerAPI.getAllPromos();
      setProducts(data || []);
    } catch (error) {
      console.error("Gagal memuat inventory:", error);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const lower = searchTerm.toLowerCase();
    return products.filter((p) =>
      [p.nama_produk, p.deskripsi, String(p.id)]
        .some((field) => String(field || "").toLowerCase().includes(lower))
    );
  }, [products, searchTerm]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  const openCreateModal = () => {
    setEditMode(null);
    setFormData({ nama_produk: "", harga: "", stok: "", deskripsi: "" });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditMode(product);
    setFormData({
      nama_produk: product.nama_produk || "",
      harga: product.harga || "",
      stok: product.stok || "",
      deskripsi: product.deskripsi || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      nama_produk: formData.nama_produk,
      harga: parseFloat(formData.harga) || 0,
      stok: parseInt(formData.stok, 10) || 0,
      deskripsi: formData.deskripsi || "",
    };

    try {
      if (editMode) {
        const updated = await customerAPI.updatePromo(editMode.id, payload);
        if (updated) {
          setProducts((prev) => prev.map((p) => (p.id === editMode.id ? { ...p, ...updated } : p)));
        }
      } else {
        const created = await customerAPI.createPromo(payload);
        if (created) {
          setProducts((prev) => [created, ...prev]);
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error("Gagal menyimpan produk:", error);
      alert("Gagal menyimpan produk. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Yakin ingin menghapus "${product.nama_produk}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      await customerAPI.deletePromo(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk. Silakan coba lagi.");
    }
  };

  const lowStockCount = products.filter((p) => (p.stok || 0) <= 5).length;

  return (
    <div className="p-2 space-y-6 font-outfit">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Inventory</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Kelola stok suku cadang & produk. Terhubung real-time ke Supabase.
          </p>
        </div>
        {canEdit && (
          <button
            onClick={openCreateModal}
            className="bg-[#DEE33E] text-black px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#c2c72f] shadow-sm flex items-center gap-2 transition-all"
          >
            <FaPlus /> Tambah Produk
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
              <FaBox />
            </div>
            <div>
              <p className="text-lg font-black text-gray-900">{products.length}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Total Produk</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center border border-green-100">
              <FaBox />
            </div>
            <div>
              <p className="text-lg font-black text-gray-900">{products.reduce((sum, p) => sum + (p.stok || 0), 0)}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Total Stok</p>
            </div>
          </div>
        </div>
        {lowStockCount > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center border border-red-100">
                <FaExclamationTriangle />
              </div>
              <div>
                <p className="text-lg font-black text-red-600">{lowStockCount}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Stok Menipis</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative w-full">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama produk, deskripsi, atau ID..."
          className="w-full bg-white text-gray-700 text-xs rounded-xl py-3 pl-10 pr-4 focus:outline-none border border-gray-200 focus:border-[#DEE33E] shadow-sm transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Daftar Produk & Sparepart</h2>
            <p className="text-xs text-gray-400 mt-1">{filteredProducts.length} produk terdaftar di database.</p>
          </div>
          <button
            onClick={fetchProducts}
            className="text-[10px] px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-bold"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100 bg-gray-50/50">
                <th className="py-3 px-4 rounded-l-xl">ID</th>
                <th className="py-3 px-4">Nama Produk</th>
                <th className="py-3 px-4">Deskripsi</th>
                <th className="py-3 px-4">Stok</th>
                <th className="py-3 px-4 text-right">Harga</th>
                {canEdit && <th className="py-3 px-4 rounded-r-xl text-center">Aksi</th>}
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={canEdit ? 6 : 5} className="py-8 text-center text-gray-500">Memuat data inventory...</td>
                </tr>
              ) : loadError ? (
                <tr>
                  <td colSpan={canEdit ? 6 : 5} className="py-8 text-center text-red-500">Gagal memuat data. Coba refresh.</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={canEdit ? 6 : 5} className="py-8 text-center text-gray-500">
                    {searchTerm ? "Tidak ada produk yang cocok." : "Belum ada produk. Klik 'Tambah Produk' untuk menambah."}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-gray-400">{item.id}</td>
                    <td className="py-4 px-4 font-extrabold text-gray-800">{item.nama_produk}</td>
                    <td className="py-4 px-4 text-gray-500 max-w-[200px] truncate">{item.deskripsi || "-"}</td>
                    <td className="py-4 px-4">
                      <span className={`font-black px-2 py-1 rounded-lg text-[10px] ${
                        (item.stok || 0) <= 5
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : (item.stok || 0) <= 20
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-green-50 text-green-600 border border-green-200"
                      }`}>
                        {item.stok || 0} Unit
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-black text-gray-900">{formatCurrency(parseFloat(item.harga) || 0)}</td>
                    {canEdit && (
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all border border-blue-100"
                            title="Edit Produk"
                          >
                            <FaEdit size={12} />
                          </button>
                          {canDelete && (
                            <button
                              onClick={() => handleDelete(item)}
                              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all border border-red-100"
                              title="Hapus Produk"
                            >
                              <FaTrash size={12} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white border border-gray-100 rounded-[24px] shadow-2xl max-w-md w-full p-6">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <FaTimes />
            </button>
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-1">
              {editMode ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              {editMode ? "Perubahan akan langsung tersimpan ke Supabase." : "Produk baru akan ditambahkan ke database."}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Oli Mesin Matic 1L"
                  value={formData.nama_produk}
                  onChange={(e) => setFormData({ ...formData, nama_produk: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    required
                    placeholder="65000"
                    value={formData.harga}
                    onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Stok</label>
                  <input
                    type="number"
                    required
                    placeholder="45"
                    value={formData.stok}
                    onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Deskripsi</label>
                <textarea
                  rows="2"
                  placeholder="Deskripsi singkat produk..."
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:border-black outline-none resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 text-xs text-gray-400 font-bold hover:text-gray-600 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#DEE33E] text-black font-bold py-2.5 text-xs rounded-xl hover:bg-[#c2c72f] disabled:opacity-50 transition-all shadow-sm"
                >
                  {isSubmitting ? "Menyimpan..." : editMode ? "Simpan Perubahan" : "Tambah Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
