const jwt = require('jsonwebtoken');
const db = require('../models/index');
const config = require('../config/auth.config');
const User = db.user;
const Client = db.client;
const Spso = db.spso;

const signin = async (req, res) => {
    await User.findOne({ email: req.body.email })
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

            if (user.role_type === "client") {
                Client.findByIdAndUpdate(user.role, { last_login: Date.now() }, { returnDocument: 'after' })
                    .then(client => res.send({
                        full_name: client.full_name,
                        number_page: client.number_page,
                        last_login: client.last_login
                    }))
            } else {
                Spso.findByIdAndUpdate(user.role, { last_login: Date.now() }, { returnDocument: 'after' })
                    .then(spso => res.send({
                        full_name: spso.full_name,
                        last_login: spso.last_login
                    }))
            }
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