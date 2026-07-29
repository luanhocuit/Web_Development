const express = require('express');
// Nhớ import thêm hàm getEventsToday từ controller (nếu bạn đã viết)
const { createEvent, getEvents, updateEvent, deleteEvent, getEventsToday } = require('../controllers/eventController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.use(protect); 

// THÊM DÒNG NÀY (Để xử lý API /api/events/today)
router.get('/today', getEventsToday); 

router.post('/', createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;