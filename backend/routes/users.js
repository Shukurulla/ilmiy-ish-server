const router = require('express').Router();
const {
  getProfile, updateProfile, uploadAvatar, getResearchers,
  getAllUsers, toggleUserStatus, changeUserRole,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/multer');

// Public
router.get('/researchers', getResearchers);
router.get('/profile/:id', getProfile);

// Protected
router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, upload.single('avatar'), uploadAvatar);

// Admin
router.get('/admin/all', protect, authorize('admin', 'superadmin'), getAllUsers);
router.put('/admin/toggle-status/:id', protect, authorize('admin', 'superadmin'), toggleUserStatus);
router.put('/admin/change-role/:id', protect, authorize('superadmin'), changeUserRole);

module.exports = router;
