const { nanoid } = require('nanoid');
// Helper to generate a short readable order number
const generateOrderNumber = () => {
  const prefix = 'MP';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}-${timestamp}-${random}`;
};

module.exports = { generateOrderNumber };
