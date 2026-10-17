const mongoose = require('mongoose');

const DealItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productNameSnapshot: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    variantCode: { type: String, default: null },
  },
  { _id: false }
);

const DealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    type: {
      type: String,
      enum: ['combo', 'family', 'deal', 'promotion'],
      default: 'deal',
    },
    items: { type: [DealItemSchema], default: [] },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: '' },
    isAvailable: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

DealSchema.index({ slug: 1 });
DealSchema.index({ sortOrder: 1 });

module.exports = mongoose.model('Deal', DealSchema);
