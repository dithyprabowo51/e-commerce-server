const { User, Product, Order, OrderProduct } = require('../models');

class OrderController {
    static async addOrderProduct(req, res, next) {
        try {
            const UserId = req.user.id;
            const { ProductId } = req.body;
            const product = await Product.findByPk(ProductId);
            if (product.stock <= 0) throw 404;
            let order = await Order.findOne({
                where: { UserId }
            });
            if (!order) {
                order = await Order.create({ UserId });
            }

            let orderProduct = await OrderProduct.findOne({
                where: { ProductId },
                attributes: ['id', 'OrderId', 'ProductId', 'quantity', 'createdAt', 'updatedAt']
            })
            if (!orderProduct) {
                orderProduct = await OrderProduct.create({
                    OrderId: order.id,
                    ProductId,
                    quantity: 1
                });
                console.log(orderProduct);
            } else {
                let quantity = Number(orderProduct.quantity) + 1;
                await OrderProduct.update({ quantity }, {
                    where: { id: orderProduct.id }
                });
            }

            await Product.decrement('stock', {
                where: { id: ProductId }
            })

            const msg = {
                message: 'Added order product successfully',
                data: {
                    OrderId: orderProduct.OrderId,
                    ProductId: orderProduct.ProductId
                }
            }
            res.status(201).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async readOrderProduct(req, res, next) {
        try {
            const UserId = req.user.id;
            const order = await Order.findOne({
                where: { UserId },
                include: {
                    model: Product,
                },
                order: [[Product, 'id', 'ASC']]
            });
            if (!order) throw 404;
            const msg = {
                message: 'Success',
                data: order
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async addQuantity(req, res, next) {
        try {
            const UserId = req.user.id;
            const { ProductId } = req.body;
            const order = await Order.findOne({
                where: { UserId }
            });
            if (!order) throw 404;

            const orderProduct = await OrderProduct.findOne({
                where: { OrderId: order.id, ProductId }
            });

            if (!orderProduct) throw 404;

            const product = await Product.findByPk(ProductId);
            if (product.stock <= 0) throw 404;

            await Product.decrement('stock', {
                where: { id: ProductId }
            })

            const updatedQuantity = await OrderProduct.increment('quantity', {
                where: { OrderId: order.id, ProductId }
            })
            const msg = {
                message: 'Add quantity successfully',
                data: updatedQuantity[0][0][0]
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async reduceQuantity(req, res, next) {
        try {
            const UserId = req.user.id;
            const { ProductId } = req.body;
            const order = await Order.findOne({
                where: { UserId }
            });
            if (!order) throw 404;
            const orderProduct = await OrderProduct.findOne({
                where: {
                    OrderId: order.id,
                    ProductId
                }
            });
            if (!orderProduct || orderProduct.quantity === 0) throw 404;

            await Product.increment('stock', {
                where: { id: ProductId }
            })

            let quantity = Number(orderProduct.quantity) - 1;
            const updatedQuantity = await OrderProduct.update({ quantity }, {
                where: {
                    OrderId: order.id,
                    ProductId
                },
                returning: true
            });
            const msg = {
                message: 'Reduce quantity successfully',
                data: updatedQuantity[1][0]
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async deleteItem(req, res, next) {
        try {
            const UserId = req.user.id;
            const { ProductId } = req.body;
            const order = await Order.findOne({
                where: { UserId }
            });
            if (!order) throw 404;

            const orderProduct = await OrderProduct.findOne({
                where: {
                    OrderId: order.id,
                    ProductId
                }
            });

            await Product.increment(['stock'], {
                where: { id: ProductId },
                by: orderProduct.quantity
            });

            await OrderProduct.destroy({
                where: {
                    OrderId: order.id,
                    ProductId
                }
            });
            const msg = {
                message: 'Deleted item successfully'
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async deleteOrder(req, res, next) {
        try {
            const UserId = req.user.id;
            const findOrder = await Order.findOne({
                where: { UserId }
            });
            if (!findOrder) throw 404;
            await Order.destroy({ where: { UserId } });
            res.status(200).json({
                message: 'Deleted order successfully'
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = OrderController;