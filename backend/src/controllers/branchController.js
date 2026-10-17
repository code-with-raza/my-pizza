const Branch = require('../models/Branch');
const { AppError } = require('../middleware/errorHandler');

const getBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find({ isActive: true });
    res.json({ success: true, data: branches });
  } catch (err) {
    next(err);
  }
};

const getAllBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find();
    res.json({ success: true, data: branches });
  } catch (err) {
    next(err);
  }
};

const updateBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!branch) throw new AppError('Branch not found', 404, 'NOT_FOUND');
    res.json({ success: true, data: branch });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBranches, getAllBranches, updateBranch };
