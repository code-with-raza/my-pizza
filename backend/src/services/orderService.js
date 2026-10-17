const Product = require('../models/Product');
const Deal = require('../models/Deal');
const Branch = require('../models/Branch');
const Order = require('../models/Order');
const { AppError } = require('../middleware/errorHandler');
const { generateOrderNumber } = require('../utils/orderNumber');

const createOrder = async (data) => {
  // 1. Verify branch is active
  const branch = await Branch.findById(data.branchId);
  if (!branch || !branch.isActive) {
    throw new AppError('Selected branch is not available', 400, 'BRANCH_UNAVAILABLE');
  }

  // 2. Validate & price items server-side
  const resolvedItems = [];
  let subtotal = 0;

  for (const item of data.items) {
    if (item.sourceType === 'product') {
      const product = await Product.findById(item.sourceId);
      if (!product || !product.isAvailable) {
        throw new AppError(
          `Product not available: ${item.sourceId}`,
          400,
          'PRODUCT_UNAVAILABLE'
        );
      }

      let unitPrice = 0;
      let variantName = null;

      if (product.variants && product.variants.length > 0) {
        if (!item.variantCode) {
          throw new AppError(
            `Variant required for product: ${product.name}`,
            400,
            'VARIANT_REQUIRED'
          );
        }
        const variant = product.variants.find((v) => v.code === item.variantCode);
        if (!variant) {
          throw new AppError(
            `Invalid variant for product: ${product.name}`,
            400,
            'INVALID_VARIANT'
          );
        }
        unitPrice = variant.price;
        variantName = variant.name;
      } else {
        unitPrice = product.price || 0;
      }

      // Resolve add-ons
      const addOns = [];
      if (item.addOnIds && item.addOnIds.length > 0) {
        for (const addOnId of item.addOnIds) {
          const addOn = product.addOns.id(addOnId);
          if (addOn && addOn.isActive) {
            addOns.push({ name: addOn.name, price: addOn.price });
            unitPrice += addOn.price;
          }
        }
      }

      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;

      resolvedItems.push({
        sourceType: 'product',
        sourceId: product._id,
        name: product.name,
        variantName,
        quantity: item.quantity,
        unitPrice,
        addOns,
        lineTotal,
      });
    } else if (item.sourceType === 'deal') {
      const deal = await Deal.findById(item.sourceId);
      if (!deal || !deal.isAvailable) {
        throw new AppError(
          `Deal not available: ${item.sourceId}`,
          400,
          'DEAL_UNAVAILABLE'
        );
      }

      const unitPrice = deal.price;
      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;

      resolvedItems.push({
        sourceType: 'deal',
        sourceId: deal._id,
        name: deal.name,
        variantName: null,
        quantity: item.quantity,
        unitPrice,
        addOns: [],
        lineTotal,
      });
    }
  }

  const deliveryFee = 0; // Configurable in future via delivery zones
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  const order = await Order.create({
    orderNumber: generateOrderNumber(),
    branchId: branch._id,
    branchName: branch.name,
    customer: data.customer,
    fulfillment: data.fulfillment,
    items: resolvedItems,
    pricing: { subtotal, deliveryFee, discount, total },
    paymentMethod: data.paymentMethod || 'cash',
  });

  return order;
};

const getOrderByNumber = async (orderNumber) => {
  const order = await Order.findOne({ orderNumber }).populate('branchId', 'name address phones');
  if (!order) {
    throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');
  }
  return order;
};

const getOrders = async ({ status, branchId, page = 1, limit = 20 } = {}) => {
  const query = {};
  if (status) query.status = status;
  if (branchId) query.branchId = branchId;

  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('branchId', 'name'),
    Order.countDocuments(query),
  ]);

  return { orders, total, page, limit };
};

const updateOrderStatus = async (id, status) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
  if (!order) throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');
  return order;
};

module.exports = { createOrder, getOrderByNumber, getOrders, updateOrderStatus };
