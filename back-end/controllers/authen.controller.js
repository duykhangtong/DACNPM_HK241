const jwt = require('jsonwebtoken');
const db = require('../models/index');
const config = require('../config/auth.config');
const User = db.user;

const signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {

            if (!user) {
                return res.status(404).send({ message: 'User not found!' });
            }

            let passwordIsValid = req.body.password === user.password;
            if (!passwordIsValid) {
                return res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
            }

            const token = jwt.sign({ id: user._id }, config.secret, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400, });

            req.session.token = token;
            res.status(200).send({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            });
        })
        .catch(err => {
            res.status(500).send({ message: err });
            return;
        });
};

const signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send("you've been signed out!!!");
    } catch (err) {
        this.next(err);
    }
}

module.exports = { signin, signout };