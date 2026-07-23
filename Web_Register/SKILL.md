# SKILL.md
# Web_Register Full-Stack Development Guide

## 1. Purpose

This document defines the architecture, conventions, and development rules for the **Web_Register** project.

This file is intended for AI Coding Agents:

- Cursor
- Claude Code
- GitHub Copilot Agent
- Gemini CLI

Before generating or modifying code, the AI Agent MUST understand and follow this document.

---

# 2. Project Overview

## Project Name

```
Web_Register
```

## Description

Web_Register is a full-stack web application for:

- User registration
- User authentication
- Profile management
- User dashboard
- Personal statistics


The project uses:

Frontend:

```
React + Vite
```

Backend:

```
Node.js + Express
```

Database:

```
Firebase Firestore
```

Authentication:

```
Firebase Authentication
```

---

# 3. System Architecture


```
                 User

                  |

                  |

          React Frontend

                  |

                  |

      Firebase Authentication

                  |

                  |

          Firebase ID Token

                  |

                  |

          Express Backend

                  |

                  |

        Firebase Admin SDK

                  |

                  |

             Firestore

```


---

# 4. Technology Stack


## Frontend

| Technology | Usage |
|-|-|
| React 18+ | UI framework |
| Vite | Build tool |
| React Router | Routing |
| Firebase Client SDK | Authentication |
| Axios | HTTP client |
| CSS | Styling |


---

## Backend

| Technology | Usage |
|-|-|
| Node.js | Runtime |
| Express.js | REST API |
| Firebase Admin SDK | Server Firebase access |
| Firestore | Database |
| dotenv | Environment variables |
| CORS | Security configuration |


---

# 5. Core Architecture Rules


The project follows:

```
Separation of Concerns
```

Each layer has a specific responsibility.


## Frontend

Responsible for:

- UI rendering
- User interaction
- Firebase login/register
- Calling backend APIs
- Displaying data


Frontend MUST NOT:

- Access Firebase Admin SDK
- Store private keys
- Perform admin operations


---

## Backend

Responsible for:

- REST API
- Authentication verification
- Authorization
- Business logic
- Database operations


Backend MUST NOT:

- Handle raw passwords
- Replace Firebase Authentication
- Store secrets in source code


---

# 6. Project Structure


```
Web_Register/

├── backend/
│
│   ├── config/
│   │   └── firebaseAdmin.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validation.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── user.js
│   │
│   ├── .env.local
│   ├── package.json
│   ├── server.js
│   └── README.md
│
│
├── frontend/
│
│   ├── src/
│   │
│   │   ├── config/
│   │   │   └── firebase.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── StatsCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── login.css
│   │   │   ├── register.css
│   │   │   ├── profile.css
│   │   │   └── sidebar.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── README.md
└── SKILL.md

```

---

# 7. Backend Architecture


Backend structure:

```
Request

  |

Routes

  |

Middleware

  |

Controller

  |

Firebase Service

  |

Firestore

```


---

# 8. Backend Entry Point


File:

```
backend/server.js
```


Responsibilities:

- Create Express application
- Configure middleware
- Initialize Firebase Admin
- Register routes
- Start server


Required middleware:


```
express.json()

cors()

dotenv.config()

```

---

# 9. Firebase Admin Configuration


File:

```
backend/config/firebaseAdmin.js
```


Responsibilities:

- Initialize Firebase Admin SDK
- Export Firebase services


Example:

```javascript
admin.auth()

admin.firestore()
```


Credentials MUST come from:

```
.env.local
```


Never:

```
hardcode service account JSON
```

---

# 10. Backend Routes


Location:

```
backend/routes/
```


Routes only define:

- Endpoint
- HTTP method
- Middleware
- Controller


Routes MUST NOT contain business logic.


---

## auth.js


Purpose:

Authentication verification.


Example:


```
GET /api/auth/verify
```


---

## user.js


Protected user APIs.


Example:


```
GET /api/user/profile


PUT /api/user/profile


GET /api/user/stats
```


---

# 11. Controllers


Location:

```
backend/controllers/
```


Controllers handle:

- Business logic
- Firebase operations
- Response formatting


Example:


```
userController.js

getProfile()

updateProfile()

getStats()

```


