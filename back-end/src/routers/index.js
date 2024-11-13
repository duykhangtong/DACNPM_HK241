const express = require('express');
const router = express.Router();

const authenRoute = require('./authen.route');
const authorRoute = require('./author.route');
const documentRoute = require('./document.route');
const feedbackRoute = require('./feedback.route');


initWebRouter = (app) => {
    router.use('/auth', authenRoute);
    router.use('/test', authorRoute);
    router.use('/documents', documentRoute);
    router.use('/feedbacks', feedbackRoute);

    router.get('/', (req, res) => {
        res.send('Hello World!!');
    })

    return app.use('/api/v1', router);
}

module.exports = initWebRouter;