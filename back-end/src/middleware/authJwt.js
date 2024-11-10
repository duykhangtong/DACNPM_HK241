const jwt = require('jsonwebtoken');
const db = require('../models/index');
const config = require('../config/auth.config');
const User = db.user;
const Client = db.client;
const Spso = db.spso;

const verifyToken = (req, res, next) => {
    let token = req.session.token;

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err, decode) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decode.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            if (user.role_type === "admin") {
                Spso.updateOne({ _id: user.role }, { last_login: Date.now() });
                next();
                return;
            }

            res.status(403).send({ message: 'Require admin role!' });
        })
        .catch(err => res.status(500).send({ message: err }));
}


module.exports = { verifyToken, isAdmin };