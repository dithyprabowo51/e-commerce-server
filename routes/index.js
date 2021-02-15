const router = require('express').Router();
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const bannerRoutes = require('./bannerRoutes');
const authentication = require('../middlewares/authentication');

router.use('/login', authRoutes);

router.use(authentication);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/banners', bannerRoutes);

module.exports = router;