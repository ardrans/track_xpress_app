import React, { useState } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import config from '../config';


function AddCustomer() {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone_number: '',
    latitude: '',
    longitude: '',
  });
  const[isModalOpen, setIsModalOpen] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsModalOpen(true);
        }
  
        const configToken = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };
        const response = await axios.post(`${config.apiUrl}/api/create_customers/`, customerData,configToken);
        console.log(response.data);
        history('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
    <Card bg="info" style={{width: "500px", perspective:"1000px"}}>
    <Card.Header><h2>Add Customer</h2></Card.Header>
    <Card.Body>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phonenumber" className="form-label">Phone Number:</label>
          <input
            type="number"
            name="phonenumber"
            value={customerData.phonenumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="latitude" className="form-label">Lattitude:</label>
          <input
            type="float"
            name="latitude"
            value={customerData.latitude}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="longitude" className="form-label">Longitude:</label>
          <input
            type="float"
            name="longitude"
            value={customerData.longitude}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>
      </Card.Body>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Invalid User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Please login First</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      </Card>
    </div>
  );
}

export default AddCustomer;
