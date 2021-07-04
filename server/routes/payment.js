const express = require('express');
const router = express.Router();
const paymentService = require('../services/payment')

router.route('/charge').post(paymentService.charge)
router.route('/:id').get(paymentService.getTransactionsByAccount)
module.exports = router;