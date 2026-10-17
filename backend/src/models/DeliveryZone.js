const mongoose = require('mongoose');

const DeliveryZoneSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    name: { type: String, required: true },
    areas: { type: [String], default: [] },
    deliveryFee: { type: Number, default: 0, min: 0 },
    minimumOrder: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DeliveryZone', DeliveryZoneSchema);
