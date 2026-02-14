const router = require('express').Router();
const {
  getMyNotifications, markAsRead, markAllAsRead, getUnreadCount,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMyNotifications);
router.get('/unread-count', protect, getUnreadCount);
router.put('/read/:id', protect, markAsRead);
router.put('/read-all', protect, markAllAsRead);

module.exports = router;
