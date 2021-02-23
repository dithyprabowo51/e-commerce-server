const router = require('express').Router();
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const bannerRoutes = require('./bannerRoutes');
const orderRoutes = require('./orderRoutes');
const wishlistRoutes = require('./wishlistRoutes');

router.use(authRoutes);

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/banners', bannerRoutes);
router.use('/orders', orderRoutes);
router.use('/wishlists', wishlistRoutes);

module.exports = router;