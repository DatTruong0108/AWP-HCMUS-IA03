import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../public/Register.css'; // Để dùng lại CSS của Register
import { AuthContext } from '../state/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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
      const response = await axios.post('https://awp-hcmus-ia03.onrender.com/auth/login', { email, password });
      if (response.status === 200 || response.status === 201) {
        console.log('Login successful', response.data);
        const { accessToken } = response.data;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          login(accessToken);
          navigate('/profile');
        } else {
          setError('Failed to retrieve token. Please try again.');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card register-card shadow-lg p-4">
        <h2 className="card-title text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </div>
          <div className='have-acc mt-10 d-flex justify-content-center' style={{ fontSize: '14px' }}>
            <span>Create an account? <a className='text-success fw-bold' style={{cursor:'pointer',textDecoration:'none'}} onClick={() => navigate('/register')}>Sign up</a></span>
          </div>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default Login;