---

# 12. Middleware


## authMiddleware.js


Purpose:

Verify Firebase ID Token.


Flow:


```
Authorization Header

        |

Bearer Token

        |

Firebase Admin verifyIdToken()

        |

req.user

```


After verification:


```javascript
req.user = {
    uid,
    email
}
```


---

## validation.js


Purpose:

Validate incoming data.


Examples:

- Required fields
- Email format
- Empty values
- Data type checking


```
Invalid input

        |

Return 400

```

---

# 13. Backend Environment


File:

```
.env.local
```


Example:


```env
PORT=5000

FRONTEND_URL=http://localhost:5173

FIREBASE_PROJECT_ID=

FIREBASE_CLIENT_EMAIL=

FIREBASE_PRIVATE_KEY=

```

---
# 14. Firebase Authentication Architecture


Authentication is handled by:

```
Firebase Authentication
```

The backend does NOT implement login/register logic.


---

# 14.1 Authentication Flow


```
User

 |

 |

Register/Login Page

 |

 |

Firebase Client SDK

 |

 |

Firebase Authentication

 |

 |

Firebase ID Token

 |

 |

Axios Request

 |

 |

Express Backend

 |

 |

Firebase Admin verifyIdToken()

 |

 |

Allow / Reject Request

```


---

# 14.2 Frontend Authentication


Frontend uses:


```javascript
firebase/auth
```


Common methods:


Register:


```javascript
createUserWithEmailAndPassword()
```


Login:


```javascript
signInWithEmailAndPassword()
```


Logout:


```javascript
signOut()
```


---

# 14.3 Backend Authentication


Backend receives:


```
Authorization: Bearer <TOKEN>
```


Middleware:


```
authMiddleware.js
```


Process:


```
Extract Token

      |

Verify Token

      |

Get UID

      |

Attach User Information

      |

Continue Request

```


---

# 15. Firestore Database Design


Database:

```
Firestore
```


Main collection:


```
users
```


Structure:


```
users

 └── {uid}

       ├── email

       ├── username

       ├── displayName

       ├── avatar

       ├── createdAt

       ├── updatedAt

       |

       └── statistics

              ├── loginCount

              ├── activityCount

              └── lastLogin

```


---

# 15.1 User Document Example


```json
{
    "email": "user@gmail.com",

    "username": "user01",

    "displayName": "User Name",

    "avatar": "",

    "createdAt": "timestamp",

    "updatedAt": "timestamp"
}
```


---

# 16. REST API Specification


Base URL:


```
/api
```


Example:


```
http://localhost:5000/api
```


---

# 16.1 Authentication API


## Verify Firebase Token


Endpoint:


```
GET /api/auth/verify
```


Headers:


```
Authorization:
Bearer TOKEN
```


Response:


```json
{
    "success": true,

    "data": {
        "uid": "abc123",
        "email": "user@gmail.com"
    }
}
```


---

# 16.2 User APIs


## Get Profile


Method:


```
GET
```


Endpoint:


```
/api/user/profile
```


Authentication:


```
Required
```


Response:


```json
{
    "success": true,

    "data": {

        "username": "user01",

        "email": "user@gmail.com"

    }
}
```


---

## Update Profile


Method:


```
PUT
```


Endpoint:


```
/api/user/profile
```


Request:


```json
{
    "username": "newUsername",

    "displayName": "New Name"
}
```


Response:


```json
{
    "success": true,

    "message": "Profile updated"
}
```


---

## Get Statistics


Method:


```
GET
```


Endpoint:


```
/api/user/stats
```


Response:


```json
{
    "success": true,

    "data": {

        "loginCount": 10,

        "activityCount": 20

    }
}
```


---

# 17. API Response Convention


All APIs MUST return consistent JSON.


Success:


```json
{
    "success": true,

    "message": "",

    "data": {}
}
```


Error:


```json
{
    "success": false,

    "message": "",

    "error": ""
}
```


---

# 18. HTTP Status Codes


Use:


```
200
Success


201
Created


400
Bad Request


401
Unauthorized


403
Forbidden


404
Not Found


500
Internal Server Error

```


---

# 19. Frontend Architecture


Frontend structure:


