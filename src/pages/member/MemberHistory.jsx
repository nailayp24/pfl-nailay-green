import { FaHistory } from "react-icons/fa";

export default function MemberHistory() {
  const historyData = [
    {
      id: "SRV001",
      service: "Ganti Oli",
      date: "10 Juni 2026",
      status: "Selesai",
    },
    {
      id: "SRV002",
      service: "Tune Up",
      date: "15 Juni 2026",
      status: "Selesai",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Riwayat Servis</h1>
        <p className="text-gray-500 text-sm">
          Daftar layanan yang pernah dilakukan.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border shadow-sm">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 mb-3 flex justify-between"
          >
            <div>
              <h3 className="font-bold">{item.service}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}