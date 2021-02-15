const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const checkRoleId = require('../middlewares/checkRoleId');
const checkCategoryId = require('../middlewares/checkCategoryId');

router.get('/', CategoryController.readAllCategories);
router.get('/:CategoryId', checkCategoryId, CategoryController.readCategoryById);
router.post('/', checkRoleId, CategoryController.addcategory);
router.put('/:CategoryId', checkRoleId, checkCategoryId, CategoryController.editCategory);
router.delete('/:CategoryId', checkRoleId, checkCategoryId, CategoryController.deleteCategory);

module.exports = router;