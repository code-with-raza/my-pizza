const Product = require('../models/Product');
const { AppError } = require('../middleware/errorHandler');
const slugify = require('slugify');

const getProducts = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = { isAvailable: true };
    if (category) query.categoryId = category;
    if (featured === 'true') query.isFeatured = true;

    const products = await Product.find(query)
      .populate('categoryId', 'name slug')
      .sort({ sortOrder: 1 });
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('categoryId', 'name slug');
    if (!product) throw new AppError('Product not found', 404, 'NOT_FOUND');
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 50 } = req.query;
    const query = {};
    if (category) query.categoryId = category;
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('categoryId', 'name slug')
        .sort({ sortOrder: 1 })
        .skip(Number(skip))
        .limit(Number(limit)),
      Product.countDocuments(query),
    ]);
    res.json({ success: true, data: products, total });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const slug = slugify(req.body.name, { lower: true, strict: true });
    const product = await Product.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (update.name) {
      update.slug = slugify(update.name, { lower: true, strict: true });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!product) throw new AppError('Product not found', 404, 'NOT_FOUND');
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new AppError('Product not found', 404, 'NOT_FOUND');
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
