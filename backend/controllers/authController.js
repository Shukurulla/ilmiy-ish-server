const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// Register
exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, university } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }

    const user = await User.create({
      email,
      password,
      firstName: firstName || { uz: '', ru: '', en: '' },
      lastName: lastName || { uz: '', ru: '', en: '' },
      university,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email va parol kiriting' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Email yoki parol noto\'g\'ri' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Hisobingiz bloklangan' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email yoki parol noto\'g\'ri' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        university: user.university,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('university');
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Change password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Joriy parol noto\'g\'ri' });
    }

    user.password = newPassword;
    await user.save();

    const token = generateToken(user._id);
    res.json({ success: true, token, message: 'Parol muvaffaqiyatli o\'zgartirildi' });
  } catch (error) {
    next(error);
  }
};
