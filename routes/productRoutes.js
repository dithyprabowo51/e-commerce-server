const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const checkRoleId = require('../middlewares/checkRoleId');
const checkProductId = require('../middlewares/checkProdId');
const checkCategoryId = require('../middlewares/checkCategoryId');
const authentication = require('../middlewares/authentication');

router.get('/', ProductController.readByCategory);
router.get('/:ProductId', checkProductId, ProductController.readById);
router.post('/', authentication, checkRoleId, ProductController.addProduct);
router.put('/:ProductId', authentication, checkRoleId, checkProductId, ProductController.editProduct);
router.patch('/:ProductId', authentication, checkRoleId, checkProductId, checkCategoryId, ProductController.setCategory);
router.patch('/:ProductId/unset', authentication, checkRoleId, checkProductId, checkCategoryId, ProductController.unsetCategory);
router.delete('/:ProductId', authentication, checkRoleId, checkProductId, ProductController.deleteProduct);

module.exports = router;