const { User } = require('../models');
const { decodedToken } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
    try {
        const access_token = req.headers.access_token;
        if (!access_token) throw 'Invalid token';
        const decoded = decodedToken(access_token);
        if (!decoded) throw 'Invalid token';

        // Cek user di database
        const user = await User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email
            }
        });
        if (!user) throw 'Invalid token';

        // Jika user ada
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;