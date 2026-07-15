import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import Card from "../components/Card";
import Table from "../components/Table";
import Footer from "../components/Footer";

export default function Components() {
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  const products = [
    { id: 1, name: "Suku Cadang Rem", category: "Sparepart", price: "Rp 150.000" },
    { id: 2, name: "Oli Mesin Matic", category: "Pelumas", price: "Rp 75.000" },
    { id: 3, name: "Ban Luar Tubeless", category: "Ban", price: "Rp 250.000" }
  ];

  return (
    <div id="playground-container" className="min-h-screen bg-[#F8F9FA] font-outfit pb-12 flex flex-col justify-between">
      <Container className="flex-1">
        <PageHeader title="Katalog Suku Cadang" breadcrumb="Komponen" />
        <p className="text-sm text-gray-500 mb-8 -mt-4">
          Lembar pengecekan variasi visual dan bentuk fisik komponen rakitan aplikasi BengkelGo.
        </p>

        <hr className="mb-8 border-gray-200" />

        {/* BAGIAN 1: TOMBOL DAN PENANDA */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">1. Tombol &amp; Penanda Status</h2>
          <Card className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pilihan Variasi Tombol</h3>
              <div className="flex gap-3 flex-wrap">
                <Button type="primary">Simpan Data</Button>
                <Button type="secondary">Kembali</Button>
                <Button type="danger">Hapus</Button>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Label Status Kendaraan</h3>
              <div className="flex gap-3">
                <Badge type="success">Selesai</Badge>
                <Badge type="warning">Antre</Badge>
                <Badge type="danger">Batal</Badge>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Foto Identitas Montir</h3>
              <div className="flex gap-3">
                <Avatar name="Naila" image="/img/naila.jpeg" />
                <Avatar name="Andriana" />
                <Avatar name="Vacinzo" />
              </div>
            </div>
          </Card>
        </section>

        {/* BAGIAN 2: KARTU DISPLAY MATERIAL */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">2. Tampilan Kotak Informasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Card className="space-y-4">
              <div className="h-44 bg-gray-100 rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=600" 
                  alt="Servis Berkala" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#DEE33E] text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Paket Servis
                </span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-800">Paket Servis Rutin</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Pembersihan sistem injeksi, pengecekan pengapian, filter udara, dan penyetelan stasioner mesin agar performa kembali optimal.
                </p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <span className="text-base font-black text-gray-900">Rp 120.000</span>
                <Button type="primary">Pilih Servis</Button>
              </div>
            </Card>

            <Card className="space-y-4">
              <div className="h-44 bg-gray-100 rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500" 
                  alt="Sparepart" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#DEE33E] text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Oli Mesin
                </span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-800">Oli Sintetis Premium</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Pelumas mesin berperforma tinggi khusus motor matic. Melindungi komponen gesek dari suhu ekstrem dan menghemat konsumsi bahan bakar.
                </p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <span className="text-base font-black text-gray-900">Rp 85.000</span>
                <Button type="primary">Detail</Button>
              </div>
            </Card>

          </div>
        </section>

        {/* BAGIAN 3: TABEL HARGA MATERIAL */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">3. Tabel Suku Cadang</h2>
          <Card>
            <Table headers={headers}>
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-500">{index + 1}</td>
                  <td className="py-4 px-4 font-bold text-gray-800">{product.name}</td>
                  <td className="py-4 px-4">
                    <Badge type={product.category === "Sparepart" ? "success" : "warning"}>
                      {product.category}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 font-extrabold text-gray-900">{product.price}</td>
                  <td className="py-4 px-4">
                    <Button type="secondary">Detail</Button>
                  </td>
                </tr>
              ))}
            </Table>
          </Card>
        </section>
      </Container>
      <Footer />
    </div>
  );
}