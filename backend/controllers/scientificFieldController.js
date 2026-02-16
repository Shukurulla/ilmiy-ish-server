const ScientificField = require('../models/ScientificField');

// Get all fields (with optional branch/group filter)
exports.getFields = async (req, res, next) => {
  try {
    const { branch, group } = req.query;
    const query = { isActive: true };
    if (branch) query['branch.code'] = branch;
    if (group) query['group.code'] = group;
    const fields = await ScientificField.find(query).sort({ code: 1 });
    res.json({ success: true, fields });
  } catch (error) {
    next(error);
  }
};

// Get distinct branches
exports.getBranches = async (req, res, next) => {
  try {
    const branches = await ScientificField.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$branch.code',
          uz: { $first: '$branch.uz' },
          ru: { $first: '$branch.ru' },
          en: { $first: '$branch.en' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json({ success: true, branches });
  } catch (error) {
    next(error);
  }
};

// Get specialties by branch code
exports.getByBranch = async (req, res, next) => {
  try {
    const { branchCode } = req.params;
    const fields = await ScientificField.find({
      'branch.code': branchCode,
      isActive: true,
    }).sort({ code: 1 });
    res.json({ success: true, fields });
  } catch (error) {
    next(error);
  }
};

// Search fields by name or code
exports.searchFields = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json({ success: true, fields: [] });
    }
    const regex = new RegExp(q, 'i');
    const fields = await ScientificField.find({
      isActive: true,
      $or: [
        { 'name.uz': regex },
        { 'name.ru': regex },
        { 'name.en': regex },
        { 'branch.uz': regex },
        { 'branch.ru': regex },
        { 'branch.en': regex },
        { code: regex },
      ],
    })
      .limit(30)
      .sort({ code: 1 });
    res.json({ success: true, fields });
  } catch (error) {
    next(error);
  }
};

// Get single field
exports.getField = async (req, res, next) => {
  try {
    const field = await ScientificField.findById(req.params.id);
    if (!field) {
      return res.status(404).json({ message: 'Ilmiy soha topilmadi' });
    }
    res.json({ success: true, field });
  } catch (error) {
    next(error);
  }
};

// Create field (superadmin)
exports.createField = async (req, res, next) => {
  try {
    const field = await ScientificField.create(req.body);
    res.status(201).json({ success: true, field });
  } catch (error) {
    next(error);
  }
};

// Update field (superadmin)
exports.updateField = async (req, res, next) => {
  try {
    const field = await ScientificField.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!field) {
      return res.status(404).json({ message: 'Ilmiy soha topilmadi' });
    }
    res.json({ success: true, field });
  } catch (error) {
    next(error);
  }
};

// Delete (soft) field (superadmin)
exports.deleteField = async (req, res, next) => {
  try {
    await ScientificField.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Ilmiy soha o\'chirildi' });
  } catch (error) {
    next(error);
  }
};
