const express = require('express');
const router = express.Router();

const authenRoute = require('./authen.route');
const authorRoute = require('./author.route');


initWebRouter = (app) => {
    router.use('/auth', authenRoute);
    router.use('/test', authorRoute);

    router.get('/', (req, res) => {
        res.send('Hello World!!');
    })

    return app.use('/api', router);
}

module.exports = initWebRouter;