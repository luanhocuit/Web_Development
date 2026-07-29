const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lấy danh sách thành viên (GET)
router.get('/', userController.getAllUsers);

// --- PHẦN MỚI THÊM: Tạo thành viên mới (POST) ---
router.post('/', userController.createUser);

// Cập nhật phân công thành viên (PUT)
router.put('/:id', userController.updateUserTask);

module.exports = router;