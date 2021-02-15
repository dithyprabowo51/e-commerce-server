const { Banner } = require('../models');

const checkBannerId = async (req, res, next) => {
    try {
        const { BannerId } = req.params;
        const banner = await Banner.findByPk(BannerId);
        if (!banner) throw 404;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = checkBannerId;