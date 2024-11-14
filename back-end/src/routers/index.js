const express = require('express');
const router = express.Router();

const authenRoute = require('./authen.route');
const authorRoute = require('./author.route');
const documentRoute = require('./document.route');
const feedbackRoute = require('./feedback.route');
const printerRoute = require('./printer.route');
const pageOrderRoute = require('./page_order.route');
const printOrderRoute = require('./print_order.route');


initWebRouter = (app) => {
    router.use('/auth', authenRoute);
    router.use('/test', authorRoute);
    router.use('/documents', documentRoute);
    router.use('/feedbacks', feedbackRoute);
    router.use('/printers', printerRoute);
    router.use('/pageOrders', pageOrderRoute);
    router.use('/printOrders', printOrderRoute);

    router.get('/', (req, res) => {
        res.send('Hello World!!');
    })

    return app.use('/api', router);
}

module.exports = initWebRouter;