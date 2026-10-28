# Healthcare Backend API

A REST API for managing users, patients, doctors, and patient-doctor assignments using Node.js, Express.js, PostgreSQL, Sequelize, and JWT.

## Live Deployment

- **Live API:** https://healthcare-backend-muc5.onrender.com
- **Health Check:** https://healthcare-backend-muc5.onrender.com/api/health

## Features

- User registration and login
- Password hashing with bcryptjs
- JWT authentication
- Patient CRUD with ownership checks
- Doctor CRUD with validation
- Patient-doctor assignment management
- PostgreSQL database integration

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcryptjs

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sehajatin-jpg/healthcare-backend.git
   cd healthcare-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a PostgreSQL database named `healthcare_db`.

4. Create a `.env` file in the project root:

   ```env
   PORT=8000
   DB_NAME=healthcare_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1d
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

The local server runs at `http://localhost:8000`, provided your application is configured to use port 8000.

## API Endpoints

### Authentication

- POST `/api/auth/register/`
- POST `/api/auth/login/`

### Patients (JWT required)

- POST `/api/patients/`
- GET `/api/patients/`
- GET `/api/patients/:id/`
- PUT `/api/patients/:id/`
- DELETE `/api/patients/:id/`

### Doctors (JWT required)

- POST `/api/doctors/`
- GET `/api/doctors/`
- GET `/api/doctors/:id/`
- PUT `/api/doctors/:id/`
- DELETE `/api/doctors/:id/`

### Patient-Doctor Mappings (JWT required)

- POST `/api/mappings/`
- GET `/api/mappings/`
- GET `/api/mappings/:patient_id/`
- DELETE `/api/mappings/:id/`

## Authentication

For protected endpoints, send the JWT token in the request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Obtain the token by logging in through `/api/auth/login/`.

## Testing

Test all endpoints using Postman. Include:

- Successful registration and login
- Patient and doctor CRUD operations
- Patient-doctor assignments
- Invalid inputs and duplicate emails
- Requests without authentication tokens
- Patient ownership checks

## Deployment

The backend is deployed on Render.

- **Production Base URL:** https://healthcare-backend-muc5.onrender.com
- **Health Endpoint:** https://healthcare-backend-muc5.onrender.com/api/health

Use the production base URL instead of `http://localhost:8000` when testing the deployed APIs.

## Security

- Passwords are hashed before storage.
- JWT authentication protects patient, doctor, and mapping endpoints.
- Patient records are restricted to their creating user.
- JWT secrets and database credentials are stored in environment variables.
- The `.env` file must not be committed to GitHub.
