const authService = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.json({ success: true, message: 'Logged out' });
};

const me = (req, res) => {
  res.json({ success: true, admin: req.admin });
};

module.exports = { login, logout, me };
