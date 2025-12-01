import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { fetchOperatingUnits } from "../utils/api";
import Spinner from "./Spinner";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Delay helper
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Base geocode
async function geocodeAddress(fullAddress) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    fullAddress
  )}&email=your-email@example.com`; // Nominatim email parameter

  try {
    const res = await fetch(url);
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

  // Delay untuk Nominatim rate limit
  await delay(1000);

  const coords = await geocodeAddress(fullAddress);
  if (coords) localStorage.setItem(fullAddress, JSON.stringify(coords));

  return coords;
}

// Build full address safely
function buildFullAddress(address) {
  return [
    address.street ?? "",
    address.city ?? "",
    address?.state_id?.name ?? "",
    address.zip ?? "",
    address?.country_id?.name ?? "",
  ]
    .filter(Boolean)
    .join(", ");
}

// Auto zoom to bounds
function AutoZoom({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const bounds = locations?.map((loc) => loc.coords);
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 15,
    });
  }, [locations, map]);

  return null;
}

export default function MapView() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);

      try {
        const branches = await fetchOperatingUnits();

        const results = await Promise.all(
          branches?.map(async (branch) => {
            if (!branch.address?.id) return null;

            const fullAddress = buildFullAddress(branch.address);
            const coords = await geocodeAddressWithCache(fullAddress);

            if (!coords) {
              console.warn("Cannot geocode:", fullAddress);
              return null;
            }

            return {
              id: branch.address.id,
              name: fullAddress,
              coords: [coords.lat, coords.lon],
            };
          })
        );

        setLocations(results.filter(Boolean));
      } catch (err) {
        console.error("Error loading branches:", err);
      } finally {
        setLoading(false);
      }
    }

    loadLocations();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <Spinner />
      )}

      <MapContainer
        center={[-2.5, 117.5]}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.length > 0 && <AutoZoom locations={locations} />}

        {locations?.map((loc) => (
          <Marker key={loc.id} position={loc.coords}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
