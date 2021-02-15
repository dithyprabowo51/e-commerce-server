const router = require('express').Router();
const BannerController = require('../controllers/BannerController');
const checkRoleId = require('../middlewares/checkRoleId');
const checkCategoryId = require('../middlewares/checkCategoryId');
const checkBannerId = require('../middlewares/checkBannerId');

router.get('/', BannerController.readAllBanner);
router.get('/:BannerId', checkBannerId, BannerController.readBannerById);
router.post('/', checkRoleId, checkCategoryId, BannerController.addBanner);
router.put('/:BannerId', checkRoleId, checkBannerId, checkCategoryId, BannerController.editBanner);

module.exports = router;