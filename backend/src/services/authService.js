const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { AppError } = require('../middleware/errorHandler');

const login = async (email, password) => {
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin || !admin.isActive) {
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  };
};

module.exports = { login };
