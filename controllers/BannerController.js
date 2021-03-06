const { Banner, Category } = require('../models');

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
            const {CategoryId} = req.query;
            const {status} = req.query;
            let banners;
            if (!CategoryId && !status) {
                banners = await Banner.findAll({
                    include: Category,
                    order: [['id', 'ASC']]
                });
            } else if(CategoryId) {
                banners = await Banner.findAll({
                    where: {CategoryId},
                    include: Category,
                    order: [['id', 'ASC']]
                });
            } else {
                banners = await Banner.findAll({
                    where: {status},
                    include: Category,
                    order: [['id', 'ASC']]
                });
            }
            
            const msg = {
                message: 'Success',
                data: banners
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async readBannerById(req, res, next) {
        try {
            const { BannerId } = req.params;
            const banner = await Banner.findByPk(BannerId, {
                include: Category
            });
            const msg = {
                message: 'Success',
                data: banner
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async editBanner(req, res, next) {
        try {
            const { BannerId } = req.params;
            const { image_url, status, CategoryId } = req.body;
            const updatedBanner = await Banner.update(
                { image_url, status, CategoryId },
                { where: { id: BannerId }, returning: true }
            );
            const msg = {
                message: 'Updated banner successfully',
                data: updatedBanner[1][0]
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async deleteBanner(req, res, next) {
        try {
            const { BannerId } = req.params;
            await Banner.destroy({
                where: { id: BannerId }
            });
            res.status(200).json({ message: 'Deleted banner successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = BannerController;