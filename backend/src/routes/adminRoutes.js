const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const {
  getAllDeals,
  createDeal,
  updateDeal,
  deleteDeal,
} = require('../controllers/dealController');

const {
  getAllBranches,
  updateBranch,
} = require('../controllers/branchController');

const {
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');

const { updateOrderStatusSchema } = require('../validators/orderValidator');

// All admin routes are protected
router.use(protect);

// Categories
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.patch('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Products
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Deals
router.get('/deals', getAllDeals);
router.post('/deals', createDeal);
router.patch('/deals/:id', updateDeal);
router.delete('/deals/:id', deleteDeal);

// Branches
router.get('/branches', getAllBranches);
router.patch('/branches/:id', updateBranch);

// Orders
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id/status', validate(updateOrderStatusSchema), updateOrderStatus);

module.exports = router;
