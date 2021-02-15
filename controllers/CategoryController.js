const { Category } = require('../models');

class CategoryController {
    static async addcategory(req, res, next) {
        try {
            const { name } = req.body;
            const newCategory = await Category.create({ name });
            const msg = {
                message: 'Added new category successfully',
                data: {
                    id: newCategory.id,
                    name: newCategory.name
                }
            }
            res.status(201).json(msg);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CategoryController;