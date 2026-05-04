import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaDrawPolygon } from "react-icons/fa";

// Perbaikan Icon Leaflet agar muncul dengan benar
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Coverage() {
  // Koordinat Living World Pekanbaru (Pusat BengkelGo)
  const centerPosition = [0.5071, 101.4478]; 

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Sistem Area Jangkauan</h1>
          <p className="text-gray-500 text-sm mt-1">Area operasional layanan BengkelGo di wilayah Riau.</p>
        </div>
        <div className="flex items-center gap-3 bg-[#1A1C2E] p-2 rounded-2xl border border-white/5 shadow-lg">
          <div className="bg-orange-500/20 p-2 rounded-lg text-orange-500">
            <FaDrawPolygon />
          </div>
          <div className="pr-2">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Status Jangkauan</p>
            <p className="text-sm font-bold text-white text-nowrap">Optimal (Pekanbaru City)</p>
          </div>
        </div>
      </div>
      
      {/* Container Peta Asli */}
      <div className="flex-1 bg-[#1A1C2E] rounded-[40px] border border-white/5 relative overflow-hidden shadow-2xl">
        <MapContainer 
          center={centerPosition} 
          zoom={13} 
          scrollWheelZoom={true} 
          className="h-full w-full z-0"
        >
          {/* Layer Peta (Menggunakan Dark Mode Tile) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Marker Pusat Bengkel di Living World Pekanbaru */}
          <Marker position={centerPosition}>
            <Popup className="custom-popup">
              <div className="text-center font-sans">
                <strong className="text-orange-600">BengkelGo Center</strong><br />
                Living World Pekanbaru
              </div>
            </Popup>
          </Marker>

          {/* Visualisasi Radius Jangkauan 10KM */}
          <Circle 
            center={centerPosition} 
            pathOptions={{ 
              color: '#FF8A00', 
              fillColor: '#FF8A00', 
              fillOpacity: 0.1,
              weight: 2
            }} 
            radius={10000} 
          />
        </MapContainer>

        {/* Legend / Info Overlay di atas peta */}
        <div className="absolute bottom-6 left-6 z-[10] bg-[#0F1116]/90 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <FaMapMarkerAlt className="text-orange-500 text-xl" />
            <h2 className="text-lg font-bold text-white leading-none">Pusat Layanan</h2>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center text-xs p-2 bg-white/5 rounded-xl border border-white/5">
                <span className="text-gray-500">Wilayah Utama</span>
                <span className="text-white font-bold">Pekanbaru, Riau</span>
             </div>
             <div className="flex justify-between items-center text-xs p-2 bg-white/5 rounded-xl border border-white/5">
                <span className="text-gray-500">Radius Pickup</span>
                <span className="text-emerald-500 font-bold">10 KM</span>
             </div>
             <p className="text-[10px] text-gray-400 italic">
                *Layanan antar jemput berlaku di dalam radius lingkaran oranye.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}