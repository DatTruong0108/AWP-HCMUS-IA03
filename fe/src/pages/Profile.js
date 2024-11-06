import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../state/AuthContext';

const Profile = () => {
  const { token, isAuthenticated, setIsAuthenticated, logout } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setError('Unauthorized access. Please log in to continue.');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://awp-hcmus-ia03.onrender.com/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        setError('Failed to fetch profile information. Please log in again.');
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, navigate, isAuthenticated, setIsAuthenticated]);

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg">
        <div className="card-body">
          <h2 className="card-title">User Profile</h2>
          <p className="card-text"><strong>Email:</strong> {userProfile.email}</p>
          <p className="card-text"><strong>Created At:</strong> {new Date(userProfile.createdAt).toLocaleString()}</p>
          <button className="btn btn-danger mt-3" onClick={() => {
            try {
              logout();
              navigate('/login');
            } catch (err) {
              setError('Failed to logout. Please try again.');
            }
          }}>Logout</button>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/home')}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;