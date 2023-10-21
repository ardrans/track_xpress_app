import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';


function DashBoard() {
  const [customers, setCustomers] = useState([]);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
       Authorization: `Token ${token}`
       
   }
   };
  
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/list_customers/`, config);
        setCustomers(response.data); 
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, []);
  

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <Card style={{width: "900px", perspective:"1000px"}}>
      <h1 class="text-center">Links</h1>
      <Card.Body>
      <table>
  <thead>
    <tr>
      <th style={{ textAlign: 'center', padding: '10px'}}>Customer</th>
      <th style={{ textAlign: 'center', padding: '10px'}}>Customername</th>
    </tr>
  </thead>
  <tbody>
    {customers.map((customer) => (
      <tr key={customer.id}>
        <td>{customer.name}</td>
        <br></br>
        <td>{}</td>
      </tr>
    ))}
  </tbody>
</table>
      </Card.Body>
      <Card.Footer>
      <Card.Link>
      <Link to="/add-customers">Add Customers</Link>
      <br></br>
      <Link to="/logout">Logout</Link>
      </Card.Link>
      </Card.Footer>
      </Card>
    </div>
  );
}

export default DashBoard;
