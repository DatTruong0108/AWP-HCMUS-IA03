// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Register from './pages/Register';
// import Login from './pages/Login';

// function App() {
//   return (
//     <Router>
//       <div className="container mt-5">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          {/* Điều hướng mặc định đến trang đăng ký */}
          <Route path="/" element={<Navigate to="/register" replace />} />

          {/* Định tuyến trang đăng ký */}
          <Route path="/register" element={<Register />} />

          {/* Định tuyến trang đăng nhập */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          {/* Chỉ cho phép vào Home khi đã đăng nhập */}
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;