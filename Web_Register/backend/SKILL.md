# Web Register - Backend Skill Documentation

## Project Overview

A full-stack web application for user registration and profile management using React (frontend) and Node.js/Express (backend) with Firebase as the database.

## Tech Stack

### Frontend
- React 18+
- Vite (Build tool)
- CSS for styling
- Components: RegisterPage, LoginPage, ProfilePage

### Backend
- Node.js (Runtime)
- Express.js (Web framework)
- Firebase Admin SDK (Authentication & Database)
- Validator (Input validation)
- CORS (Cross-origin support)

### Database
- Firebase Authentication (User credentials)
- Firestore (User data storage)

## Key Features

### 1. User Registration
- Email validation (format check)
- Email duplication prevention
- Password strength validation:
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 special character
- Confirm password matching
- User data stored in Firestore
- Auto-redirect to login on success

### 2. User Login
- Email and password verification
- Custom token generation
- Session management
- Redirect to profile on success

### 3. User Profile
- View profile information
- Edit profile (name, phone, address, DOB, picture)
- Update data in real-time to Firestore
- Delete account functionality

## API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### POST /auth/register
Registers a new user with validation

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Successfully",
  "user": { "uid": "...", "email": "...", "fullName": "..." }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid Email | Email already exists | Password is too weak | ..."
}
```

#### POST /auth/login
Authenticates user and returns token

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { "uid": "...", "email": "...", "fullName": "..." },
  "token": "custom_token"
}
```

#### GET /users/:uid
Retrieves user profile information

**Response (200):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "user": { 
    "uid": "...",
    "email": "...",
    "fullName": "...",
    "phoneNumber": "...",
    "address": "...",
    "dateOfBirth": "...",
    "profilePicture": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### PUT /users/:uid
Updates user profile information

**Request:**
```json
{
  "fullName": "Jane Doe",
  "phoneNumber": "+84123456789",
  "address": "123 Main St",
  "dateOfBirth": "1990-01-01",
  "profilePicture": "image_url"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

#### DELETE /users/:uid
Deletes user account

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## File Structure

```
backend/
├── config/
│   └── firebase.js              # Firebase initialization & setup
├── controllers/
│   ├── authController.js        # Register & Login logic
│   └── userController.js        # Profile operations
├── middleware/
│   └── validation.js            # Input validation & checks
├── routes/
│   ├── auth.js                  # /api/auth endpoints
│   └── user.js                  # /api/users endpoints
├── server.js                    # Main server & middleware setup
├── package.json                 # Dependencies & scripts
├── .env.example                 # Environment variables template
├── README.md                    # Setup & usage guide
└── SKILL.md                     # This file
```

## Environment Variables

Required in `.env.local`:

```
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CLIENT_X509_CERT_URL=your_cert_url
FIREBASE_DATABASE_URL=your_database_url
```

## Validation Rules

### Email
- Must be valid email format (RFC 5322)
- Cannot be duplicate in system
- Case-insensitive comparison

### Password
- Minimum 8 characters required
- Must include uppercase: A-Z
- Must include lowercase: a-z
- Must include special char: !@#$%^&*()_+-=[]{}';:"\\|,.<>/?

### Full Name
- Minimum 2 characters
- Trimmed (no leading/trailing whitespace)

### Confirm Password
- Must exactly match password field

## Error Handling

All errors follow consistent JSON format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Error messages by status code:
- **400**: Validation errors, email exists, password mismatch
- **401**: Authentication failed (invalid credentials)
- **404**: User not found
- **500**: Server error

## Middleware Chain

1. **CORS Middleware** - Enable cross-origin requests
2. **Body Parser** - Parse JSON/URL-encoded request bodies
3. **Request Logger** - Log all incoming requests
4. **Route Handlers** - Process specific endpoints
5. **Validation Middleware** - Validate input data (on auth routes)
6. **Controllers** - Execute business logic
7. **Error Handler** - Catch and format errors

## Database Security

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Only authenticated users can read/write their own data
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

### Firebase Auth
- Passwords handled by Firebase Admin SDK
- Private keys secured in environment variables
- CORS restricted to specified frontend URL

## Common Issues & Solutions

### Issue: "Email already exists"
- **Cause**: Email registered in previous signup
- **Solution**: Use different email or check Firestore console

### Issue: "Password is too weak"
- **Cause**: Password doesn't meet complexity requirements
- **Solution**: Use 8+ chars with uppercase, lowercase, special char

### Issue: CORS Error
- **Cause**: Frontend URL not in CORS whitelist
- **Solution**: Update FRONTEND_URL in .env.local

### Issue: Firebase Connection Error
- **Cause**: Invalid credentials or network issue
- **Solution**: Verify .env.local and Firebase project settings

## Performance Considerations

- Request size limited to 50MB for JSON/URL-encoded data
- Firestore queries indexed on email field
- Response includes timestamps for caching
- Stateless architecture for horizontal scaling

## Future Enhancements

- Email verification with OTP
- Password reset functionality
- Two-factor authentication
- Refresh token management
- Role-based access control (Admin, User, Moderator)
- User activity logging
- Profile picture upload to Cloud Storage
- Rate limiting for API endpoints

## Testing

Run validation tests:
```bash
npm test
```

Endpoints can be tested with:
- Postman
- curl
- REST Client VS Code extension
- Frontend application

## Deployment Checklist

- [ ] Update FRONTEND_URL for production domain
- [ ] Set NODE_ENV=production
- [ ] Verify Firebase credentials
- [ ] Enable HTTPS
- [ ] Configure firewall rules
- [ ] Set up monitoring/logging
- [ ] Test all endpoints
- [ ] Run security audit
- [ ] Document API for team
- [ ] Create deployment guide

## Support & Contributing

See main repository README for contribution guidelines and support channels.
