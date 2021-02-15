const bcrypt = require('bcryptjs');

const hashing = password => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

const checkPassword = (inputPassword, passwordHashed) => {
    return bcrypt.compareSync(inputPassword, passwordHashed);
}


module.exports = { hashing, checkPassword }