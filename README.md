# HCMUS Advanced Web App Programming - CQ2021/3

## IA03 - User Registration API with React Frontend

### 21120050 - Trương Tấn Đạt


Implement a user registration system that consists of a backend API for handling user data and a React frontend to provide a user-friendly interface for registration.

### How to use
#### Clone this repository 

```
git clone https://github.com/DatTruong0108/AWP-HCMUS-IA03.git
```

#### Go into the back-end repository

```
cd be
```

#### Install back-end's dependencies

```
npm install
```

#### Go into the front-end repository

```
cd ../fe
```

#### Install front-end's dependencies

```
npm install
```

### Setup environment variables
Database used: MongoDB
Set up the environment variables for the backend

In the backend directory, create a file named .env and add the following line, replacing ***your-mongodb-uri*** with your actual MongoDB connection string:

```
FE_PORT='3000'
BE_PORT='3001'

DATABASE_URL=<your-mongodb-uri>
```

### Running the project
#### Start the back-end server
```
npm run start
```

#### Start the front-end server
```
npm start
```

The frontend should now be running on [http://localhost:3000](http://localhost:3000)

### Public host deployment:
Front-end server: https://awp-hcmus-ia-03.vercel.app/
Back-end server: https://awp-hcmus-ia03.onrender.com

### Requirements
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
    </tr>
  </tfoot>
</table>