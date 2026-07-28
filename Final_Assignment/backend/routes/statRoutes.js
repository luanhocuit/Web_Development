const express = require('express');
const { getDashboardStats, getExpenseStats } = require('../controllers/statController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/expenses', getExpenseStats);

module.exports = router;