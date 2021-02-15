const jwt = require('jsonwebtoken');

const generateToken = payload => {
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const decodedToken = token => {
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return false;
    }
}

module.exports = { generateToken, decodedToken }