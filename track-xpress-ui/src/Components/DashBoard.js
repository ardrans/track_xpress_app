import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import DriverLocationTracker from './Tracker';


function DashBoard() {
  const [customers, setCustomers] = useState([]);
  const [driverCoordinates, setDriverCoordinates] = useState([]);

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Token ${token}`
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/list_customers/`, config);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: "900px", perspective: "1000px" }}>
        <h1 className="text-center">Welcome!</h1>
        <Card.Header><Link to="/logout">Logout</Link></Card.Header>
        <MapContainer
          center={[0, 0]}
          zoom={10}
          style={{ height: '400px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {customers.map((customer) => (
            <Marker
              key={customer.id}
              position={[customer.latitude, customer.longitude]}
            >
              <Popup>{customer.customerName}</Popup>
            </Marker>
          ))}
          
        </MapContainer>
        <Card.Body>
        </Card.Body>
        <Card.Footer>
        <DriverLocationTracker setDriverCoordinates={setDriverCoordinates} />
{driverCoordinates.length > 1 && (
  <Polyline positions={driverCoordinates.map(coord => [coord.latitude, coord.longitude])} color="#0000FF" />
)}
          <Card.Link>
            <Link to="/add-customers">Add Customers</Link>
            <br />
            
          </Card.Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default DashBoard;
