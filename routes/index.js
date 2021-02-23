const router = require('express').Router();
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const bannerRoutes = require('./bannerRoutes');
const orderRoutes = require('./orderRoutes');

router.use(authRoutes);

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/banners', bannerRoutes);
router.use('/orders', orderRoutes);

module.exports = router;