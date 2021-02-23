const {User, Product, Wishlist} = require('../models');

class WishlistController {
    static async addWishlist (req, res, next) {
        try {
            const UserId = req.user.id;
            const {ProductId} = req.body;
            let wishlist = await Wishlist.findOne({
                where: {UserId, ProductId}
            })
            if(!wishlist) {
                wishlist = await Wishlist.create({UserId, ProductId});
            } 
            const msg = {
                message: 'Added wishlist successfully',
                data: wishlist
            }
            res.status(201).json(msg);
        } catch(err) {
            next(err);
        }
    }

    static async readWishlists (req, res, next) {
        try {
            const UserId = req.user.id;
            const wishlists = await Wishlist.findAll({
                where: {UserId},
                include: Product,
                order: [['id', 'ASC']]
            })
            const msg = {
                message: 'Success',
                data: wishlists
            }
            res.status(200).json(msg);
        } catch(err) {
            next(err);
        }
    }

    static async deleteWishlist (req, res, next) {
        try {
            const {id} = req.params;
            await Wishlist.destroy({
                where: {id}
            })
            res.status(200).json({
                message: 'Deleted wishlist successfully'
            })
        } catch(err) {
            next(err);
        }
    }
}

module.exports = WishlistController;