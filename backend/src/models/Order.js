const mongoose = require('mongoose');

const OrderItemAddOnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderItemSchema = new mongoose.Schema(
  {
    sourceType: { type: String, enum: ['product', 'deal'], required: true },
    sourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    variantName: { type: String, default: null },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    addOns: { type: [OrderItemAddOnSchema], default: [] },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { _id: false }
);

const PricingSchema = new mongoose.Schema(
  {
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    branchName: { type: String, required: true },
    customer: { type: CustomerSchema, required: true },
    fulfillment: { type: String, enum: ['delivery', 'pickup'], required: true },
    items: { type: [OrderItemSchema], required: true },
    pricing: { type: PricingSchema, required: true },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'out_for_delivery',
        'completed',
        'cancelled',
      ],
      default: 'pending',
    },
    paymentMethod: { type: String, enum: ['cash', 'online'], default: 'cash' },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'failed'],
      default: 'unpaid',
    },
  },
  { timestamps: true }
);

OrderSchema.index({ orderNumber: 1 }, { unique: true });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ branchId: 1, createdAt: -1 });
OrderSchema.index({ 'customer.phone': 1, createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);
