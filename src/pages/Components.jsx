import { useState } from "react";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import Card from "../components/Card";
import Table from "../components/Table";
import Footer from "../components/Footer"; // Import footer bengkel yang sudah disesuaikan

export default function Components() {
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  const products = [
    { id: 1, name: "Suku Cadang Rem", category: "Sparepart", price: "Rp 150.000" },
    { id: 2, name: "Oli Mesin Matic", category: "Pelumas", price: "Rp 75.000" },
    { id: 3, name: "Ban Luar Tubeless", category: "Ban", price: "Rp 250.000" }
  ];

  return (
    <div id="playground-container" className="min-h-screen flex flex-col justify-between bg-[#F8F9FA] font-outfit">
      
      <Container className="flex-1">
        {/* Menggunakan PageHeader asli bawaan project BengkelGo */}
        <PageHeader title="Katalog Komponen" breadcrumb="Components" />
        <p className="text-sm text-gray-500 mb-8 -mt-4">
          Halaman playground untuk memvalidasi variasi visual dari 15 komponen modular BengkelGo.
        </p>

        <hr className="mb-8 border-gray-200" />

        {/* SECTION 1: BASIC COMPONENTS */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">1. Basic Components</h2>
          <Card className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Buttons Variants</h3>
              <div className="flex gap-3 flex-wrap">
                <Button type="primary">Simpan (Primary)</Button>
                <Button type="secondary">Kembali (Secondary)</Button>
                <Button type="danger">Hapus (Danger)</Button>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Badges (Status Perbaikan)</h3>
              <div className="flex gap-3">
                <Badge type="success">Completed</Badge>
                <Badge type="warning">Pending</Badge>
                <Badge type="danger">Canceled</Badge>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Avatars Group</h3>
              <div className="flex gap-3">
                <Avatar name="Naila" image="/img/naila.jpeg" />
                <Avatar name="Andriana" />
                <Avatar name="Vacinzo" />
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 2: DATA DISPLAY - REUSABLE CARDS (BARU TAMBAH DI SINI) */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">2. Data Display - Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Contoh Card Pembungkus Data 1 */}
            <Card className="space-y-4">
              <div className="h-44 bg-gray-100 rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=600" 
                  alt="Service Bengkel" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#DEE33E] text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Tune Up
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

            {/* Contoh Card Pembungkus Data 2 */}
            <Card className="space-y-4">
              <div className="h-44 bg-gray-100 rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500" 
                  alt="Sparepart Bengkel" 
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

        {/* SECTION 3: DATA DISPLAY - TABLES */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">3. Data Display - Tables</h2>
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

      {/* FOOTER DI PALING BAWAH HALAMAN HIERARKI KANVAS (BARU TAMBAH DI SINI) */}
      <Footer />
      
    </div>
  );
}