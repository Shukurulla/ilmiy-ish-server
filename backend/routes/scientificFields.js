const router = require('express').Router();
const {
  getFields, getField, createField, updateField, deleteField,
  getBranches, getByBranch, searchFields,
} = require('../controllers/scientificFieldController');
const { protect, authorize } = require('../middleware/auth');

// Public
router.get('/', getFields);
router.get('/branches', getBranches);
router.get('/search', searchFields);
router.get('/by-branch/:branchCode', getByBranch);
router.get('/:id', getField);

// Admin
router.post('/', protect, authorize('superadmin'), createField);
router.put('/:id', protect, authorize('superadmin'), updateField);
router.delete('/:id', protect, authorize('superadmin'), deleteField);

module.exports = router;
