const express = require('express');
const router = express.Router();
const { getDeals } = require('../controllers/dealController');

// Public
router.get('/', getDeals);

module.exports = router;
