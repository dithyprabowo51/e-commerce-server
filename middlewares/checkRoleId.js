const checkRoleId = (req, res, next) => {
    if (req.user.RoleId !== 1) {
        next('You have no access');
    } else {
        next();
    }
}

module.exports = checkRoleId;