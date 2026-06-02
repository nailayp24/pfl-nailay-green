import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaDrawPolygon } from "react-icons/fa";

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
  const centerPosition = [0.5071, 101.4478]; 

  return (
    <div className="p-2 space-y-6 font-outfit h-full flex flex-col text-gray-800">
      
      {/* Bagian Atas Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Sistem Area Jangkauan</h1>
          <p className="text-xs text-gray-400 mt-0.5">Let's check your Garage today</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm shrink-0">
          <div className="bg-[#DEE33E]/20 p-2 rounded-xl text-black border border-[#DEE33E]/40">
            <FaDrawPolygon className="text-sm" />
          </div>
          <div className="pr-2">
            <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Status Penjemputan</p>
            <p className="text-xs font-black text-gray-800 text-nowrap mt-0.5">Optimal (Kota Pekanbaru)</p>
          </div>
        </div>
      </div>
      
      {/* Kontainer Peta Area Luas Terang */}
      <div className="flex-1 bg-white rounded-[30px] border border-gray-100 relative overflow-hidden shadow-xl min-h-[480px]">
        <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true} className="h-full w-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          <Marker position={centerPosition}>
            <Popup>
              <div className="text-center font-outfit p-1 text-xs">
                <strong className="text-gray-800 text-sm font-black">Pusat BengkelGo</strong><br />
                <span className="text-gray-500 font-medium block mt-0.5">Living World Pekanbaru</span>
              </div>
            </Popup>
          </Marker>

          {/* Batas Radius Lingkaran Berwarna Hijau Lime Modifikasi */}
          <Circle 
            center={centerPosition} 
            pathOptions={{ 
              color: '#9FA324', 
              fillColor: '#DEE33E', 
              fillOpacity: 0.12,
              weight: 2
            }} 
            radius={10000} 
          />
        </MapContainer>

        {/* Kotak Informasi Melayang Atas Peta Berwarna Putih Kaca */}
        <div className="absolute bottom-6 left-6 z-[10] bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-2xl max-w-xs w-64">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-[#DEE33E] rounded-full"></div>
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Pusat Layanan Toko</h2>
          </div>
          
          <div className="space-y-2.5 text-xs">
             <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-medium">Wilayah Utama</span>
                <span className="text-gray-800 font-extrabold">Pekanbaru, Riau</span>
             </div>
             <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-medium">Radius Derek Gratis</span>
                <span className="text-green-600 font-black bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">
                  10 KM Bebas Biaya
                </span>
             </div>
             <p className="text-[10px] text-gray-400 font-medium italic leading-relaxed pt-1 border-t border-gray-100">
               *Layanan antar-jemput motor gratis berlaku di dalam zona lingkaran hijau secara langsung.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}