

# NestJS User Management API Documentation

## Description
A RESTful API built with NestJS framework for user management with authentication and authorization.

## Setup & Installation

```bash
# Install dependencies
$ npm install

# Run the application
$ npm run start

# Run in development mode
$ npm run start:dev
```

## Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication

#### Register User
```
POST /users
```
Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"  // minimum 6 characters
}
```
Response:
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "access_token": "jwt_token"
}
```

#### Login
```
POST /auth/login
```
Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "access_token": "jwt_token",
  "user": {
    "email": "john@example.com",
    "role": "user",
    "id": "user_id"
  }
}
```

### Users

#### Get All Users (Admin Only)
```
GET /users
Authorization: Bearer {jwt_token}
```
Response:
```json
[
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
]
```

#### Get User by ID
```
GET /users/:id
Authorization: Bearer {jwt_token}
```
Response:
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Update User
```
PATCH /users/:id
Authorization: Bearer {jwt_token}
```
Request Body (all fields optional):
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```
Response:
```json
{
  "id": "user_id",
  "name": "Updated Name",
  "email": "newemail@example.com",
  "role": "user"
}
```

#### Delete User (Admin Only)
```
DELETE /users/:id
Authorization: Bearer {jwt_token}
```
Response:
```json
{
  "message": "User deleted successfully"
}
```

## Data Models

### User Schema
```typescript
{
  _id: string;          // Auto-generated MongoDB ID
  name: string;         // Required
  email: string;        // Required, Unique
  password: string;     // Required, Min length: 6
  role: string;         // Default: "user"
  createdAt: Date;      // Auto-generated
  updatedAt: Date;      // Auto-updated
}
```

## Authentication
- The API uses JWT (JSON Web Tokens) for authentication
- Token must be included in the Authorization header as `Bearer {token}`
- Tokens expire after 60 minutes

## Authorization
Two roles are available:
- `user`: Basic access to own profile
- `admin`: Full access to all endpoints

## Error Responses
```json
{
  "statusCode": number,
  "message": string,
  "error": string
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Input validation using class-validator
- MongoDB injection protection



