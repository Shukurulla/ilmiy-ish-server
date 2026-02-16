const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('university').populate('scientificFieldRef').populate('scientificFields');
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Update profile
exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'firstName', 'lastName', 'middleName', 'dateOfBirth', 'birthPlace',
      'currentPosition', 'faculty', 'department', 'phone', 'university',
      'academicDegree', 'scientificField', 'academicTitle', 'defenseSpecialty',
      'candidateDefenseYear', 'doctoralDefenseYear', 'researchDirection',
      'scientificFieldRef', 'scientificFields',
      'candidateDissertation', 'doctoralDissertation',
      'orcid', 'scopusAuthorId', 'hIndexScopus', 'webOfScienceId',
      'hIndexWos', 'googleScholarId', 'hIndexGoogleScholar',
      'publicationStats', 'supervisedStudents', 'projects', 'patents',
      'teachingExperience', 'taughtSubjects', 'publicationLanguages',
      'editorialMemberships', 'dissertationCouncils', 'awards',
      'additionalAchievements',
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates, profileCompleted: true },
      { new: true, runValidators: true }
    ).populate('university').populate('scientificFieldRef').populate('scientificFields');

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Rasm yuklanmadi' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: `/uploads/avatars/${req.file.filename}` },
      { new: true }
    );

    res.json({ success: true, avatar: user.avatar });
  } catch (error) {
    next(error);
  }
};

// Get all researchers (public)
exports.getResearchers = async (req, res, next) => {
  try {
    const {
      search, degree, title, university, field, page = 1, limit = 20,
    } = req.query;

    const query = { role: 'researcher', profileCompleted: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (degree && degree !== 'all') {
      query.academicDegree = degree;
    }

    if (title && title !== 'all') {
      query.academicTitle = title;
    }

    if (university) {
      query.university = university;
    }

    if (field) {
      query.scientificField = { $regex: field, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find(query)
        .populate('university', 'name')
        .populate('scientificFieldRef').populate('scientificFields', 'name code')
        .select('-password -__v')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      User.countDocuments(query),
    ]);

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const query = {};

    if (role && role !== 'all') query.role = role;
    if (search) query.$text = { $search: search };

    // If admin (not superadmin), only see users from same university
    if (req.user.role === 'admin') {
      query.university = req.user.university;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find(query)
        .populate('university', 'name')
        .populate('scientificFieldRef').populate('scientificFields', 'name code')
        .select('-password -__v')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      User.countDocuments(query),
    ]);

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: toggle user active status
exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Superadmin: change user role
exports.changeUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
