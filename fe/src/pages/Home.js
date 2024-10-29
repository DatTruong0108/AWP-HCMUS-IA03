import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
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

          <h4 className="mb-3">AWP - IA03</h4>
          <p><strong>Project:</strong> User Registration API with React</p>
          <p><strong>Objective:</strong> Implement a user registration system that consists of a backend API for handling user data and a React frontend to provide a user-friendly interface for registration.</p>
          
          <hr />

          <h4 className="mt-4">Requirements</h4>
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Requirement</th>
                <th>Details</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Backend Implementation</td>
                <td>API Endpoints</td>
                <td>2</td>
                <td>&#10004;</td>
              </tr>
              <tr>
                <td>Backend Implementation</td>
                <td>Error Handling</td>
                <td>2</td>
                <td>&#10004;</td>
              </tr>
              <tr>
                <td>Frontend Implementation</td>
                <td>Routing</td>
                <td>1</td>
                <td>&#10004;</td>
              </tr>
              <tr>
                <td>Frontend Implementation</td>
                <td>API Integration</td>
                <td>2</td>
                <td>&#10004;</td>
              </tr>
              <tr>
                <td>Frontend Implementation</td>
                <td>User Experience</td>
                <td>2</td>
                <td>&#10004;</td>
              </tr>
              <tr>
                <td>Public Host Deployment</td>
                <td>Deployment</td>
                <td>1</td>
                <td>&#10004;</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="2">Total</th>
                <th>10</th>
                <th>&#10004;</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <span>© Copyright by Dat Truong</span>
      </div>
    </div>
  );
};

export default Home;
