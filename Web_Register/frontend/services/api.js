// frontend/src/services/api.js

const API_URL = process.env.REACT_APP_API_URL || 'https://web-register-new.onrender.com';

// ==================== AUTH ENDPOINTS ====================

export const registerUser = async (email, password, confirmPassword, fullName) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, { // Thêm /api ở đây
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        fullName
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Register API error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, { // Thêm /api ở đây
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Login API error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

// ==================== USER PROFILE ENDPOINTS ====================

export const getUserProfile = async (uid) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${uid}`, { // Thêm /api ở đây
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Get profile API error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

export const updateUserProfile = async (uid, profileData) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${uid}`, { // Thêm /api ở đây
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData)
    });
    return await response.json();
  } catch (error) {
    console.error('Update profile API error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

export const deleteUserAccount = async (uid) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${uid}`, { // Thêm /api ở đây
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Delete user API error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`, { // Đã có /api sẵn ở đây
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    return {
      success: false,
      message: 'Backend is not responding'
    };
  }
};