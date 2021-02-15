const { Category } = require('../models');

const checkCategoryId = async (req, res, next) => {
    try {
        const { CategoryId } = req.body;
        if (!CategoryId) throw 404;
        const category = await Category.findByPk(CategoryId);
        if (!category) throw 404;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = checkCategoryId;