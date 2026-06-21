import { useState } from "react";
import {
  FaCalendarCheck,
  FaCar,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

export default function MemberBooking() {
  const [formData, setFormData] = useState({
    vehicle: "",
    service: "",
    date: "",
    complaint: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `✅ Booking Berhasil!\n\nKendaraan: ${formData.vehicle}\nLayanan: ${formData.service}\nTanggal: ${formData.date}`
    );

    setFormData({
      vehicle: "",
      service: "",
      date: "",
      complaint: "",
    });
  };

  return (
    <div className="space-y-6 font-outfit">
      <div>
        <h1 className="text-2xl font-black text-gray-800">
          Booking Servis
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Jadwalkan servis kendaraan Anda dengan mudah.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-xs font-bold text-gray-500">
              Kendaraan
            </label>
            <input
              type="text"
              placeholder="Contoh: Toyota Avanza"
              value={formData.vehicle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vehicle: e.target.value,
                })
              }
              className="w-full mt-1 border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500">
              Jenis Servis
            </label>

            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  service: e.target.value,
                })
              }
              className="w-full mt-1 border rounded-xl p-3"
              required
            >
              <option value="">Pilih Servis</option>
              <option>Ganti Oli</option>
              <option>Tune Up</option>
              <option>Servis Berkala</option>
              <option>Perbaikan Mesin</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500">
              Tanggal Booking
            </label>

            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
              className="w-full mt-1 border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500">
              Keluhan Kendaraan
            </label>

            <textarea
              rows="4"
              placeholder="Jelaskan keluhan kendaraan..."
              value={formData.complaint}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  complaint: e.target.value,
                })
              }
              className="w-full mt-1 border rounded-xl p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-black text-white rounded-xl font-black flex items-center justify-center gap-2"
          >
            <FaCalendarCheck />
            Booking Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}