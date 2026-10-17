const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema(
  {
    branch: { type: String, default: '' },
    order: { type: String, default: '' },
  },
  { _id: false }
);

const OpeningHourSchema = new mongoose.Schema(
  {
    day: { type: Number, min: 0, max: 6 }, // 0=Sunday
    open: { type: String, default: '' },
    close: { type: String, default: '' },
    isClosed: { type: Boolean, default: false },
  },
  { _id: false }
);

const BranchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, default: 'Lahore' },
    phones: { type: PhoneSchema, default: {} },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    serviceZoneIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryZone' }],
    openingHours: { type: [OpeningHourSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Branch', BranchSchema);
