import { useState } from "react";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";

export default function ServiceSimulation() {
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [selectedMechanic, setSelectedMechanic] = useState("Belum Ditunjuk");
  const [activeAccordion, setActiveAccordion] = useState(1);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-outfit pb-12">
      <Container>
        <PageHeader title="Simulasi Penugasan" breadcrumb="Dashboard / Simulasi" />
        <p className="text-sm text-gray-500 mb-8 -mt-4">
          Sistem pusat kendali simulasi penugasan montir, alokasi antrean mekanik, dan panduan taktis operasional bengkel secara real-time.
        </p>

        {/* PEMBERITAHUAN BANNER UTAMA */}
        {isAlertOpen && (
          <div className="alert bg-[#DEE33E]/10 border border-[#DEE33E] text-black rounded-2xl flex justify-between p-4 mb-8 shadow-sm">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-black w-6 h-6 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="font-extrabold text-sm block">Sistem Pemantauan Antrean Aktif</span>
                <span className="text-xs text-gray-600">Pastikan penunjukan montir disesuaikan dengan ketersediaan ruang pengerjaan dan keahlian divisi masing-masing.</span>
              </div>
            </div>
            <button onClick={() => setIsAlertOpen(false)} className="btn btn-xs btn-circle btn-ghost font-bold text-gray-700">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* PILIHAN DROPDOWN MONTIR */}
          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
              1. Penunjukan Montir Bengkel
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Alokasikan montir standby secara berkala ke dalam antrean pengerjaan unit berdasarkan jenis kendala motor matic pelanggan.
            </p>
            
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="btn btn-sm w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-700 font-bold justify-between px-4 py-2 h-10 transition-all">
                <span>Montir yang Bertugas: {selectedMechanic}</span>
                <span>▾</span>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-xl w-full border border-gray-100 mt-1 text-xs font-bold text-gray-600">
                <li><button type="button" onClick={() => setSelectedMechanic("Ahmad - Ahli Transmisi CVT")} className="py-2 hover:bg-gray-50 rounded-lg text-left w-full">Ahmad - Ahli Transmisi CVT</button></li>
                <li><button type="button" onClick={() => setSelectedMechanic("Budi - Spesialis Kelistrikan")} className="py-2 hover:bg-gray-50 rounded-lg text-left w-full">Budi - Spesialis Kelistrikan</button></li>
                <li><button type="button" onClick={() => setSelectedMechanic("Dedi - Mekanik Engine Overhaul")} className="py-2 hover:bg-gray-50 rounded-lg text-left w-full">Dedi - Mekanik Engine Overhaul</button></li>
              </ul>
            </div>
          </div>

          {/* DAFTAR ACCORDION PANDUAN KERUSAKAN */}
          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
              2. Panduan Mengatasi Kendala Motor
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Daftar referensi penanganan indikasi keluhan teknis darurat sebagai panduan standar operasional penanganan unit BengkelGo.
            </p>

            <div className="space-y-3">
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden transition-all">
                <button 
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 1 ? 0 : 1)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-xs font-extrabold text-gray-800 hover:bg-gray-100/50 transition-colors"
                >
                  <span>Kendala: Akselerasi gas motor tersendat / brebet?</span>
                  <span className="text-gray-400 font-normal">{activeAccordion === 1 ? "▲" : "▼"}</span>
                </button>
                
                {activeAccordion === 1 && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-500 border-t border-gray-100/60 bg-white">
                    <p className="leading-relaxed">Lakukan pengecekan menyeluruh pada jalur tekanan injektor, kebersihan filter udara, serta ukur celah pengapian busi utama.</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden transition-all">
                <button 
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 2 ? 0 : 2)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-xs font-extrabold text-gray-800 hover:bg-gray-100/50 transition-colors"
                >
                  <span>Kendala: Suara mendesing atau berdecit pada blok CVT?</span>
                  <span className="text-gray-400 font-normal">{activeAccordion === 2 ? "▲" : "▼"}</span>
                </button>
                
                {activeAccordion === 2 && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-500 border-t border-gray-100/60 bg-white">
                    <p className="leading-relaxed">Identifikasi ketebalan komponen roller dan cek tingkat keretakan v-belt. Bersihkan sisa gesekan lalu lumasi ulang menggunakan grease khusus CVT.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}