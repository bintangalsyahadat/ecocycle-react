import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  const locations = [
    { id: 1, name: 'Jakarta', coords: [-6.200000, 106.816666] },
    { id: 2, name: 'Bandung', coords: [-6.914744, 107.609810] },
    { id: 3, name: 'Surabaya', coords: [-7.250445, 112.768845] },
  ];

  return (
    <MapContainer
      center={[-6.200000, 106.816666]} // titik pusat peta
      zoom={5} 
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {locations.map((loc) => (
        <Marker key={loc.id} position={loc.coords}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};
