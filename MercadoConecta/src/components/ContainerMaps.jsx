import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Commerce } from '../lib/Commerce';


const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="background: white; border-radius: 50%; padding: 4px; box-shadow: 0 0 4px rgba(0,0,0,0.3);">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#2c3e50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store">
        <path d="M3 9V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/>
        <path d="M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/>
        <path d="M8 22V12h8v10"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});


// 1. Función para geocodificar
const geocodeWithNominatim = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } else {
    throw new Error('No se encontró la dirección');
  }
};


const CenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 13);
  }, [position, map]);
  return null;
};

export default function ContainerMaps() {
  const [userLocation, setUserLocation] = useState(null);
  const [commerces, setCommerces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error('Error obteniendo ubicación:', err);
      }
    );

    const cargarComercios = async () => {
      try {
        const data = await Commerce.getAll();

        // Geocodificar direcciones si no tienen lat/lng
        const comerciosConCoords = await Promise.all(
          data.map(async (c) => {
            if (c.lat && c.lng) return c;
            try {
              const coords = await geocodeWithNominatim(c.location);
              return { ...c, lat: coords.lat, lng: coords.lng };
            } catch (e) {
              console.warn(`No se pudo geocodificar: ${c.name}`, e);
              return null;
            }
          })
        );

        setCommerces(comerciosConCoords.filter(Boolean));
      } catch (error) {
        console.error('Error cargando comercios:', error);
      }
    };

    cargarComercios();
  }, []);


  return (
    <MapContainer center={userLocation || [4.711, -74.072]} zoom={13} style={{ height: '600px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {userLocation && <Marker position={userLocation}><Popup>Tu ubicación</Popup></Marker>}
      <CenterMap position={userLocation} />
      {commerces.map((c) => (
        <Marker key={c.id} position={[c.lat, c.lng]} icon={customIcon}>
          <Popup>
            <strong>{c.name}</strong><br />
            {c.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

