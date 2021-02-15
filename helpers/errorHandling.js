const errorHandling = (err, req, res, next) => {
    if (err === 'Invalid email or password' || err === 'Invalid token' || err === 'You have no access') {
        res.status(401).json({ message: err });
    } else if (err.name === 'SequelizeValidationError') {
        const errMessages = err.errors.map(e => e.message);
        res.status(400).json({ errors: errMessages });
    } else if (err === 404) {
        res.status(404).json({ message: 'Data not found' });
    } else {
        res.status(500).json(err)
    };
}

module.exports = errorHandling;