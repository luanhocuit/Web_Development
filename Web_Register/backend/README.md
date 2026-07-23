# Web Register Backend API

Backend for the Web Register Application using Node.js, Express, and Firebase.

## Features

- User Registration with validation
  - Email format validation
  - Password strength requirements (8+ chars, uppercase, lowercase, special character)
  - Email duplication check
  - Confirm password validation
  
- User Login with authentication
- User Profile Management (Get, Update, Delete)
- Firebase Integration for authentication and data storage
- CORS support for frontend communication

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase Project with Admin SDK credentials

## Installation

1. Clone the repository
```bash
cd backend
npm install
```

2. Set up environment variables
```bash
cp .env.example .env.local
```

3. Fill in your Firebase credentials in `.env.local`

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Generate Admin SDK credentials:
   - Go to Project Settings
   - Service Accounts tab
   - Generate new private key (JSON)
   - Copy the values to `.env.local`

## Running the Server

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "fullName": "John Doe"
}
```
- **Response (Success):**
```json
{
  "success": true,
  "message": "Successfully",
  "user": {
    "uid": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

#### Login User
- **POST** `/api/auth/login`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
- **Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "uid": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  },
  "token": "custom_token"
}
```

### User Profile

#### Get User Profile
- **GET** `/api/users/:uid`
- **Response:**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "user": {
    "uid": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phoneNumber": "+84123456789",
    "address": "123 Main St",
    "dateOfBirth": "1990-01-01",
    "profilePicture": "url_to_image",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User Profile
- **PUT** `/api/users/:uid`
- **Request Body:**
```json
{
  "fullName": "Jane Doe",
  "phoneNumber": "+84987654321",
  "address": "456 New St",
  "dateOfBirth": "1990-01-01",
  "profilePicture": "url_to_new_image"
}
```
- **Response (Success):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

#### Delete User
- **DELETE** `/api/users/:uid`
- **Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## Password Requirements

Passwords must meet the following criteria:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one special character (!@#$%^&*...)

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common errors:
- `"Invalid Email"` - Email format is invalid
- `"Email already exists"` - Email already registered
- `"Password is too weak"` - Password doesn't meet requirements
- `"Confirm Password does not match"` - Passwords don't match
- `"User not found"` - User ID doesn't exist

## Folder Structure

```
backend/
├── config/
│   └── firebase.js          # Firebase initialization
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User profile logic
├── middleware/
│   └── validation.js        # Validation rules and middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   └── user.js              # User routes
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Database Schema (Firestore)

### Users Collection
```
users/
├── {uid}/
│   ├── uid: string
│   ├── email: string
│   ├── fullName: string
│   ├── phoneNumber: string
│   ├── address: string
│   ├── dateOfBirth: string
│   ├── profilePicture: string
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

## Security Rules (Firestore)

Add these security rules to your Firestore Database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## CORS Configuration

By default, CORS is enabled for `http://localhost:5173`. 
Update `FRONTEND_URL` in `.env.local` to match your frontend URL.

## Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Update `FRONTEND_URL` to production domain
3. Ensure Firebase credentials are securely stored
4. Use environment variables from your hosting platform

## Troubleshooting

- **Port already in use:** Change PORT in `.env.local`
- **Firebase connection error:** Check Firebase credentials and internet connection
- **CORS error:** Verify FRONTEND_URL in `.env.local` matches frontend origin

## Support

For issues or questions, please create an issue in the repository.
