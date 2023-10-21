import React, { useState } from 'react';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import config from '../config';


const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    const[loggedIn, setLoggedIn] = useState(false);
    const { username, password } = formData;
    const history = useNavigate();

    const storeToken = (token) => {
      localStorage.setItem('token', token);
      console.log(token);
      setLoggedIn(true);
      history('/dashboard');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
          const response = await axios.post(`${config.apiUrl}/api/login/`, formData);
          console.log('Login successful:', response);
          console.log(response.data.access_token);
          storeToken(response.data.data.access_token);
      } catch (error) {
          console.log(error);
          if (error.response.data.message === "Invalid username or password.") {
              toast.error("Invalid username or password.");
          } else {
              console.error('Login failed:', error.response.data);
          }
      }
  };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
    return(
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="container mt-5">
        <div className="App">       
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <div className="container mt-5">
            <div className="centered-container">
            <Card bg="info" style={{width: "600px", perspective:"1000px"}}>
            <Card.Header>
          <h2 className="text-center">Login</h2>
         </Card.Header>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
            </div>
            <div className="mb-3">
            <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
            </div>
            <Card.Footer style={{display: 'flex', justifyContent:'flex-end'}}>
            <button type="submit" className="btn btn-primary">Login</button>
            <br></br>          
            </Card.Footer>
            <Card.Link>
            <Link to="/signup">You Dont Have an Account?Signup</Link>
            </Card.Link>
          </form>
          </Card>
          </div>
          </div>
          </div>    
          </div>
          </div>
          <ToastContainer />
        </div>
    );

};



export default Login;
