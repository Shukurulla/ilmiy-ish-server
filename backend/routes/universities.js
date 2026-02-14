const router = require('express').Router();
const {
  createUniversity, getUniversities, getUniversity,
  updateUniversity, deleteUniversity,
} = require('../controllers/universityController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getUniversities);
router.get('/:id', getUniversity);
router.post('/', protect, authorize('superadmin'), createUniversity);
router.put('/:id', protect, authorize('superadmin'), updateUniversity);
router.delete('/:id', protect, authorize('superadmin'), deleteUniversity);

module.exports = router;
