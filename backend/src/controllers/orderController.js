const orderService = require('../services/orderService');

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

const getOrderByNumber = async (req, res, next) => {
  try {
    const order = await orderService.getOrderByNumber(req.params.orderNumber);
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { status, branchId, page, limit } = req.query;
    const result = await orderService.getOrders({ status, branchId, page, limit });
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const Order = require('../models/Order');
    const order = await Order.findById(req.params.id).populate('branchId', 'name address phones');
    if (!order) {
      const { AppError } = require('../middleware/errorHandler');
      throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');
    }
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, getOrderByNumber, getOrders, getOrderById, updateOrderStatus };
