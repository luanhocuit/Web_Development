const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

// THÊM DÒNG NÀY: Lấy chi tiết 1 user theo ID
router.get('/:id', userController.getUserById); 

router.post('/', userController.createUser);
router.put('/:id', userController.updateUserTask);
router.delete('/:id', userController.deleteUser);

module.exports = router;