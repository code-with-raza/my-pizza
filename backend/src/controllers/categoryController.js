const Category = require('../models/Category');
const { AppError } = require('../middleware/errorHandler');
const slugify = require('slugify');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const slug = slugify(req.body.name, { lower: true, strict: true });
    const category = await Category.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (update.name) {
      update.slug = slugify(update.name, { lower: true, strict: true });
    }
    const category = await Category.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!category) throw new AppError('Category not found', 404, 'NOT_FOUND');
    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) throw new AppError('Category not found', 404, 'NOT_FOUND');
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, getAllCategories, createCategory, updateCategory, deleteCategory };
