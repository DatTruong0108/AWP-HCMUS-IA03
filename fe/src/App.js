import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthProvider, AuthContext } from './state/AuthContext';
import { useContext } from 'react';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />

            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
