const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const checkRoleId = require('../middlewares/checkRoleId');
const checkProductId = require('../middlewares/checkProdId');
const checkCategoryId = require('../middlewares/checkCategoryId');

router.get('/', ProductController.readByCategory);
router.get('/:ProductId', checkProductId, ProductController.readById);
router.post('/', checkRoleId, ProductController.addProduct);
router.put('/:ProductId', checkRoleId, checkProductId, ProductController.editProduct);
router.patch('/:ProductId', checkRoleId, checkProductId, checkCategoryId, ProductController.setCategory);
router.delete('/:ProductId', checkRoleId, checkProductId, ProductController.deleteProduct);

module.exports = router;