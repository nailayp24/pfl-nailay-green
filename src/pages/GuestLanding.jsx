import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCar, FaCalendarCheck, FaExclamationTriangle, FaUserShield, FaSignInAlt, 
  FaUser, FaPhone, FaEnvelope, FaTimes, FaPaperPlane, FaWrench, FaShieldAlt, 
  FaTools, FaMedal, FaClock, FaMoneyBillWave, FaChevronRight, FaCheckCircle,
  FaStar, FaOilCan, FaCarBattery, FaSnowflake, FaCogs, FaMapMarkerAlt,
  FaUsers, FaRobot, FaBullhorn, FaChartLine, FaCrown, FaWhatsapp, FaEnvelopeOpenText,
  FaCommentDots, FaDatabase, FaMagic, FaLayerGroup, FaComments, FaThumbsUp,
  FaBolt, FaGift, FaPercentage, FaTicketAlt
} from "react-icons/fa";
import { BsChatLeftDots, BsRobot, BsShieldCheck, BsWhatsapp, BsEnvelope } from "react-icons/bs";

export default function GuestLanding() {
  const navigate = useNavigate();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", vehicle: "", date: "", service: "Service Berkala" });

  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [complaintForm, setComplaintForm] = useState({ name: "", email: "", category: "Layanan Staff", message: "", channel: "WhatsApp" });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Halo! Saya Assistant BengkelGo. Ada yang bisa saya bantu?", type: "text" },
    { sender: "bot", text: "Pilih topik di bawah:", type: "quickreply", options: ["Promo Hari Ini", "Booking Service", "Kirim ke WhatsApp", "Kirim ke Email"] }
  ]);
  const [chatInput, setChatInput] = useState("");

  const promoCards = [
    { id: 1, title: "Spooring & Balancing", price: "Rp 175.000", oldPrice: "Rp 250.000", disc: "30%", icon: <FaTools />, tag: "Presisi Computerized", memberOnly: false },
    { id: 2, title: "Oli Shell Helix Ultra 4L", price: "Rp 480.000", oldPrice: "Rp 600.000", disc: "20%", icon: <FaOilCan />, tag: "Full Synthetic", memberOnly: false },
    { id: 3, title: "Service AC Mobil Dingin", price: "Rp 199.000", oldPrice: "Rp 400.000", disc: "50%", icon: <FaSnowflake />, tag: "Khusus Member Gold", memberOnly: true },
    { id: 4, title: "General Check-Up 50 Titik", price: "GRATIS", oldPrice: "Rp 200.000", disc: "100%", icon: <FaCogs />, tag: "Member Platinum", memberOnly: true },
  ];

  const services = [
    { icon: <FaWrench />, title: "Service Berkala", desc: "Perawatan rutin sesuai kilometer & rekomendasi pabrikan." },
    { icon: <FaCarBattery />, title: "Kelistrikan & ECU", desc: "Diagnosa komputer untuk sistem elektrikal & sensor modern." },
    { icon: <FaSnowflake />, title: "Service AC Mobil", desc: "Cuci evaporator, freon R134a, cek kebocoran, ganti filter kabin." },
    { icon: <FaTools />, title: "Kaki-Kaki & Suspensi", desc: "Spooring, balancing, ganti shockbreaker, bushing arm." },
    { icon: <FaCogs />, title: "Overhaul Mesin", desc: "Turun mesin, ganti ring piston, head gasket, timing belt." },
    { icon: <FaShieldAlt />, title: "Body Repair & Cat", desc: "Perbaikan body penyok, pengecatan oven booth premium." },
  ];

  const testimonials = [
    { name: "Bpk. Hendra Wijaya", car: "Toyota Fortuner 2022", rating: 5, text: "Mekanik ramah & teliti, AC yang sebelumnya tidak dingin langsung sejuk. Harga transparan, tidak ada biaya siluman.", tier: "Member Platinum" },
    { name: "Ibu Sari Dewi", car: "Honda Brio 2021", rating: 5, text: "Pertama kali bawa mobil ke bengkel ini. Proses booking via web mudah, antrean cepat. Ruang tunggu nyaman ada WiFi.", tier: "Member Gold" },
    { name: "Bpk. Rizky Pratama", car: "Mitsubishi Pajero Sport", rating: 5, text: "Sudah langganan 3 tahun. Part original 100%, garansi service jelas. Recommended untuk service mobil Eropa & Jepang.", tier: "Member Platinum" },
  ];

  // Membership Tiers
  const membershipTiers = [
    {
      name: "Silver",
      price: "Gratis",
      color: "from-gray-400 to-gray-500",
      bgColor: "bg-gray-50",
      icon: <FaMedal />,
      features: ["Booking online", "Riwayat service 1 tahun", "Notif promo via email", "Diskon 5% semua layanan"],
      popular: false
    },
    {
      name: "Gold",
      price: "Rp 150.000/th",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      icon: <FaCrown />,
      features: ["Semua fitur Silver", "Prioritas booking (tanpa antre)", "Diskon 15% + gratis cuci mobil", "Notif promo via WhatsApp", "CRM riwayat seumur hidup", "Akses dashboard member"],
      popular: true
    },
    {
      name: "Platinum",
      price: "Rp 500.000/th",
      color: "from-gray-900 to-black",
      bgColor: "bg-gray-900",
      icon: <FaCrown className="text-amber-400" />,
      features: ["Semua fitur Gold", "Free general check-up tiap bulan", "Gratis mobil pengganti (max 3 jam)", "Personal service advisor", "Diskon 25% semua part & jasa", "Broadcast promo eksklusif", "Dashboard CRM lengkap"],
      popular: false
    },
  ];

  // System Features showcase
  const systemFeatures = [
    { icon: <FaDatabase className="text-blue-500" />, title: "CRM Terpadu", desc: "Database pelanggan lengkap dengan riwayat service, preferensi, & segmentasi otomatis." },
    { icon: <FaMagic className="text-purple-500" />, title: "Automation Smart", desc: "Auto-reminder service berkala, follow-up komplain, & notifikasi promo berdasarkan riwayat." },
    { icon: <FaBullhorn className="text-amber-500" />, title: "Broadcast Promo", desc: "Kirim promo ke ribuan customer sekaligus. Sistem komentar & tracking engagement real-time." },
    { icon: <FaChartLine className="text-green-500" />, title: "Dashboard Analytics", desc: "Monitor performa bengkel, revenue, customer retention, & KPI mekanik di satu tempat." },
    { icon: <FaRobot className="text-cyan-500" />, title: "AI Chatbot 24/7", desc: "Chatbot pintar dengan routing otomatis: pertanyaan ke WhatsApp, komplain formal ke Email." },
    { icon: <FaLayerGroup className="text-red-500" />, title: "Multi-Dashboard", desc: "Dashboard terpisah untuk Admin, Kasir, Mekanik, & Member. Fokus sesuai peran masing-masing." },
  ];

  // Broadcast Promo Examples
  const broadcastExamples = [
    {
      title: "🔥 Flash Sale Oli Synthetic!",
      content: "Khusus member Gold & Platinum: Oli Shell Helix Ultra 4L hanya Rp 399.000 (normal Rp 600.000). Berlaku 24 jam!",
      sentTo: "1,247 members",
      time: "2 jam lalu",
      stats: { read: 892, clicked: 234, booked: 47 }
    },
    {
      title: "⚠️ Reminder Service Berkala",
      content: "Halo Bpk. Hendra, sudah 10.000 km sejak service terakhir. Yuk booking sekarang dan dapatkan diskon 15% khusus hari ini!",
      sentTo: "Personal (CRM Trigger)",
      time: "Kemarin",
      stats: { read: 1, clicked: 1, booked: 1 }
    }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`📅 [GUEST CRM] Sukses mengunci antrean!\nUnit: ${bookingForm.vehicle}\nKasir kami akan konfirmasi via WhatsApp ke ${bookingForm.phone}.`);
    setIsBookingOpen(false);
    setBookingForm({ name: "", phone: "", vehicle: "", date: "", service: "Service Berkala" });
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    const channelMsg = complaintForm.channel === "WhatsApp" 
      ? `Kami akan follow-up via WhatsApp ke nomor terdaftar dalam 1 jam.`
      : `Respon resmi akan dikirim ke email ${complaintForm.email} dalam 24 jam.`;
    alert(`⚠️ [COMPLAINT REGISTERED]\nKeluhan atas nama [${complaintForm.name}] berhasil masuk ke sistem CRM.\n\n📲 Channel Respon: ${complaintForm.channel}\n${channelMsg}`);
    setIsComplaintOpen(false);
    setComplaintForm({ name: "", email: "", category: "Layanan Staff", message: "", channel: "WhatsApp" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { sender: "user", text: chatInput, type: "text" }]);
    const input = chatInput.toLowerCase();
    setChatInput("");
    
    setTimeout(() => {
      let botResponse;
      if (input.includes("promo")) {
        botResponse = { text: "🔥 Promo Aktif:\n• Spooring 30% OFF\n• Oli Shell 20% OFF\n• AC Service 50% (Member Gold)\n\nMau booking promo?", type: "quickreply", options: ["Ya, Booking Sekarang", "Info Member"] };
      } else if (input.includes("lokasi") || input.includes("alamat")) {
        botResponse = { text: "📍 Workshop kami di Jl. Rumbai No. 45, Pekanbaru (Dekat Kampus PCR).\nBuka Senin-Sabtu 08.00-18.00 WIB", type: "text" };
      } else if (input.includes("wa") || input.includes("whatsapp")) {
        botResponse = { text: "📱 Kami arahkan ke WhatsApp CS kami ya! Tim kami akan merespon dalam 5 menit.", type: "redirect", channel: "WhatsApp", link: "https://wa.me/6285376297229" };
      } else if (input.includes("email") || input.includes("mail")) {
        botResponse = { text: "📧 Untuk keperluan formal (invoice, dokumen), silakan kirim ke:\ncs@bengkelgo.id\nRespon 1x24 jam.", type: "redirect", channel: "Email", link: "mailto:cs@bengkelgo.id" };
      } else if (input.includes("booking")) {
        botResponse = { text: "Saya buka form booking untuk Anda ya!", type: "trigger-booking" };
      } else {
        botResponse = { text: "Saya kurang paham. Pilih opsi di bawah atau ketik: promo, lokasi, WA, atau email.", type: "quickreply", options: ["Promo Hari Ini", "Kirim ke WhatsApp", "Kirim ke Email"] };
      }
      setChatMessages((prev) => [...prev, { sender: "bot", ...botResponse }]);
    }, 600);
  };

  const handleQuickReply = (option) => {
    setChatInput(option);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSendMessage(fakeEvent);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white font-outfit text-gray-800">
      
      {/* TOP BAR */}
      <div className="bg-gray-900 text-white/70 text-xs py-2 px-6 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-amber-500" /> Jl. Rumbai No. 45, Pekanbaru</span>
          <span className="hidden md:flex items-center gap-1.5"><FaClock className="text-amber-500" /> Senin - Sabtu: 08.00 - 18.00 WIB</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaPhone className="text-amber-500" />
          <span className="font-bold text-white">0812-3456-7890</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
            <FaWrench className="text-white text-lg" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight block leading-tight">BENGKELGO</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Auto Service Center</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/login")} className="hidden md:flex items-center gap-1.5 text-gray-600 hover:text-black font-semibold text-xs px-4 py-2 rounded-lg transition-all">
            <FaUserShield /> Admin
          </button>
          <button 
            onClick={() => navigate("/register", { state: { roleDefault: "Member" } })} 
            className="flex items-center gap-1.5 bg-gray-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-black transition-all uppercase tracking-wider"
          >
            <FaSignInAlt /> Jadi Member
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px"}}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <FaBolt /> Bengkel Pertama dengan CRM & Automation
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Bengkel Modern<br/>
              untuk <span className="text-amber-500">Mobil Kesayangan</span><br/>
              Anda
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-lg leading-relaxed">
              Lebih dari sekadar bengkel. Sistem CRM, automation, booking online, dan dashboard lengkap untuk pengalaman service terbaik.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => setIsBookingOpen(true)} className="flex items-center gap-2 bg-amber-500 text-black font-black text-sm px-7 py-4 rounded-xl shadow-xl shadow-amber-500/30 hover:bg-amber-400 hover:-translate-y-0.5 transition-all uppercase tracking-wider">
                <FaCalendarCheck /> Booking Service
                <FaChevronRight size={12} />
              </button>
              <button onClick={() => setIsComplaintOpen(true)} className="flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 text-white font-bold text-sm px-7 py-4 rounded-xl transition-all">
                <FaExclamationTriangle className="text-amber-500" /> Ajukan Komplain
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <BsShieldCheck className="text-amber-500" />
                <span>Garansi Service 3 Bulan</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <FaCheckCircle className="text-amber-500" />
                <span>Part 100% Original</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <FaRobot className="text-amber-500" />
                <span>Chatbot 24/7</span>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Live Workshop Status</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-green-400 font-semibold">Buka</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { car: "Avanza BM 1234 AA", status: "Service Berkala • 85% Selesai", bay: "Bay 1", color: "amber" },
                  { car: "Fortuner BM 5678 BB", status: "Overhaul Mesin • 40% Selesai", bay: "Bay 2", color: "blue" },
                  { car: "Brio BM 9012 CC", status: "Antrian Berikutnya • Siap Masuk", bay: "Bay 3", color: "green" },
                ].map((item, i) => (
                  <div key={i} className="bg-black/40 rounded-xl p-4 border border-gray-700 flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-lg flex items-center justify-center text-${item.color}-400`}>
                      <FaCar size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{item.car}</div>
                      <div className="text-xs text-gray-400">{item.status}</div>
                    </div>
                    <span className="text-xs font-bold text-amber-500">{item.bay}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-3 gap-2 text-center">
                <div><div className="text-xl font-black text-amber-500">5</div><div className="text-[10px] text-gray-400 uppercase">Mekanik</div></div>
                <div><div className="text-xl font-black text-amber-500">12</div><div className="text-[10px] text-gray-400 uppercase">Mobil Hari Ini</div></div>
                <div><div className="text-xl font-black text-amber-500">3</div><div className="text-[10px] text-gray-400 uppercase">Slot Kosong</div></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "15+", label: "Tahun Pengalaman", icon: <FaMedal /> },
            { num: "50K+", label: "Mobil Ditangani", icon: <FaCar /> },
            { num: "10K+", label: "Member Terdaftar (CRM)", icon: <FaUsers /> },
            { num: "4.9★", label: "Rating Kepuasan", icon: <FaStar /> },
          ].map((s, i) => (
            <div key={i} className="text-center md:text-left md:flex md:items-center md:gap-4 p-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 mx-auto md:mx-0 mb-2 md:mb-0">
                <div className="text-xl">{s.icon}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900">{s.num}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEM FEATURES - NEW SECTION */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Sistem Terintegrasi</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fitur Canggih untuk Member</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Lebih dari sekadar booking. BengkelGo dilengkapi CRM, Automation, dan Dashboard lengkap untuk pengalaman service terbaik.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {systemFeatures.map((feat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">✓ Tersedia untuk Member</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROADCAST PROMO PREVIEW - NEW */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Broadcast System</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Promo ke Ribuan Customer Sekaligus</h2>
              <p className="text-gray-500 leading-relaxed">
                Admin dapat mengirim promosi ke seluruh member berdasarkan segmentasi (Silver/Gold/Platinum). Dilengkapi sistem komentar dan tracking engagement real-time.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Segmentasi berdasarkan membership & riwayat service</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Tracking: dibaca, diklik, atau dibooking</li>
                <li className="flex items-center gap-2"><FaComments className="text-amber-500" /> Kolom komentar untuk interaksi 2-arah</li>
                <li className="flex items-center gap-2"><FaBolt className="text-amber-500" /> Trigger otomatis via CRM (misal: reminder 10.000 km)</li>
              </ul>
            </div>

            <div className="space-y-4">
              {broadcastExamples.map((b, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-gray-900 text-sm">{b.title}</h4>
                    <span className="text-[10px] text-gray-400">{b.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{b.content}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-3">
                    <span>📤 Dikirim ke: <span className="font-bold">{b.sentTo}</span></span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">👁 {b.stats.read} dibaca</span>
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded">🖱 {b.stats.clicked} diklik</span>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">✓ {b.stats.booked} booking</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex items-center gap-2">
                    <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-white text-[10px] font-black">HW</div>
                    <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-gray-500 border border-gray-100">
                      "Promo mantap! Langsung booking 💪"
                    </div>
                    <FaThumbsUp className="text-gray-400 text-xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Layanan Kami</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Service Lengkap Semua Merek Mobil</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all group cursor-pointer">
                <div className="w-14 h-14 bg-amber-500/10 group-hover:bg-amber-500 rounded-xl flex items-center justify-center text-amber-500 group-hover:text-white text-2xl transition-all mb-4">
                  {svc.icon}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{svc.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO CARDS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Promo Spesial</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Paket Harga Coret Bulan Ini</h2>
              <p className="text-sm text-gray-500 mt-2">🔒 Beberapa promo khusus untuk <span className="font-bold text-amber-600">Member Gold & Platinum</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {promoCards.map((item) => (
              <div key={item.id} className={`bg-white border-2 rounded-2xl p-6 relative group hover:shadow-xl transition-all ${item.memberOnly ? 'border-amber-500' : 'border-gray-100 hover:border-amber-500'}`}>
                {item.memberOnly && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-[9px] px-3 py-1 rounded-br-xl uppercase tracking-wider flex items-center gap-1">
                    <FaCrown size={9} /> Member Only
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-red-500 text-white font-black text-[10px] px-2 py-1 rounded uppercase tracking-wider">-{item.disc}</div>
                <div className="text-3xl text-amber-500 bg-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mt-4">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{item.tag}</span>
                <h4 className="font-black text-gray-900 text-sm uppercase leading-snug mt-1 mb-4 min-h-[40px]">{item.title}</h4>
                <div className="flex items-baseline gap-2">
                  <span className={`font-black text-xl ${item.price === 'GRATIS' ? 'text-green-600' : 'text-gray-900'}`}>{item.price}</span>
                  {item.price !== 'GRATIS' && <span className="text-gray-400 line-through text-xs">{item.oldPrice}</span>}
                </div>
                <button onClick={() => item.memberOnly ? navigate("/register") : setIsBookingOpen(true)} className="w-full mt-4 text-xs font-bold py-2.5 rounded-lg border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all uppercase tracking-wider">
                  {item.memberOnly ? 'Daftar Member' : 'Booking Sekarang'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS - NEW */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px"}}></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-500">Membership</span>
            <h2 className="text-3xl md:text-4xl font-black">Pilih Paket Sesuai Kebutuhan</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Setiap tier memberi akses ke fitur CRM, Automation, dan Dashboard yang berbeda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTiers.map((tier, i) => (
              <div key={i} className={`relative rounded-2xl p-8 border ${tier.popular ? 'border-amber-500 scale-105 shadow-2xl shadow-amber-500/20' : 'border-white/10'} bg-white/5 backdrop-blur`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    ⭐ Paling Populer
                  </div>
                )}
                <div className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4`}>
                  {tier.icon}
                </div>
                <h3 className="font-black text-2xl mb-1">{tier.name}</h3>
                <div className="text-amber-500 font-black text-xl mb-4">{tier.price}</div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <FaCheckCircle className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => navigate("/register", { state: { roleDefault: "Member", tier: tier.name } })}
                  className={`w-full py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${tier.popular ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                >
                  Daftar {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Testimoni</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Apa Kata Member Kami</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, idx) => <FaStar key={idx} size={14} />)}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-black text-sm">
                    {t.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.car}</div>
                  </div>
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded uppercase">{t.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-500 to-amber-600 text-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "24px 24px"}}></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-black leading-tight">Siap Jadi Member?</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-medium">Akses dashboard, CRM, automation, dan promo eksklusif hanya untuk member terdaftar.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button onClick={() => setIsBookingOpen(true)} className="flex items-center gap-2 bg-black text-white font-black text-sm px-8 py-4 rounded-xl shadow-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all uppercase tracking-wider">
              <FaCalendarCheck /> Booking Sekarang
            </button>
            <button onClick={() => navigate("/register", { state: { roleDefault: "Member" } })} className="flex items-center gap-2 bg-white/90 backdrop-blur text-black font-black text-sm px-8 py-4 rounded-xl hover:bg-white transition-all uppercase tracking-wider">
              <FaSignInAlt /> Daftar Member
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <FaWrench className="text-black text-sm" />
              </div>
              <span className="text-white font-black">BENGKELGO</span>
            </div>
            <p className="text-xs leading-relaxed">Sistem manajemen bengkel modern dengan CRM & Automation terlengkap di Indonesia.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Layanan</h4>
            <ul className="space-y-2 text-xs"><li>Service Berkala</li><li>Kaki-kaki & Spooring</li><li>Service AC</li><li>Body Repair</li></ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Fitur Sistem</h4>
            <ul className="space-y-2 text-xs"><li>CRM & Database</li><li>Automation</li><li>Broadcast Promo</li><li>Multi-Dashboard</li></ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-2 text-xs"><li>Jl. Rumbai No. 45, Pekanbaru</li><li>0812-3456-7890</li><li>cs@bengkelgo.id</li></ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-xs">
          © 2026 BengkelGo Mobil. All rights reserved.
        </div>
      </footer>

      {/* MODAL BOOKING */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsBookingOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
              <FaTimes />
            </button>
            <div className="mb-6 text-center">
              <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCalendarCheck className="text-amber-500 text-2xl" />
              </div>
              <h4 className="text-xl font-black text-gray-800 uppercase">Booking Kendaraan</h4>
              <p className="text-sm text-gray-500 mt-1">Pesan antrean tanpa perlu menunggu lama.</p>
            </div>
            <form onSubmit={handleBookingSubmit} className="space-y-3">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Nama Lengkap" value={bookingForm.name} onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500" />
              </div>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Nomor WhatsApp (Aktif)" value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500" />
              </div>
              <div className="relative">
                <FaCar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Unit Mobil & Plat" value={bookingForm.vehicle} onChange={(e) => setBookingForm({ ...bookingForm, vehicle: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500" />
              </div>
              <select value={bookingForm.service} onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                <option value="Service Berkala">Service Berkala Mobil</option>
                <option value="Spooring Precision">Spooring & Balancing</option>
                <option value="Service AC">Service AC</option>
                <option value="General Check-Up">General Check-Up</option>
              </select>
              <input type="datetime-local" required value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
              <button type="submit" className="w-full text-sm font-black py-3.5 rounded-xl bg-amber-500 text-black uppercase tracking-wider hover:bg-amber-400 shadow-lg shadow-amber-500/20 mt-2">
                Kunci Slot Antrean
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KOMPLAIN - UPGRADED WITH CHANNEL ROUTING */}
      {isComplaintOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsComplaintOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
              <FaTimes />
            </button>
            <div className="mb-6 text-center">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              </div>
              <h4 className="text-xl font-black text-gray-800 uppercase">Pusat Aduan</h4>
              <p className="text-sm text-gray-500 mt-1">Pilih channel respon: Cepat (WA) atau Formal (Email)</p>
            </div>
            <form onSubmit={handleComplaintSubmit} className="space-y-3">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Nama Lengkap" value={complaintForm.name} onChange={(e) => setComplaintForm({ ...complaintForm, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500" />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required placeholder="Email" value={complaintForm.email} onChange={(e) => setComplaintForm({ ...complaintForm, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500" />
              </div>
              <select value={complaintForm.category} onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50">
                <option value="Layanan Staff">Masalah Pelayanan Staff</option>
                <option value="Kualitas Part">Masalah Kualitas Part</option>
                <option value="Hasil Kerja">Hasil Kerja Tidak Sesuai</option>
                <option value="Harga">Masalah Harga/Biaya</option>
              </select>
              <textarea required rows="3" placeholder="Tulis kronologi keluhan..." value={complaintForm.message} onChange={(e) => setComplaintForm({ ...complaintForm, message: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none" />
              
              {/* CHANNEL ROUTING - NEW */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-2">Pilih Channel Respon:</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${complaintForm.channel === 'WhatsApp' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="channel" value="WhatsApp" checked={complaintForm.channel === 'WhatsApp'} onChange={(e) => setComplaintForm({ ...complaintForm, channel: e.target.value })} className="sr-only" />
                    <BsWhatsapp className="text-green-500 text-lg" />
                    <div>
                      <div className="text-xs font-bold">WhatsApp</div>
                      <div className="text-[9px] text-gray-500">Respon &lt; 1 jam</div>
                    </div>
                  </label>
                  <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${complaintForm.channel === 'Email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="channel" value="Email" checked={complaintForm.channel === 'Email'} onChange={(e) => setComplaintForm({ ...complaintForm, channel: e.target.value })} className="sr-only" />
                    <BsEnvelope className="text-blue-500 text-lg" />
                    <div>
                      <div className="text-xs font-bold">Email</div>
                      <div className="text-[9px] text-gray-500">Formal 1x24 jam</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <button type="submit" className="w-full text-sm font-black py-3.5 rounded-xl bg-black text-white uppercase tracking-wider hover:bg-gray-800 shadow-lg mt-2">
                Kirim Aduan via {complaintForm.channel}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* UPGRADED CHATBOT WITH ROUTING */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-amber-500 text-black p-4 rounded-full shadow-xl shadow-amber-500/30 hover:scale-110 transition-all relative">
          <BsChatLeftDots size={24} />
          {!isChatOpen && (
            <>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </>
          )}
        </button>
        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-gray-900 text-white p-4 font-bold text-sm flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center text-black">
                  <BsRobot size={18} />
                </div>
                <div>
                  <div className="leading-tight font-black">Assistant BengkelGo</div>
                  <div className="text-[10px] text-green-400 font-normal flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online 24/7
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <FaTimes size={14} />
              </button>
            </div>
            <div className="p-4 h-80 overflow-y-auto space-y-3 text-xs flex flex-col bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                    msg.sender === "user" ? "bg-amber-500 text-black self-end rounded-br-sm" : "bg-white text-gray-700 self-start rounded-bl-sm border border-gray-100 whitespace-pre-line"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.type === "quickreply" && msg.sender === "bot" && (
                    <div className="flex flex-wrap gap-1.5 self-start">
                      {msg.options.map((opt, i) => (
                        <button key={i} onClick={() => handleQuickReply(opt)} className="bg-white border border-amber-500 text-amber-600 text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-amber-500 hover:text-black transition-all">
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.type === "redirect" && msg.sender === "bot" && (
                    <a href={msg.link} target="_blank" rel="noopener noreferrer" className={`self-start text-[10px] font-black px-3 py-2 rounded-lg flex items-center gap-1.5 ${msg.channel === 'WhatsApp' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                      {msg.channel === 'WhatsApp' ? <BsWhatsapp /> : <BsEnvelope />}
                      Buka {msg.channel}
                    </a>
                  )}
                  {msg.type === "trigger-booking" && msg.sender === "bot" && (
                    <button onClick={() => { setIsChatOpen(false); setIsBookingOpen(true); }} className="self-start bg-amber-500 text-black text-[10px] font-black px-3 py-2 rounded-lg flex items-center gap-1.5 uppercase">
                      <FaCalendarCheck size={10} /> Buka Form Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 flex gap-2 bg-white">
              <input type="text" placeholder="Ketik pesan..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
              <button type="submit" className="bg-gray-900 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800">
                <FaPaperPlane size={12} />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}