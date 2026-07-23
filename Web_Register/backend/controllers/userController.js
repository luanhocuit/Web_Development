import { auth, db } from '../config/firebase.js';

export const getUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;

    // Validate UID
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Get user data from Firestore
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userData = userDoc.data();

    return res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      user: userData
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving profile',
      error: error.message
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    const { fullName, phoneNumber, address, dateOfBirth, profilePicture } = req.body;

    // Validate UID
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Check if user exists
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prepare update data
    const updateData = {
      updatedAt: new Date().toISOString()
    };

    if (fullName !== undefined) {
      if (fullName.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Full Name must be at least 2 characters'
        });
      }
      updateData.fullName = fullName;
    }

    if (phoneNumber !== undefined) {
      updateData.phoneNumber = phoneNumber;
    }

    if (address !== undefined) {
      updateData.address = address;
    }

    if (dateOfBirth !== undefined) {
      updateData.dateOfBirth = dateOfBirth;
    }

    if (profilePicture !== undefined) {
      updateData.profilePicture = profilePicture;
    }

    // Update user document in Firestore
    await db.collection('users').doc(uid).update(updateData);

    // Get updated user data
    const updatedUserDoc = await db.collection('users').doc(uid).get();
    const updatedUserData = updatedUserDoc.data();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUserData
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating profile',
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;

    // Validate UID
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Check if user exists
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user from Firebase Authentication
    await auth.deleteUser(uid);

    // Delete user document from Firestore
    await db.collection('users').doc(uid).delete();

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting user',
      error: error.message
    });
  }
};