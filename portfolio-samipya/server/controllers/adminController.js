const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// POST /api/admin/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error('Email and password are required');
      err.statusCode = 400;
      return next(err);
    }

    // Explicitly select password (select: false in schema)
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin || !(await admin.comparePassword(password))) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      return next(err);
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = signToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      data: {
        id: admin._id,
        email: admin.email,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/me — protected
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.admin._id,
      email: req.admin.email,
      lastLogin: req.admin.lastLogin,
    },
  });
};

module.exports = { login, getMe };
