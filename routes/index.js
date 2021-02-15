const router = require('express').Router();
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const authentication = require('../middlewares/authentication');

router.use('/login', authRoutes);

router.use(authentication);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;