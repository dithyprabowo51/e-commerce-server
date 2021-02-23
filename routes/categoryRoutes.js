const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const checkRoleId = require('../middlewares/checkRoleId');
const checkCategoryId = require('../middlewares/checkCategoryId');
const authentication = require('../middlewares/authentication');

router.get('/', CategoryController.readAllCategories);
router.get('/:CategoryId', checkCategoryId, CategoryController.readCategoryById);
router.post('/', authentication, checkRoleId, CategoryController.addcategory);
router.put('/:CategoryId', authentication, checkRoleId, checkCategoryId, CategoryController.editCategory);
router.delete('/:CategoryId', authentication, checkRoleId, checkCategoryId, CategoryController.deleteCategory);

module.exports = router;