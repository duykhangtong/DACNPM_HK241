const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

middleWare = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({ origin: "http://localhost:5173" }));
    app.use(
        cookieSession({
            name: "cookie",
            keys: ['COOKIE_SECRET'],
            httpOnly: true
        })
    );
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
}

module.exports = middleWare;