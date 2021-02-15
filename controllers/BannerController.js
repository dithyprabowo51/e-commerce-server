const { Banner } = require('../models');

class BannerController {
    static async addBanner(req, res, next) {
        try {
            const { image_url, status, CategoryId } = req.body;
            const newBanner = await Banner.create({ image_url, status, CategoryId });
            const msg = {
                message: 'Created new banner successfully',
                data: newBanner
            }
            res.status(201).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async readAllBanner(req, res, next) {
        try {
            const banners = await Banner.findAll();
            if (banners.length === 0) throw 404;
            const msg = {
                message: 'Success',
                data: banners
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = BannerController;