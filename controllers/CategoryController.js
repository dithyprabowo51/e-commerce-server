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

    static async readAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            if (categories.length === 0) throw 404;
            const msg = {
                message: 'Success',
                data: categories
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async readCategoryById(req, res, next) {
        try {
            const { CategoryId } = req.params;
            const category = await Category.findByPk(CategoryId);
            const msg = {
                message: 'Success',
                data: category
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async editCategory(req, res, next) {
        try {
            const { CategoryId } = req.params;
            const { name } = req.body;
            const updatedCategory = await Category.update({ name }, {
                where: { id: CategoryId },
                returning: true
            });
            const msg = {
                message: 'Updated category successfully',
                data: updatedCategory[1][0]
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { CategoryId } = req.params;
            await Category.destroy({
                where: { id: CategoryId }
            });
            res.status(200).json({ message: 'Deleted category successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CategoryController;