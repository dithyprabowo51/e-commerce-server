const router = require('express').Router();
const WishlistController = require('../controllers/WishlistController');
const authentication = require('../middlewares/authentication');
const checkProductId = require('../middlewares/checkProdId');
const checkIdWishlist = require('../middlewares/checkIdWishlist');

router.get('/', authentication, WishlistController.readWishlists);
router.post('/', authentication, checkProductId, WishlistController.addWishlist);
router.delete('/:id', authentication, checkIdWishlist, WishlistController.deleteWishlist);

module.exports = router;