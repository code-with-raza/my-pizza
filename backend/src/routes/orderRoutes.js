const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderByNumber,
} = require('../controllers/orderController');
const { validate } = require('../middleware/validate');
const { createOrderSchema } = require('../validators/orderValidator');

// Public
router.post('/', validate(createOrderSchema), createOrder);
router.get('/:orderNumber', getOrderByNumber);

module.exports = router;
