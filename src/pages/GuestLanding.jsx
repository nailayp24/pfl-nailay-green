import { useState } from "react";
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
  FaUser,
  FaUserShield,
  FaWrench,
} from "react-icons/fa";
import heroImage from "../assets/hero.png";

export default function GuestLanding() {
  const navigate = useNavigate();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    date: "",
    service: "Service Berkala",
  });

  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    name: "",
    email: "",
    category: "Layanan Staff",
    message: "",
    channel: "WhatsApp",
  });

  const features = [
    {
      icon: <FaCalendarCheck />,
      title: "Booking tanpa antre",
      desc: "Pilih jadwal servis dari rumah dan datang saat slot sudah siap.",
    },
    {
      icon: <FaTools />,
      title: "Pantau progres servis",
      desc: "Status kendaraan lebih transparan dari masuk bengkel sampai selesai.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Biaya lebih jelas",
      desc: "Estimasi layanan dan riwayat transaksi membantu menghindari biaya mendadak.",
    },
    {
      icon: <FaUserShield />,
      title: "Akses sesuai peran",
      desc: "Member, kasir, mekanik, dan owner masuk ke dashboard yang sesuai kebutuhan.",
    },
  ];

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

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(
      `[GUEST CRM] Booking berhasil dikirim.\nUnit: ${bookingForm.vehicle}\nKasir akan konfirmasi via WhatsApp ke ${bookingForm.phone}.`
    );
    setIsBookingOpen(false);
    setBookingForm({
      name: "",
      phone: "",
      vehicle: "",
      date: "",
      service: "Service Berkala",
    });
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    const channelMsg =
      complaintForm.channel === "WhatsApp"
        ? "Tim kami akan follow-up via WhatsApp dalam 1 jam kerja."
        : `Respon resmi akan dikirim ke ${complaintForm.email} dalam 24 jam.`;

    alert(
      `[COMPLAINT REGISTERED]\nKeluhan atas nama ${complaintForm.name} berhasil masuk.\n${channelMsg}`
    );
    setIsComplaintOpen(false);
    setComplaintForm({
      name: "",
      email: "",
      category: "Layanan Staff",
      message: "",
      channel: "WhatsApp",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-outfit text-gray-900 scroll-smooth">
      <header className="relative min-h-[92vh] overflow-hidden bg-gray-950 text-white">
        <img
          src={heroImage}
          alt=""
          className="absolute right-[-40px] top-24 hidden w-[560px] opacity-20 md:block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#030712_0%,rgba(3,7,18,0.92)_46%,rgba(3,7,18,0.68)_100%)]" />

        <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gray-950/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-left"
              aria-label="BengkelGo home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DEE33E] text-black">
                <FaWrench />
              </span>
              <span>
                <span className="block text-sm font-black uppercase">BengkelGo</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Auto Service Center
                </span>
              </span>
            </button>

            <div className="hidden items-center gap-7 text-xs font-bold text-white/70 md:flex">
              <a href="#fitur" className="hover:text-white">Fitur</a>
              <a href="#bukti" className="hover:text-white">Bukti</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white/75 hover:bg-white/10 hover:text-white sm:flex"
              >
                <FaUserShield /> Masuk
              </button>
              <button
                onClick={() => navigate("/register", { state: { roleDefault: "Member" } })}
                className="hidden items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-black hover:bg-[#DEE33E] sm:flex"
              >
                <FaSignInAlt /> Daftar
              </button>
            </div>
          </div>
        </nav>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 overflow-hidden px-6 pb-16 pt-28 md:grid-cols-[1.02fr_0.98fr] md:pb-20 md:pt-32">
          <div className="min-w-0 max-w-[calc(100vw-48px)] sm:max-w-3xl">
            <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#DEE33E]/30 bg-[#DEE33E]/10 px-4 py-2 text-center text-[10px] font-black uppercase tracking-widest text-[#DEE33E] sm:text-[11px]">
              <FaCar /> Untuk pemilik mobil dan tim bengkel
            </span>
            <h1 className="mt-6 max-w-[calc(100vw-48px)] text-3xl font-black leading-[1.08] tracking-normal text-white sm:max-w-4xl sm:text-5xl lg:text-6xl">
              Service mobil lebih mudah
              <br className="sm:hidden" /> dari booking sampai selesai.
            </h1>
            <p className="mt-6 max-w-[calc(100vw-48px)] text-base leading-8 text-white/68 sm:max-w-2xl md:text-lg">
              BengkelGo membantu pelanggan memesan jadwal dan melihat layanan.
              <span className="hidden sm:inline"> Tim bengkel mengelola operasional dari satu sistem.</span>
            </p>

            <div className="mt-8 flex max-w-[calc(100vw-48px)] flex-col gap-3 sm:max-w-none sm:flex-row">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#DEE33E] px-5 py-4 text-xs font-black uppercase text-black shadow-lg shadow-[#DEE33E]/20 hover:bg-[#cbd02f] sm:w-auto sm:px-7 sm:text-sm"
              >
                Booking Servis Sekarang <FaChevronRight size={12} />
              </button>
              <button
                onClick={() => setIsComplaintOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-5 py-4 text-sm font-bold text-white hover:bg-white/10 sm:w-auto sm:px-7"
              >
                Ajukan Keluhan
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold text-white/72">
              <span className="flex items-center gap-2"><FaCheckCircle className="text-[#DEE33E]" /> Part original</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-[#DEE33E]" /> Jadwal transparan</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-[#DEE33E]" /> Riwayat member</span>
            </div>
          </div>

          <div className="hidden min-w-0 max-w-[calc(100vw-48px)] self-auto md:block md:max-w-none md:self-end">
            <div className="w-full max-w-full rounded-[28px] border border-white/10 bg-white p-4 text-gray-900 shadow-2xl">
              <div className="rounded-2xl bg-gray-950 p-4 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#DEE33E]">Live Workshop</p>
                    <h2 className="mt-1 text-lg font-black">Status Hari Ini</h2>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black text-emerald-300">
                    Buka
                  </span>
                </div>

                {[
                  ["Avanza BM 1234 AA", "Service berkala", "85%"],
                  ["Brio BM 9012 CC", "Cek rem depan", "40%"],
                  ["NMAX BM 5678 NY", "Menunggu sparepart", "20%"],
                ].map(([unit, job, progress]) => (
                  <div key={unit} className="mb-3 min-w-0 rounded-xl bg-white/8 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">{unit}</p>
                        <p className="text-xs text-white/50">{job}</p>
                      </div>
                      <span className="text-xs font-black text-[#DEE33E]">{progress}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-[#DEE33E]"
                        style={{ width: progress }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xl font-black">12</p>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Unit</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xl font-black">5</p>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Mekanik</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xl font-black">3</p>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Slot</p>
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
              <p className="text-xs font-black uppercase tracking-widest text-[#9FA324]">Interest</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-gray-950 md:text-4xl">
                Satu fitur, satu manfaat yang mudah dipahami.
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-500">
                Landing page ini memecah manfaat BengkelGo menjadi kartu sederhana agar pengunjung cepat tahu nilai sistemnya.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#DEE33E] hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DEE33E]/18 text-lg text-black">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-black text-gray-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-500">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="bukti" className="bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#9FA324]">Desire</p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-gray-950 md:text-4xl">
                  Dibuat agar pelanggan percaya sebelum mengambil tindakan.
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Statistik, testimoni, dan alur informasi yang ringkas mengurangi keraguan sebelum pengunjung melakukan booking atau registrasi.
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.value} className="rounded-2xl bg-white p-6 shadow-sm">
                      <p className="text-3xl font-black text-gray-950">{stat.value}</p>
                      <p className="mt-2 text-xs font-bold uppercase leading-5 text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {testimonials.map((item) => (
                    <article key={item.name} className="rounded-2xl bg-white p-6 shadow-sm">
                      <div className="mb-4 flex gap-1 text-[#9FA324]">
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} size={13} />
                        ))}
                      </div>
                      <p className="text-sm leading-7 text-gray-600">"{item.text}"</p>
                      <div className="mt-5 border-t border-gray-100 pt-4">
                        <p className="text-sm font-black text-gray-950">{item.name}</p>
                        <p className="text-xs font-bold text-gray-400">{item.car}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-[#9FA324]">FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-gray-950 md:text-4xl">
                Pertanyaan sebelum mulai
              </h2>
            </div>

            <div className="mt-10 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
              {faqs.map((faq) => (
                <div key={faq.question} className="grid gap-3 p-6 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
                  <h3 className="flex items-start gap-3 text-sm font-black text-gray-950">
                    <FaQuestionCircle className="mt-0.5 flex-shrink-0 text-[#9FA324]" />
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-6 text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-950 px-6 py-20 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-widest text-[#DEE33E]">Action</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal md:text-5xl">
              Jadwalkan servis pertama Anda di BengkelGo.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60">
              Mulai dari booking cepat, lalu lanjutkan sebagai member untuk menyimpan riwayat servis dan mendapatkan promo yang relevan.
            </p>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#DEE33E] px-8 py-4 text-sm font-black uppercase text-black hover:bg-[#cbd02f]"
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
                <p className="text-sm font-black uppercase text-gray-950">BengkelGo</p>
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
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-950">Navigasi</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              <a href="#fitur" className="block hover:text-black">Fitur</a>
              <a href="#bukti" className="block hover:text-black">Bukti</a>
              <a href="#faq" className="block hover:text-black">FAQ</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-950">Aksi</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              <button onClick={() => setIsBookingOpen(true)} className="block hover:text-black">
                Booking Servis
              </button>
              <button onClick={() => navigate("/login")} className="block hover:text-black">
                Masuk Akun
              </button>
              <button onClick={() => navigate("/register")} className="block hover:text-black">
                Daftar Member
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-950">Alamat Resmi</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              <p className="flex gap-2"><FaMapMarkerAlt className="mt-1 text-[#9FA324]" /> Jl. Rumbai No. 45, Pekanbaru</p>
              <p className="flex gap-2"><FaPhone className="mt-1 text-[#9FA324]" /> 0812-3456-7890</p>
              <p className="flex gap-2"><FaClock className="mt-1 text-[#9FA324]" /> Senin - Sabtu, 08.00 - 18.00 WIB</p>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-7xl text-xs font-bold text-gray-400">
          Copyright 2026 BengkelGo Mobil. All rights reserved.
        </p>
      </footer>

      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-white p-8 shadow-2xl">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black"
              aria-label="Tutup modal booking"
            >
              <FaTimes />
            </button>
            <div className="mb-6">
              <h4 className="text-xl font-black text-gray-900">Booking Kendaraan</h4>
              <p className="mt-1 text-sm text-gray-500">Isi data singkat, kasir akan mengonfirmasi slot Anda.</p>
            </div>
            <form onSubmit={handleBookingSubmit} className="space-y-3">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#9FA324]"
                />
              </div>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Nomor WhatsApp"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#9FA324]"
                />
              </div>
              <div className="relative">
                <FaCar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Unit Mobil dan Plat"
                  value={bookingForm.vehicle}
                  onChange={(e) => setBookingForm({ ...bookingForm, vehicle: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#9FA324]"
                />
              </div>
              <select
                value={bookingForm.service}
                onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#9FA324]"
              >
                <option value="Service Berkala">Service Berkala Mobil</option>
                <option value="Spooring Precision">Spooring & Balancing</option>
                <option value="Service AC">Service AC</option>
                <option value="General Check-Up">General Check-Up</option>
              </select>
              <input
                type="datetime-local"
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#9FA324]"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-[#DEE33E] py-3.5 text-sm font-black uppercase text-black hover:bg-[#cbd02f]"
              >
                Kirim Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {isComplaintOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-white p-8 shadow-2xl">
            <button
              onClick={() => setIsComplaintOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black"
              aria-label="Tutup modal keluhan"
            >
              <FaTimes />
            </button>
            <div className="mb-6">
              <h4 className="text-xl font-black text-gray-900">Ajukan Keluhan</h4>
              <p className="mt-1 text-sm text-gray-500">Keluhan masuk ke CRM agar tim dapat melakukan follow-up.</p>
            </div>
            <form onSubmit={handleComplaintSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Nama Lengkap"
                value={complaintForm.name}
                onChange={(e) => setComplaintForm({ ...complaintForm, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#9FA324]"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={complaintForm.email}
                onChange={(e) => setComplaintForm({ ...complaintForm, email: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#9FA324]"
              />
              <select
                value={complaintForm.category}
                onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#9FA324]"
              >
                <option value="Layanan Staff">Masalah Pelayanan Staff</option>
                <option value="Kualitas Part">Masalah Kualitas Part</option>
                <option value="Hasil Kerja">Hasil Kerja Tidak Sesuai</option>
                <option value="Harga">Masalah Harga atau Biaya</option>
              </select>
              <textarea
                required
                rows="4"
                placeholder="Tulis kronologi keluhan"
                value={complaintForm.message}
                onChange={(e) => setComplaintForm({ ...complaintForm, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none focus:border-[#9FA324]"
              />
              <select
                value={complaintForm.channel}
                onChange={(e) => setComplaintForm({ ...complaintForm, channel: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#9FA324]"
              >
                <option value="WhatsApp">Follow-up via WhatsApp</option>
                <option value="Email">Follow-up via Email</option>
              </select>
              <button
                type="submit"
                className="w-full rounded-xl bg-black py-3.5 text-sm font-black uppercase text-white hover:bg-gray-800"
              >
                Kirim Keluhan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
