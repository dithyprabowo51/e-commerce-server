const router = require('express').Router();
const BannerController = require('../controllers/BannerController');
const checkRoleId = require('../middlewares/checkRoleId');
const checkCategoryId = require('../middlewares/checkCategoryId');

router.get('/', BannerController.readAllBanner);
router.post('/', checkRoleId, checkCategoryId, BannerController.addBanner);

module.exports = router;