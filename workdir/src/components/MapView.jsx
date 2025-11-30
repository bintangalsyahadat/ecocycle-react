import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { fetchOperatingUnits } from "../utils/api";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Delay (Nominatim required)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Base geocode
async function geocodeAddress(fullAddress) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    fullAddress
  )}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "ReactLeafletApp/1.0" },
    });

    const data = await res.json();
    if (!data || data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch (err) {
    console.error("Geocode error:", err);
    return null;
  }
}

// Cached geocode
async function geocodeAddressWithCache(fullAddress) {
  const cached = localStorage.getItem(fullAddress);
  if (cached) return JSON.parse(cached);

  // delay 1 detik → mengikuti aturan Nominatim, mencegah error incognito
  await delay(1000);

  const coords = await geocodeAddress(fullAddress);
  if (coords) localStorage.setItem(fullAddress, JSON.stringify(coords));

  return coords;
}

// Build full address
function buildFullAddress(address) {
  return [
    address.street,
    address.city,
    address?.state_id?.name,
    address.zip,
    address?.country_id?.name,
  ]
    .filter(Boolean)
    .join(", ");
}

// Auto zoom to bounds
function AutoZoom({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const bounds = locations.map((loc) => loc.coords);
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 15,
    });
  }, [locations]);

  return null;
}

export default function MapView() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);

      const branches = await fetchOperatingUnits();
      const results = [];

      for (const branch of branches) {
        if (!branch.address?.id) continue;

        const fullAddress = buildFullAddress(branch.address);
        const coords = await geocodeAddressWithCache(fullAddress);

        if (coords) {
          results.push({
            id: branch.address.id,
            name: fullAddress,
            coords: [coords.lat, coords.lon],
          });
        }
      }

      setLocations(results);
      setLoading(false);
    }

    loadLocations();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            flexDirection: "column",
          }}
        >
          {/* Spinner */}
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "6px solid #ccc",
              borderTop: "6px solid #01A3B0",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>

          <p style={{ marginTop: "15px", fontSize: "16px", fontWeight: "bold" }}>
            Loading map...
          </p>

          {/* Spinner Animation Keyframes */}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      {/* 🗺️ Leaflet Map */}
      <MapContainer
        center={[-2.5, 117.5]}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <AutoZoom locations={locations} />

        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.coords}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