```
Pages

 |

Components

 |

Services

 |

Firebase/API

```


---

# 20. Frontend Configuration


## firebase.js


Location:


```
src/config/firebase.js
```


Responsibilities:


- Initialize Firebase Client SDK
- Export auth instance


Example:


```javascript
export const auth = getAuth(app)
```


Environment variables:


```
VITE_FIREBASE_API_KEY

VITE_FIREBASE_AUTH_DOMAIN

VITE_FIREBASE_PROJECT_ID

VITE_FIREBASE_APP_ID

```


---

# 21. API Service Layer


File:


```
src/services/api.js
```


Responsibilities:


- Create Axios instance
- Set API URL
- Attach Firebase Token
- Handle common errors


Flow:


```
Component

 |

api.js

 |

Express API

```


---

# 21.1 Axios Interceptor


Before request:


```
Get Current Firebase User

        |

Get ID Token

        |

Attach Authorization Header

```


Example:


```http
Authorization:
Bearer eyJhbGciOi...
```


---

# 22. React Routing


Main routes:


```
/

/login


/register


/profile

```


---

# 22.1 Protected Route


Profile page requires authentication.


Flow:


```
Open /profile


       |

Check Auth State


       |

       +---- Not logged in

       |

       Redirect /login



       |

       Logged in

       |

       Render Profile

```


---

# 23. React Pages


Location:


```
src/pages/
```


---

# Login.jsx


Responsibilities:


- Login form
- Firebase authentication
- Error handling
- Redirect


---

# Register.jsx


Responsibilities:


- Registration form
- Validation
- Firebase account creation
- Create Firestore user document


---

# Profile.jsx


Responsibilities:


- Fetch user profile
- Update information
- Display statistics


---

# 24. React Components


Location:


```
src/components/
```


Components MUST be:

- Reusable
- Small
- Independent


---

# Button.jsx


Reusable button.


Variants:


```
primary

secondary

danger

```


---

# InputField.jsx


Reusable input.


Features:


- Label
- Placeholder
- Error message
- Controlled value


---

# ProfileCard.jsx


Displays:


- Avatar
- Username
- Email


---

# StatsCard.jsx


Displays:


- User statistics
- Dashboard metrics


---

# SideBar.jsx


Navigation component.


Contains:


```
Dashboard

Profile

Settings

Logout

```


---

# 25. Authentication Context


Location:


```
src/context/AuthContext.jsx
```


Purpose:


- Store current user
- Provide auth state globally


Example:


```
AuthProvider

      |

      |

All Components

```


---

# 26. Custom Hooks


Location:


```
src/hooks/
```


Example:


```
useAuth.js
```


Purpose:


Simplify authentication usage.


Example:


```javascript
const {
    user,
    loading
}=useAuth()

```

---
# 27. Styling Architecture


The project uses modular CSS.


Location:


```
src/styles/
```


CSS files:


```
global.css

login.css

register.css

profile.css

sidebar.css

```


---

# 27.1 global.css


Contains:


- CSS reset
- Global variables
- Typography
- Common utilities


Example:


```css
:root {

    --primary-color: #2563eb;

    --background-color: #ffffff;

    --text-color: #111827;

}

```


---

# 27.2 Page Styling


Each page should have its own CSS file.


Example:


```
Login.jsx

        |

        |

login.css

```


Avoid putting all styles into one large CSS file.


---

# 28. Frontend Coding Rules


The AI Agent MUST:


- Use functional React components.
- Use React Hooks.
- Keep components reusable.
- Separate UI and logic.
- Handle loading states.
- Handle error states.
- Avoid duplicated code.


---

# 29. React Component Rules


Preferred:


```jsx
function Profile(){

    return (

        <div>
            Profile
        </div>

    );

}


export default Profile;

```


Avoid:


- Class components.
- Huge components.
- Components containing API/business logic everywhere.


---

# 30. Naming Convention


The project follows:


## JavaScript


Variables and functions:


```
camelCase
```


Example:


```javascript
getUserProfile()

const userName

```


---

## React Components


Files:


```
PascalCase.jsx
```


Example:


```
ProfileCard.jsx

InputField.jsx

```


---

## CSS


Files:


```
lowercase.css
```


Example:


