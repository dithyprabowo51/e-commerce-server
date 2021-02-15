const { Product, Category, ProductCategory } = require('../models');

class ProductController {
    static async addProduct(req, res, next) {
        try {
            const { name, price, image_url, stock } = req.body;
            const newProduct = await Product.create({ name, price, image_url, stock });
            const msg = {
                message: 'Added new product successfully',
                data: {
                    id: newProduct.id,
                    name: newProduct.name,
                    price: newProduct.price,
                    image_url: newProduct.image_url,
                    stock: newProduct.stock
                }
            }
            res.status(201).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async setCategory(req, res, next) {
        try {
            const { ProductId } = req.params;
            const { CategoryId } = req.body;
            await ProductCategory.create({ ProductId, CategoryId });
            const msg = {
                message: 'Set category successfully'
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async readByCategory(req, res, next) {
        try {
            const { CategoryId } = req.query;
            let products;
            if (CategoryId) {
                products = await Product.findAll({
                    include: {
                        model: Category,
                        where: { id: CategoryId }
                    }
                });
            } else {
                products = await Product.findAll({
                    include: {
                        model: Category
                    }
                });
            }
            if (products.length === 0) throw 404;
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProductController;