const Deal = require('../models/Deal');
const { AppError } = require('../middleware/errorHandler');
const slugify = require('slugify');

const getDeals = async (req, res, next) => {
  try {
    const deals = await Deal.find({ isAvailable: true }).sort({ sortOrder: 1 });
    res.json({ success: true, data: deals });
  } catch (err) {
    next(err);
  }
};

const getAllDeals = async (req, res, next) => {
  try {
    const deals = await Deal.find().sort({ sortOrder: 1 });
    res.json({ success: true, data: deals });
  } catch (err) {
    next(err);
  }
};

const createDeal = async (req, res, next) => {
  try {
    const slug = slugify(req.body.name, { lower: true, strict: true });
    const deal = await Deal.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: deal });
  } catch (err) {
    next(err);
  }
};

const updateDeal = async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (update.name) {
      update.slug = slugify(update.name, { lower: true, strict: true });
    }
    const deal = await Deal.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!deal) throw new AppError('Deal not found', 404, 'NOT_FOUND');
    res.json({ success: true, data: deal });
  } catch (err) {
    next(err);
  }
};

const deleteDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) throw new AppError('Deal not found', 404, 'NOT_FOUND');
    res.json({ success: true, message: 'Deal deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDeals, getAllDeals, createDeal, updateDeal, deleteDeal };
