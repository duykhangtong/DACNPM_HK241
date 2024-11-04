const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.user;

const signin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {

            if (!user) {
                return res.status(404).send({ message: 'User not found!' });
            }

            let passwordIsValid = req.body.password === user.password;
            if (!passwordIsValid) {
                return res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
            }

            const token = jwt.sign({ id: user._id }, 'SSPS', { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400, });

            res.status(200).send({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err });
            return;
        });
};

module.exports = { signin };