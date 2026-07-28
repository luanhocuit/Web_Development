const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lấy danh sách thành viên
router.get('/', userController.getAllUsers);

// Cập nhật phân công thành viên
router.put('/:id', userController.updateUserTask);

module.exports = router;