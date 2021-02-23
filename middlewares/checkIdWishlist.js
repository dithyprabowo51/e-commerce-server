const {Wishlist} = require('../models');

const checkIdWishlist = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const {id} = req.params;
        const wishlist = await Wishlist.findOne({
            where: {id, UserId}
        })
        if(!wishlist) throw 404;
        next();
    } catch(err) {
        next(err);
    }
}

module.exports = checkIdWishlist;