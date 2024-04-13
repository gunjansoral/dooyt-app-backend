const express = require('express');
const { registerMerchant, loginMerchant } = require('../controllers/merchantControllers');
const router = express.Router();

router.post('/merchant/register', registerMerchant);
router.post('/merchant/login', loginMerchant);

module.exports = router;