```
profile.css

login.css

```


---

## Constants


Use:


```
UPPER_CASE
```


Example:


```javascript
const API_URL = "";

```


---

# 31. Backend Coding Standards


Use:


```
ES Modules

async/await

try/catch

REST API pattern

```


Example:


```javascript
export async function getProfile(req,res){

    try{

        const data = await getUser();

        res.json({

            success:true,

            data

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

}

```


---

# 32. Error Handling Rules


Every asynchronous operation MUST handle errors.


Backend:


Must include:


```javascript
try {

}

catch(error){

}

```


Frontend:


Must handle:


```
loading

success

error

```


Example:


```
Loading profile...


Profile loaded


Unable to load profile

```


---

# 33. Security Rules


The AI Agent MUST follow security principles.


---

## Never:


Do NOT:


- Hardcode Firebase credentials.
- Store passwords.
- Expose private keys.
- Trust frontend validation only.
- Skip token verification.
- Disable CORS security without reason.


---

## Always:


Do:


- Use environment variables.
- Verify Firebase ID Token.
- Validate incoming data.
- Sanitize user input.
- Return safe error messages.


---

# 34. Firebase Security Rules


Firebase client configuration is public.


Allowed:


```
VITE_FIREBASE_API_KEY

VITE_FIREBASE_PROJECT_ID

```


Not allowed:


```
Firebase Admin Private Key

Service Account JSON

```


---

# 35. Git Rules


The AI Agent MUST NOT commit:


```
.env

.env.local

serviceAccount.json

node_modules/

dist/

```


Recommended:


```
.gitignore

```


must include:


```
node_modules

.env*

dist

```


---

# 36. Dependency Rules


Before adding a new dependency:


The AI Agent should check:


1. Does the project already solve this problem?
2. Is the dependency necessary?
3. Does it increase complexity?


Avoid unnecessary packages.


---

# 37. File Modification Rules


When modifying existing code:


The AI Agent MUST:


- Preserve existing functionality.
- Avoid unrelated changes.
- Follow current coding style.
- Explain breaking changes.


The AI Agent MUST NOT:


- Rewrite the whole project.
- Move files without reason.
- Change architecture without approval.


---

# 38. Database Modification Rules


Before changing Firestore structure:


The AI Agent MUST consider:


- Existing user documents.
- Migration requirements.
- Backward compatibility.


Never randomly rename fields.


Example:


Avoid:


```
username

-->

name

```


without migration planning.


---

# 39. API Modification Rules


Before changing API:


Consider:


- Existing frontend usage.
- Request format.
- Response format.
- Authentication requirements.


Avoid breaking existing endpoints.


---

# 40. Development Workflow


When implementing a new feature:


Follow:


```
1. Understand requirement


2. Check existing architecture


3. Design data flow


4. Implement backend


5. Implement frontend


6. Test


7. Refactor

```


---

# 41. AI Agent Behavior Rules


The AI Agent should behave as a senior software engineer.


---

## Before Coding


The AI Agent should:


- Inspect existing files.
- Understand current architecture.
- Reuse existing code.


---

## While Coding


The AI Agent should:


- Write clean code.
- Keep functions small.
- Follow project conventions.
- Avoid unnecessary complexity.


---

## After Coding


The AI Agent should:


- Check for errors.
- Check imports.
- Check naming consistency.
- Explain important changes.


---

# 42. Feature Implementation Checklist


Before completing a feature:


## Backend


Check:


- Route created.
- Controller implemented.
- Validation added.
- Authentication protected.
- Error handling added.


---

## Frontend


Check:


- Component created.
- API connected.
- Loading state handled.
- Error state handled.
- Responsive UI considered.


---

# 43. Definition of Done


A feature is complete when:


- Code follows project structure.
- Security rules are satisfied.
- API works correctly.
- Frontend displays correctly.
- Errors are handled.
- No secrets are exposed.
- Existing functionality is not broken.


---

# 44. Future Extension Guidelines


The project may later include:


- User roles.
- Admin dashboard.
- Email verification.
- Password reset.
- Profile avatar upload.
- Notification system.
- Analytics.


When extending:


Maintain the same principles:


```
Reusable

Secure

Maintainable

Scalable

```


