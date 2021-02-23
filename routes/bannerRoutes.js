const router = require('express').Router();
const BannerController = require('../controllers/BannerController');
const checkRoleId = require('../middlewares/checkRoleId');
const checkCategoryId = require('../middlewares/checkCategoryId');
const checkBannerId = require('../middlewares/checkBannerId');
const authentication = require('../middlewares/authentication');

router.get('/', BannerController.readAllBanner);
router.get('/:BannerId', checkBannerId, BannerController.readBannerById);
router.post('/', authentication, checkRoleId, checkCategoryId, BannerController.addBanner);
router.put('/:BannerId', authentication, checkRoleId, checkBannerId, checkCategoryId, BannerController.editBanner);
router.delete('/:BannerId', authentication, checkRoleId, checkBannerId, BannerController.deleteBanner);

module.exports = router;