import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaCar,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaQuestionCircle,
  FaShieldAlt,
  FaSignInAlt,
  FaStar,
  FaTimes,
  FaTools,
  FaUserShield,
  FaWrench,
} from "react-icons/fa";
import heroImage from "../assets/hero.jpg";
import { customerAPI } from "../services/userAPI";

export default function GuestLanding() {
  const navigate = useNavigate();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Halo! Saya asisten virtual BengkelGo. Pilih salah satu untuk bantuan cepat." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatTrigger, setChatTrigger] = useState(null);
  const [promoCards, setPromoCards] = useState([]);
  const [isLoadingPromos, setIsLoadingPromos] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const accessBarrier = () => {
    alert("Akses Terbatas! Anda diwajibkan untuk masuk atau mendaftar.");
    navigate("/login");
  };

  const handleLoginTrigger = () => {
    navigate("/login");
  };

  const quickReplies = [
    { label: "Info Promo", value: "promo" },
    { label: "Jadwal Service", value: "jadwal" },
    { label: "Hubungi CS", value: "cs" },
  ];

  const handleQuickReply = (reply) => {
    setChatMessages((prev) => [...prev, { sender: "user", text: reply.label }]);

    const botReplies = {
      promo: "Promo member baru: diskon 10% servis berkala + voucher spoering. Login sekarang untuk klaim.",
      jadwal: "Anda perlu masuk untuk melihat jadwal dan reservasi. Tekan tombol di bawah untuk lanjut.",
      cs: "Tim CS kami siap membantu lewat WhatsApp atau email. Masuk untuk menghubungi langsung.",
    };

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "bot", text: botReplies[reply.value] || "Maaf, saya belum mengerti. Coba pilih pilihan lain." }]);
      setChatTrigger(reply.value === "jadwal" || reply.value === "promo" ? {
        label: "Masuk untuk Lanjutkan",
        action: handleLoginTrigger,
      } : null);
    }, 250);
  };

  const handleChatInputSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const text = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setChatInput("");

    const lowerText = text.toLowerCase();
    const containsBooking = lowerText.includes("booking") || lowerText.includes("reservasi");
    const containsSchedule = lowerText.includes("jadwal");

    let botText = "Maaf, saya belum mengerti. Coba pilih opsi cepat atau masuk untuk layanan lebih lanjut.";
    let trigger = null;

    if (containsBooking || containsSchedule) {
      botText = "Untuk akses booking dan jadwal, Anda harus masuk sebagai member. Tekan tombol di bawah untuk login.";
      trigger = { label: "Masuk ke Login Member", action: handleLoginTrigger };
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "bot", text: botText }]);
      setChatTrigger(trigger);
    }, 250);
  };

  const handlePromoAction = (promo) => {
    alert(`Untuk menggunakan promo '${promo.title}', silakan masuk atau daftar terlebih dahulu.`);
    navigate("/login");
  };

  const handleSecondaryAction = () => {
    navigate("/register", { state: { roleDefault: "Member" } });
  };

  const normalizePromo = (promo) => ({
    title: promo.name || promo.title || promo.code || "Promo Tanpa Judul",
    desc: promo.description || promo.desc || `Diskon ${promo.discount || "-"} sampai ${promo.exp_date || promo.expDate || "-"}`,
    action: "Login untuk Klaim",
    type: promo.type || promo.promo_type || "promo",
  });

  const fetchPromos = useCallback(async () => {
    setIsLoadingPromos(true);
    try {
      const apiPromos = await customerAPI.getAllPromos();
      setPromoCards(apiPromos.map(normalizePromo));
    } catch (error) {
      console.error("Gagal memuat promo untuk GuestLanding:", error);
      setPromoCards([]);
    } finally {
      setIsLoadingPromos(false);
    }
  }, []);

  useEffect(() => {
    fetchPromos();
    const promoInterval = setInterval(fetchPromos, 30000);
    return () => clearInterval(promoInterval);
  }, [fetchPromos]);

  const features = [
    {
      icon: <FaCalendarCheck />,
      title: "Sistem Antrean Transparan",
      desc: "Pilih jadwal servis dari rumah dan datang saat slot Anda sudah siap, tanpa antre di lokasi.",
      tone: "amber",
    },
    {
      icon: <FaTools />,
      title: "Pantau Progres Servis",
      desc: "Status pengerjaan kendaraan terlihat jelas, dari masuk bengkel sampai selesai.",
      tone: "red",
    },
    {
      icon: <FaShieldAlt />,
      title: "Estimasi Biaya Akurat",
      desc: "Rincian biaya diberikan di awal sehingga tidak ada tagihan mendadak di akhir.",
      tone: "charcoal",
    },
    {
      icon: <FaUserShield />,
      title: "Riwayat Servis Digital",
      desc: "Setiap kunjungan tersimpan rapi, memudahkan mekanik memahami histori kendaraan Anda.",
      tone: "amber",
    },
  ];

  const featureToneClasses = {
    amber: "bg-[#DEE33E]/25 text-[#5c5f10]",
    red: "bg-red-100 text-red-700",
    charcoal: "bg-[#1F2937]/10 text-[#1F2937]",
  };

  const stats = [
    { value: "12", label: "unit aktif dipantau setiap hari" },
    { value: "4.9/5", label: "rata-rata kepuasan pelanggan" },
    { value: "10 km", label: "radius layanan jemput kendaraan" },
  ];

  const testimonials = [
    {
      name: "Hendra Wijaya",
      car: "Toyota Fortuner",
      text: "Booking dari website membuat saya tidak perlu menunggu lama. Estimasi biaya juga jelas sejak awal.",
    },
    {
      name: "Sari Dewi",
      car: "Honda Brio",
      text: "Saya suka karena riwayat servis tersimpan rapi. Saat datang lagi, staf langsung tahu kebutuhan mobil saya.",
    },
  ];

  const faqs = [
    {
      question: "Apakah booking online berbayar?",
      answer: "Tidak. Anda hanya membayar layanan servis yang dipilih.",
    },
    {
      question: "Apakah bisa datang tanpa akun?",
      answer: "Bisa, tetapi akun member membuat riwayat dan promo tersimpan otomatis.",
    },
    {
      question: "Bagaimana jika jadwal saya berubah?",
      answer: "Hubungi kasir melalui kontak resmi untuk mengatur ulang slot.",
    },
    {
      question: "Apakah biaya servis langsung final?",
      answer: "Estimasi awal diberikan dulu, lalu dikonfirmasi ulang jika ada tambahan pekerjaan.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-outfit text-[#1F2937] scroll-smooth">
      <header className="relative min-h-[92vh] overflow-hidden bg-[#F8F9FA]">
        {/* Optimized Hero Image dengan lazy loading dan object position */}
        <div className="absolute inset-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
          )}
          <img
            src={heroImage}
            alt="Mekanik profesional BengkelGo sedang melakukan servis kendaraan dengan peralatan modern"
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover object-center transition-opacity duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: "65% center" }}
          />
          {/* Gradient overlay yang lebih subtle untuk text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-[55%] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#F8F9FA]/90" />
        </div>

        {/* Blob dekoratif yang disesuaikan dengan komposisi gambar baru */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#DEE33E]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-red-100/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-[#DEE33E]/10 blur-3xl" />

        <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-left"
              aria-label="BengkelGo home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DEE33E] text-black shadow-lg">
                <FaWrench />
              </span>
              <span>
                <span className="block text-sm font-black uppercase text-[#1F2937]">BengkelGo</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Auto Service Center
                </span>
              </span>
            </button>

            <div className="hidden items-center gap-7 text-xs font-bold text-gray-500 md:flex">
              <a href="#fitur" className="hover:text-[#1F2937] transition-colors">Fitur</a>
              <a href="#tentang" className="hover:text-[#1F2937] transition-colors">Tentang</a>
              <a href="#promo" className="hover:text-[#1F2937] transition-colors">Promo</a>
              <a href="#faq" className="hover:text-[#1F2937] transition-colors">FAQ</a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-[#1F2937] sm:flex"
              >
                <FaUserShield /> Masuk
              </button>
              <button
                onClick={() => navigate("/register", { state: { roleDefault: "Member" } })}
                className="hidden items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-700 sm:flex shadow-lg shadow-red-600/25"
              >
                <FaSignInAlt /> Daftar
              </button>
            </div>
          </div>
        </nav>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 overflow-hidden px-6 pb-16 pt-28 md:grid-cols-[1.02fr_0.98fr] md:pb-20 md:pt-32">
          <div className="min-w-0 max-w-[calc(100vw-48px)] sm:max-w-3xl">
            <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#DEE33E]/50 bg-[#DEE33E]/20 px-4 py-2 text-center text-[10px] font-black uppercase tracking-widest text-[#5c5f10] sm:text-[11px] backdrop-blur-sm">
              <FaCar /> Untuk pemilik mobil dan tim bengkel
            </span>
            <h1 className="mt-6 max-w-[calc(100vw-48px)] text-3xl font-black leading-[1.08] tracking-normal text-[#1F2937] sm:max-w-4xl sm:text-5xl lg:text-6xl drop-shadow-sm">
              Service mobil lebih mudah
              <br className="sm:hidden" /> dari booking sampai selesai.
            </h1>
            <p className="mt-6 max-w-[calc(100vw-48px)] text-base leading-8 text-gray-600 sm:max-w-2xl md:text-lg font-medium">
              BengkelGo membantu pelanggan memesan jadwal dan melihat layanan.
              <span className="hidden sm:inline"> Tim bengkel mengelola operasional dari satu sistem.</span>
            </p>

            <div className="mt-8 flex max-w-[calc(100vw-48px)] flex-col gap-3 sm:max-w-none sm:flex-row">
              <button
                onClick={accessBarrier}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-4 text-xs font-black uppercase text-white shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-[1.02] hover:bg-red-700 hover:shadow-2xl sm:w-auto sm:px-7 sm:text-sm"
              >
                Booking Servis Sekarang <FaChevronRight size={12} />
              </button>
              <button
                onClick={accessBarrier}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#1F2937]/20 bg-white/90 backdrop-blur-sm px-5 py-4 text-sm font-bold text-[#1F2937] transition-all duration-300 hover:scale-[1.02] hover:border-[#DEE33E] hover:bg-[#DEE33E]/10 sm:w-auto sm:px-7"
              >
                Pusat Pengaduan
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600 font-medium">
              Siap jadi member? <button onClick={handleSecondaryAction} className="font-black text-red-600 hover:text-red-700 underline decoration-2 underline-offset-2">Daftar Sekarang</button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold text-gray-600">
              <span className="flex items-center gap-2"><FaCheckCircle className="text-red-600" /> Part original</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-[#5c5f10]" /> Jadwal transparan</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-red-600" /> Riwayat member</span>
            </div>
          </div>

          <div className="hidden min-w-0 max-w-[calc(100vw-48px)] self-auto md:block md:max-w-none md:self-end">
            <div className="w-full max-w-full rounded-[28px] border border-gray-200 bg-white/95 backdrop-blur-xl p-4 text-[#1F2937] shadow-2xl shadow-[#DEE33E]/15">
              <div className="rounded-2xl bg-gradient-to-br from-[#1F2937] to-[#111827] p-4 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#DEE33E]">Live Workshop</p>
                    <h2 className="mt-1 text-lg font-black">Status Hari Ini</h2>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-[10px] font-black text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Buka
                  </span>
                </div>

                {[
                  ["Avanza BM 1234 AA", "Service berkala", "85%"],
                  ["Brio BM 9012 CC", "Cek rem depan", "40%"],
                  ["NMAX BM 5678 NY", "Menunggu sparepart", "20%"],
                ].map(([unit, job, progress]) => (
                  <div key={unit} className="mb-3 min-w-0 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">{unit}</p>
                        <p className="text-xs text-white/50">{job}</p>
                      </div>
                      <span className="text-xs font-black text-[#DEE33E]">{progress}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 animate-pulse rounded-full bg-[#DEE33E]"
                        style={{ width: progress }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                <div className="rounded-2xl bg-[#DEE33E]/15 p-4">
                  <p className="text-xl font-black text-[#5c5f10]">12</p>
                  <p className="text-[10px] font-bold uppercase text-gray-500">Unit</p>
                </div>
                <div className="rounded-2xl bg-red-50 p-4">
                  <p className="text-xl font-black text-red-700">5</p>
                  <p className="text-[10px] font-bold uppercase text-gray-500">Mekanik</p>
                </div>
                <div className="rounded-2xl bg-[#F8F9FA] p-4">
                  <p className="text-xl font-black text-[#1F2937]">3</p>
                  <p className="text-[10px] font-bold uppercase text-gray-500">Slot</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section id="fitur" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-red-600">Layanan Unggulan</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-[#1F2937] md:text-4xl">
                Servis yang bisa Anda pantau, bukan sekadar ditunggu.
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-500">
                Dari booking sampai kendaraan selesai dikerjakan, semua tahapan bisa Anda ikuti langsung lewat akun member.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#DEE33E] hover:shadow-lg">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-lg ${featureToneClasses[feature.tone]}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-black text-[#1F2937]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-500">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tentang" className="bg-[#F8F9FA] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-red-600">Tentang</p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-[#1F2937] md:text-4xl">
                  Solusi digital untuk operasional bengkel dan kepuasan pelanggan.
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Informasi sistem booking, manajemen layanan, dan pengalaman pelanggan yang jelas untuk setiap kunjungan servis.
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat, i) => (
                    <div
                      key={stat.value}
                      className={`rounded-2xl p-6 shadow-sm ${
                        i === 0 ? "bg-white border-t-4 border-[#DEE33E]" : i === 1 ? "bg-white border-t-4 border-red-500" : "bg-white border-t-4 border-[#1F2937]"
                      }`}
                    >
                      <p className="text-3xl font-black text-[#1F2937]">{stat.value}</p>
                      <p className="mt-2 text-xs font-bold uppercase leading-5 text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {testimonials.map((item) => (
                    <article key={item.name} className="rounded-2xl border-l-4 border-[#DEE33E] bg-white p-6 shadow-sm">
                      <div className="mb-4 flex gap-1 text-[#DEE33E]">
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} size={13} />
                        ))}
                      </div>
                      <p className="text-sm leading-7 text-gray-600">"{item.text}"</p>
                      <div className="mt-5 border-t border-gray-100 pt-4">
                        <p className="text-sm font-black text-[#1F2937]">{item.name}</p>
                        <p className="text-xs font-bold text-gray-400">{item.car}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="promo" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-widest text-red-600">Promo</p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-[#1F2937] md:text-4xl">
                  Keuntungan Eksklusif Member BengkelGo.
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Login untuk mengklaim promo aktif bulan ini dan menyimpannya otomatis ke akun member Anda.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchPromos}
                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-gray-50"
              >
                Refresh Promo
              </button>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {isLoadingPromos ? (
                <div className="rounded-3xl border border-gray-200 bg-[#F8F9FA] p-6 text-center text-sm text-gray-500 md:col-span-3">
                  Memuat promo terbaru...
                </div>
              ) : promoCards.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-300 bg-[#F8F9FA] p-6 text-center text-sm text-gray-500 md:col-span-3">
                  Tidak ada promo aktif saat ini.
                </div>
              ) : (
                promoCards.map((promo, i) => (
                  <div
                    key={promo.title}
                    className={`rounded-3xl border p-6 shadow-sm ${
                      i % 2 === 0
                        ? "border-[#DEE33E]/40 bg-gradient-to-br from-[#DEE33E]/15 to-white"
                        : "border-red-200 bg-gradient-to-br from-red-50 to-white"
                    }`}
                  >
                    <h3 className="text-lg font-black text-[#1F2937]">{promo.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-500">{promo.desc}</p>
                    <button
                      onClick={() => handlePromoAction(promo)}
                      className="mt-6 inline-flex items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-black uppercase text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-700"
                    >
                      {promo.action}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#F8F9FA] px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-red-600">FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-[#1F2937] md:text-4xl">
                Pertanyaan sebelum mulai
              </h2>
            </div>

            <div className="mt-10 divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white shadow-sm">
              {faqs.map((faq) => (
                <div key={faq.question} className="grid gap-3 p-6 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
                  <h3 className="flex items-start gap-3 text-sm font-black text-[#1F2937]">
                    <FaQuestionCircle className="mt-0.5 flex-shrink-0 text-red-600" />
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-6 text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-br from-[#DEE33E] via-[#e8ec6f] to-red-500 px-6 py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-[#1F2937]/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-widest text-[#1F2937]/70">Mulai Sekarang</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-[#1F2937] md:text-5xl">
              Jadwalkan servis pertama Anda di BengkelGo.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#1F2937]/80">
              Mulai dari booking cepat, lalu lanjutkan sebagai member untuk menyimpan riwayat servis dan mendapatkan promo yang relevan.
            </p>
            <button
              onClick={accessBarrier}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1F2937] px-8 py-4 text-sm font-black uppercase text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:bg-black"
            >
              Booking Servis Sekarang <FaChevronRight size={12} />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 border-b border-gray-100 pb-10 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DEE33E] text-black">
                <FaWrench />
              </span>
              <div>
                <p className="text-sm font-black uppercase text-[#1F2937]">BengkelGo</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Auto Service Center
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500">
              Landing page publik untuk memperkenalkan layanan, sistem member, dan jalur booking BengkelGo.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#1F2937]">Navigasi</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              <a href="#fitur" className="block hover:text-black">Fitur</a>
              <a href="#tentang" className="block hover:text-black">Tentang</a>
              <a href="#faq" className="block hover:text-black">FAQ</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#1F2937]">Aksi</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              <button onClick={accessBarrier} className="block hover:text-black">
                Booking Servis
              </button>
              <button onClick={() => navigate("/login")} className="block hover:text-black">
                Masuk Akun
              </button>
              <button onClick={handleSecondaryAction} className="block hover:text-black">
                Daftar Member
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#1F2937]">Alamat Resmi</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              <p className="flex gap-2"><FaMapMarkerAlt className="mt-1 text-red-600" /> Jl. Rumbai No. 45, Pekanbaru</p>
              <p className="flex gap-2"><FaPhone className="mt-1 text-red-600" /> 0812-3456-7890</p>
              <p className="flex gap-2"><FaClock className="mt-1 text-red-600" /> Senin - Sabtu, 08.00 - 18.00 WIB</p>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-7xl text-xs font-bold text-gray-400">
          Copyright 2026 BengkelGo Mobil. All rights reserved.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-6 z-40 flex items-end justify-end px-6">
        <div className="flex flex-col items-end gap-3">
          {isChatOpen && (
            <div className="max-w-sm rounded-[28px] border border-gray-200 bg-white p-4 shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-[#1F2937]">Asisten BengkelGo</p>
                  <p className="text-xs text-gray-500">Bantuan 24/7 sebelum daftar</p>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100"
                  aria-label="Tutup chat"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[90%] rounded-2xl p-3 text-sm ${msg.sender === "bot" ? "bg-gray-100 text-[#1F2937] self-start" : "bg-[#DEE33E]/25 text-[#1F2937] self-end"}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatInputSubmit} className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Tulis pertanyaan..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-red-600 px-4 py-2 text-xs font-black uppercase text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-700"
                >
                  Kirim
                </button>
              </form>
              <div className="mt-4 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.value}
                    onClick={() => handleQuickReply(reply)}
                    className="rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
              {chatTrigger && (
                <div className="mt-4 rounded-2xl border border-[#DEE33E] bg-[#FEFFEA] p-3 text-sm text-[#1F2937]">
                  <p className="mb-3 font-bold">Akses khusus member diperlukan</p>
                  <button
                    onClick={chatTrigger.action}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-black uppercase text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-700"
                  >
                    {chatTrigger.label}
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsChatOpen((prev) => !prev)}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#DEE33E] to-red-500 px-5 py-3 text-sm font-black text-[#1F2937] shadow-2xl shadow-red-500/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <FaQuestionCircle />
            {isChatOpen ? "Tutup Bantuan" : "Bantuan 24/7"}
          </button>
        </div>
      </div>
    </div>
  );
}