const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const checkRoleId = require('../middlewares/checkRoleId');
const checkProductId = require('../middlewares/checkProdId');
const checkCategoryId = require('../middlewares/checkCategoryId');

router.get('/', ProductController.readByCategory);
router.post('/', checkRoleId, ProductController.addProduct);
router.post('/:ProductId', checkRoleId, checkProductId, checkCategoryId, ProductController.setCategory);

module.exports = router;