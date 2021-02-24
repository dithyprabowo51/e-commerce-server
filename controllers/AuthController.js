const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { checkPassword } = require('../helpers/bcrypt');

class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw 'Invalid email or password';
            const user = await User.findOne({
                where: { email }
            });
            if (!user) throw 'Invalid email or password';
            const isValidPassword = checkPassword(password, user.password);
            if (!isValidPassword || user.RoleId !== 2) throw 'Invalid email or password';
            const payload = {
                id: user.id,
                email: user.email
            }
            const access_token = generateToken(payload);
            const msg = {
                message: 'Login successfully',
                data: {
                    id: user.id,
                    email: user.email,
                    RoleId: user.RoleId
                },
                access_token
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async loginAdmin (req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw 'Invalid email or password';
            const user = await User.findOne({
                where: { email }
            });
            if (!user) throw 'Invalid email or password';
            const isValidPassword = checkPassword(password, user.password);
            if (!isValidPassword || user.RoleId !== 1) throw 'Invalid email or password';
            const payload = {
                id: user.id,
                email: user.email
            }
            const access_token = generateToken(payload);
            const msg = {
                message: 'Login successfully',
                data: {
                    id: user.id,
                    email: user.email,
                    RoleId: user.RoleId
                },
                access_token
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async register (req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = await User.create({ email, password });
            const msg = {
                id: newUser.id,
                email: newUser.email
            }
            res.status(201).json(msg);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AuthController;