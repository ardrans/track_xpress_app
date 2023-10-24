import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Logout from './Components/Logout';
import AddCustomer from './Components/CreateCustomers';
import DashBoard from './Components/DashBoard';
import OTPVerification from './Components/Otp';

const App = () => {

  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
   <div>
    <Container>
      <Router>
        <div class="row justify-content-center">
          <h1 class="text-center">Welcome to Track-Xpress-App</h1>
          <nav>
          <ul><Link to="/">Login</Link></ul>
            <Routes>
            {isLoggedIn && <Route path="/" element={<Navigate to="/dashboard" />} />}
              <Route path="/signup" element={<Signup />}/>
              <Route path="/" element={<Login />}/>
              <Route path="/add-customers" element={<AddCustomer />}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="/dashboard" element={<DashBoard />}/>
              <Route path="/otp" element={<OTPVerification />}/>
            </Routes>
            </nav>
        </div>
      </Router>
    </Container>
   </div>
  );
};

export default App;