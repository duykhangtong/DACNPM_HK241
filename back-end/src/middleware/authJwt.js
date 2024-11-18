const jwt = require('jsonwebtoken');
const db = require('../models/index');
const config = require('../config/auth.config');
const User = db.user;
const Client = db.client;
const Spso = db.spso;

const ClientVerifyToken = (req, res, next) => {
    if (req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decode = jwt.verify(token, config.secret);

            if (decode.roleType != 'client') {
                return res.status(404).json({
                    message: "required Client Role"
                })
            }
            req.role = decode.role;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: "Token is expired!"
                })
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    message: "Token is invalid!"
                })
            } else {
                console.error(error);
                return res.status(500);
            }
        }
    } else {
        return res.status(401).json({
            message: "Not Access Token Or Expedite Access Token"
        })
    }
};

const AdminVerifyToken = (req, res, next) => {
    if (req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decode = jwt.verify(token, config.secret);

            if (decode.roleType != "admin") {
                return res.status(404).json({
                    message: "Required Admin Role"
                })
            }

            req.role = decode.role;

            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: "Token is expired!"
                })
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    message: "Token is invalid!"
                })
            } else {
                console.error(error);
                return res.status(500);
            }
        }
    } else {
        return res.status(401).json({
            message: "Not Access Token Or Expedite Access Token"
        })
    }
}


module.exports = { ClientVerifyToken, AdminVerifyToken };