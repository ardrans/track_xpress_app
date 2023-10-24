import React, { useState } from 'react';
import config from '../config';
import { useNavigate } from 'react-router-dom';



const OTPVerification = () => {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');


  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const history = useNavigate();

  const handleVerification = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/verify_otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otp }),
      });

      if (response.status === 200) {
        setMessage('Phone number verified.');
        history('/login');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error verifying OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('An error occurred while verifying OTP.');
    }
  };

  return (
    <div>
      <h1>OTP Verification</h1>
      <div>
        <label>OTP:</label>
        <input type="text" value={otp} onChange={handleOTPChange} />
      </div>
      <button onClick={handleVerification}>Verify OTP</button>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default OTPVerification;
