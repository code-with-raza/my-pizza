const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const AddOnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: true }
);

const ProductSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    // Use price for single-price items, variants for size-based items
    price: { type: Number, min: 0, default: null },
    variants: { type: [VariantSchema], default: [] },
    addOns: { type: [AddOnSchema], default: [] },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ slug: 1 });
ProductSchema.index({ categoryId: 1, sortOrder: 1 });
ProductSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Product', ProductSchema);
