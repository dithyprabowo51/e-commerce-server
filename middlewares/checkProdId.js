const { Product } = require('../models');

const checkProductId = async (req, res, next) => {
    try {
        const ProductId = req.params.ProductId || req.body.ProductId;
        if (!ProductId) throw 404;
        const product = await Product.findByPk(ProductId);
        if (!product) throw 404;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = checkProductId;