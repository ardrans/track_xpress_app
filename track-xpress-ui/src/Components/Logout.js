import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';


const Logout = () => {
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/logout/`,
        null,
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Logout successful:', response.data);
      localStorage.removeItem('token');
      history('/');
    } catch (error) {
      console.error('Logout failed:', error.response.data);
    }
  };

  return (
    <Button variant="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
