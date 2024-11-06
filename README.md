# HCMUS Advanced Web App Programming - CQ2021/3

## IA04 - JWT Authentication

### 21120050 - Trương Tấn Đạt


Implement a full-stack authentication system using JWT to secure user login and registration.
The frontend will use React to allow users to register, log in, and access protected content. The
backend will handle user authentication, issue JWT tokens upon login, and verify tokens to
protect specific routes.

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
Front-end server: https://awp-hcmus-ia-03.vercel.app
Back-end server: https://awp-hcmus-ia03.onrender.com

### Requirements
<table className="table table-bordered mt-3">
  <thead className="table-light">
    <tr>
      <th>Criteria</th>
      <th>Description</th>
      <th>Score</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Registration Endpoint</td>
      <td>Works perfectly; validations and hashing are correct.</td>
      <td>0.5</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Login Endpoint</td>
      <td>Works correctly; token generated and returned.</td>
      <td>0.5</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>JWT Token Validation</td>
      <td>Proper middleware with token verification on all protected routes.</td>
      <td>0.5</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Profile (Protected Route)</td>
      <td>Protected route works; only accessible with valid token</td>
      <td>0.5</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Register page</td>
      <td></td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Login page</td>
      <td></td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Profile page</td>
      <td></td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Home page</td>
      <td>Display content based on authentication status</td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Frontend Form Handling</td>
      <td>All forms work smoothly; good UX with error handling</td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>State Management</td>
      <td>State managed well; token and user info updated smoothly.</td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Error Handling and Feedback</td>
      <td>Comprehensive error handling; clear user feedback.</td>
      <td>1</td>
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