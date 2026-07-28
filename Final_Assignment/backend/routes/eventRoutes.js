const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

// Tất cả thao tác Event đều cần Auth
router.use(protect); 

router.post('/', createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;