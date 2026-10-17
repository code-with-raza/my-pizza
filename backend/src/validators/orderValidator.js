const Joi = require('joi');

const orderItemSchema = Joi.object({
  sourceType: Joi.string().valid('product', 'deal').required(),
  sourceId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  variantCode: Joi.string().allow(null, '').default(null),
  addOnIds: Joi.array().items(Joi.string()).default([]),
});

const createOrderSchema = Joi.object({
  branchId: Joi.string().required(),
  customer: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    phone: Joi.string().min(10).max(20).required(),
    address: Joi.string().allow('').max(300).default(''),
    notes: Joi.string().allow('').max(500).default(''),
  }).required(),
  fulfillment: Joi.string().valid('delivery', 'pickup').required(),
  items: Joi.array().items(orderItemSchema).min(1).required(),
  paymentMethod: Joi.string().valid('cash', 'online').default('cash'),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid(
      'pending',
      'confirmed',
      'preparing',
      'ready',
      'out_for_delivery',
      'completed',
      'cancelled'
    )
    .required(),
});

module.exports = { createOrderSchema, updateOrderStatusSchema };
