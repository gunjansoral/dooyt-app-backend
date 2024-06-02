const express = require('express');
const router = express.Router();

// Controller functions (assumed to be implemented elsewhere)
const {
  getMerchantCategories,
  getMerchantCategory,
  createMerchantCategory,
  updateMerchantCategory,
  deleteMerchantCategory
} = require('../controllers/merchantCategoryController');

router.get('/admin/merchant/category', getMerchantCategories);
router.get('/admin/merchant/category/:category_id', getMerchantCategory);
router.post('/admin/merchant/category', createMerchantCategory);
router.put('/admin/merchant/category/:category_id', updateMerchantCategory);
router.delete('/admin/merchant/category/:category_id', deleteMerchantCategory);

module.exports = router;
