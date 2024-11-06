// src/pages/Home.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../state/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate('/login');
    } catch (err) {
      setError('Failed to logout. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg">
        <div className="card-header d-flex justify-content-between bg-primary text-white">
          <h1>Welcome to the Home Page</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
        <div className="card-body">
          <img
            src='/avatar.jpg'
            alt="Trương Tấn Đạt"
            className="rounded-circle mb-3"
            style={{ width: '150px', height: '150px' }}
          />
          <h2 className="card-title">Trương Tấn Đạt</h2>
          <p className="card-text"><strong>Student ID</strong>: 21120050</p>
          <p className="card-text"><strong>Student email</strong>: 21120050@student.hcmus.edu.vn</p>
          <hr />
        </div>
        <span>© Copyright by Dat Truong</span>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default Home;