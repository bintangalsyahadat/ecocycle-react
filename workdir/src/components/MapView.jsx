import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState([-6.2, 106.81]);

  const locations = [
    { id: 1, name: "EcoCycle Kediri", coords: [-7.8255, 112.0114] },
    { id: 2, name: "EcoCycle Jakarta", coords: [-6.2, 106.816666] },
    { id: 3, name: "EcoCycle Surabaya", coords: [-7.250445, 112.768845] },
  ];

  const handleSearch = () => {
    const found = locations.find((loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase())
    );
    if (found) setCenter(found.coords);
  };

  return (
    <div className="relative w-full">
      
      {/* --- Inject CSS local langsung di component --- */}
      <style>
        {`
          .leaflet-control-zoom {
            margin-top: 65px !important;
            margin-left: 12px !important;
          }

          .leaflet-control-zoom a {
            border-radius: 6px !important;
          }
        `}
      </style>

      {/* SEARCH BAR */}
      <div className="absolute z-[999] top-3 left-1/2 -translate-x-1/2 w-[90%]">
        <div className="bg-white shadow-md rounded-full flex items-center px-4 py-2 gap-2">
          <input
            placeholder="Temukan lokasi ECO Cycle terdekat"
            className="flex-1 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch} className="text-[#00A8A8] font-semibold">
            🔍
          </button>
        </div>
      </div>

      {/* MAP */}
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{
          height: "270px",
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
          marginTop: "15px",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.coords}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
