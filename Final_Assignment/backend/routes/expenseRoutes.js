const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
// Import middleware bảo vệ route (bạn điều chỉnh đường dẫn theo thực tế cấu trúc)
// const { protect } = require('../middleware/authMiddleware'); 

// router.use(protect); // Bật dòng này nếu muốn bắt buộc đăng nhập mới được gọi API

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.createExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;