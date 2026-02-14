const University = require('../models/University');
const slugify = require('slugify');

exports.createUniversity = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name.en || req.body.name.uz, { lower: true, strict: true });
    const university = await University.create(req.body);
    res.status(201).json({ success: true, university });
  } catch (error) {
    next(error);
  }
};

exports.getUniversities = async (req, res, next) => {
  try {
    const universities = await University.find({ isActive: true }).sort({ 'name.uz': 1 });
    res.json({ success: true, universities });
  } catch (error) {
    next(error);
  }
};

exports.getUniversity = async (req, res, next) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'Universitet topilmadi' });
    }
    res.json({ success: true, university });
  } catch (error) {
    next(error);
  }
};

exports.updateUniversity = async (req, res, next) => {
  try {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!university) {
      return res.status(404).json({ message: 'Universitet topilmadi' });
    }
    res.json({ success: true, university });
  } catch (error) {
    next(error);
  }
};

exports.deleteUniversity = async (req, res, next) => {
  try {
    await University.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Universitet o\'chirildi' });
  } catch (error) {
    next(error);
  }
};
