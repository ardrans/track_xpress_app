import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function DriverLocationTracker({ setDriverCoordinates }) {
  const [tracking, setTracking] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState(null);
  let watchId = null;
  const mapRef = useRef(null);

  const startTracking = () => {
    if (!tracking) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoordinates = { latitude, longitude };
          setCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinates]);
          setDriverCoordinates((prevDriverCoordinates) => [...prevDriverCoordinates, newCoordinates]);
        },
        (err) => {
          setError(err.message);
        }
      );
      setTracking(true);
    }
  }

  const stopTracking = () => {
    if (tracking) {
      navigator.geolocation.clearWatch(watchId);
      setTracking(false);
    }
  };

  useEffect(() => {
    if (tracking) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      if (tracking) {
        stopTracking();
      }
    };
  }, [tracking]);

  return (
    <div>
      <p>
        <strong>Status:</strong> {tracking ? 'Tracking' : 'Not Tracking'}
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {coordinates.length > 0 && (
        <div>
          <p>
            <strong>Last Known Location:</strong>{' '}
            Latitude: {coordinates[coordinates.length - 1].latitude}, Longitude:{' '}
            {coordinates[coordinates.length - 1].longitude}
          </p>
          <div
            id="map"
            style={{ height: '400px', width: '100%', marginBottom: '20px' }}
          >
            <MapContainer
              center={[coordinates[coordinates.length - 1].latitude, coordinates[coordinates.length - 1].longitude]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline
                positions={coordinates.map(coord => [coord.latitude, coord.longitude])}
                color="#FF0000"
                weight={2}
              />
              <Marker
                position={[coordinates[coordinates.length - 1].latitude, coordinates[coordinates.length - 1].longitude]}
              >
                <Popup>Last Known Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
      <button onClick={startTracking} disabled={tracking}>
        Start Tracking
      </button>
      <button onClick={stopTracking} disabled={!tracking}>
        Stop Tracking
      </button>
    </div>
  );
}

export default DriverLocationTracker;
