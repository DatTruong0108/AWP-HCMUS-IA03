import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../public/Register.css'; // Thêm file CSS tùy chỉnh
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../state/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    try {
      const response = await axios.post('https://awp-hcmus-ia03.onrender.com/user/register', {
        email,
        password,
      });
            
      if (response.status === 200 || response.status === 201) {
        setMessage(response.data.message);
        login(response.data.accessToken);
        setEmail('');
        setPassword('');
        navigate('/profile');
      }
    } catch (error) {
      setMessage('');
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card register-card shadow-lg p-4">
        <h2 className="card-title text-center mb-4">Sign up</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label htmlFor="email">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`form-control ${error && !email ? 'is-invalid' : ''}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && !email && (
              <div className="invalid-feedback">Please enter a valid email address.</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`form-control ${error && password.length < 6 ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && password.length < 6 && (
              <div className="invalid-feedback">Password must be at least 6 characters.</div>
            )}
          </div>
          <div style={{ borderTop: 'none' }} className="card-footer d-flex justify-content-center p-0">
            <button type="submit" className="btn sign-up-btn btn-success w-100">Sign up</button>
          </div>
          <div className='have-acc mt-10 d-flex justify-content-center' style={{ fontSize: '14px' }}>
            <span>Already have an account? <a className='text-primary' style={{cursor:'pointer',textDecoration:'none'}} onClick={() => navigate('/login')}>Sign in</a></span>
          </div>
        </form>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default Register;