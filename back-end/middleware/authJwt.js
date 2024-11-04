const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, 'SSPS', (err, decode) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decode.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            if (user.role === "admin") {
                next();
                return;
            }

            res.status(403).send({ message: 'Require admin role!' });
        })
        .catch(err => res.status(500).send({ message: err }));
}

module.exports = { verifyToken, isAdmin };