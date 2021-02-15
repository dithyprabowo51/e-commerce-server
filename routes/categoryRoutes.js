const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const checkRoleId = require('../middlewares/checkRoleId');

router.post('/', checkRoleId, CategoryController.addcategory);

module.exports = router;