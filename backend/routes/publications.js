const router = require('express').Router();
const {
  createPublication, getPublications, getPublication,
  getMyPublications, updatePublication, deletePublication,
  downloadFile, moderatePublication, getStatistics, searchSuggestions,
} = require('../controllers/publicationController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/multer');

const pubUpload = upload.fields([
  { name: 'mainFile', maxCount: 1 },
  { name: 'additionalFiles', maxCount: 5 },
]);

// Public
router.get('/search', getPublications);
router.get('/suggestions', searchSuggestions);
router.get('/view/:id', getPublication);
router.get('/download/:id', downloadFile);

// Protected
router.post('/', protect, pubUpload, createPublication);
router.get('/my', protect, getMyPublications);
router.put('/:id', protect, pubUpload, updatePublication);
router.delete('/:id', protect, deletePublication);

// Admin
router.get('/admin/all', protect, authorize('admin', 'superadmin'), getPublications);
router.put('/admin/moderate/:id', protect, authorize('admin', 'superadmin'), moderatePublication);
router.get('/admin/stats', protect, authorize('admin', 'superadmin'), getStatistics);

module.exports = router;
