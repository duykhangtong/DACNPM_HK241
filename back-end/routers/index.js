const express = require('express');
const router = express.Router();

const authenRoute = require('./authen.route');
const authorRoute = require('./author.route');


initWebRouter = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.use('/auth', authenRoute);
    router.use('/test', authorRoute);

    router.get('/', (req, res) => {
        res.send('Hello World!!');
    })

    return app.use('/api', router);
}

module.exports = initWebRouter;