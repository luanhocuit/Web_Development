import { auth, db } from '../config/firebase.js';
import { validatePassword } from '../middleware/validation.js';

export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if email already exists in Firestore
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    
    if (!userSnapshot.empty) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Create user in Firebase Authentication
    const userCredential = await auth.createUser({
      email: email,
      password: password
    });

    // Store user data in Firestore
    await db.collection('users').doc(userCredential.uid).set({
      uid: userCredential.uid,
      email: email,
      fullName: fullName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
      profilePicture: ''
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully',
      user: {
        uid: userCredential.uid,
        email: userCredential.email,
        fullName: fullName
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    if (error.code === 'auth/weak-password') {
      return res.status(400).json({
        success: false,
        message: 'Password is too weak'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Dùng REST API của Firebase để xác thực MẬT KHẨU
    const API_KEY = "AIzaSyCVUd9Rs6PMOyj7GpRaLs8PhqZvKqiw9BQ"; 
    const verifyPasswordUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    const authResponse = await fetch(verifyPasswordUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    const authData = await authResponse.json(); 

    // Nếu sai mật khẩu hoặc tài khoản không tồn tại
    if (!authResponse.ok) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 2. Lấy thông tin user từ Firestore DB
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    
    let userData = { uid: authData.localId, email: email, fullName: "User" };
    
    if (!userSnapshot.empty) {
      userData = userSnapshot.docs[0].data();
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        uid: userData.uid,
        email: userData.email,
        fullName: userData.fullName || "User"
      },
      token: authData.idToken
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login',
      error: error.message
    });
  }
};

export const verifyPassword = async (email, password) => {
  return true;
};

// ==========================================
// TỰ ĐỘNG KHỞI TẠO TÀI KHOẢN ADMIN KHI CHẠY SERVER
// ==========================================
const initializeAdminAccount = async () => {
    const adminEmail = "admin@gmail.com";
    const adminPass = "spain>argentina";

    try {
        const adminRecord = await auth.createUser({
            email: adminEmail,
            password: adminPass,
            displayName: "System Admin"
        });

        await db.collection('users').doc(adminRecord.uid).set({
            uid: adminRecord.uid,
            email: adminEmail,
            fullName: "System Admin",
            role: "admin",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        
    } catch (error) {
        if (error.code !== 'auth/email-already-exists') {
            console.error("Lỗi khi tạo Admin:", error);
        }
    }
};

initializeAdminAccount();