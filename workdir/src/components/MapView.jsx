import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = () => {
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

export default MapView;