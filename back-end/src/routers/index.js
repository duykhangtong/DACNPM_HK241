const express = require('express');
const router = express.Router();

const authenRoute = require('./authen.route');
const documentRoute = require('./document.route');
const feedbackRoute = require('./feedback.route');
const printerRoute = require('./printer.route');
const pageOrderRoute = require('./page_order.route');
const printOrderRoute = require('./print_order.route');
const accountRoute = require('./account.route');
const fileRoute = require('./file.route');

initWebRouter = (app) => {
    router.use('/auth', authenRoute);
    router.use('/documents', documentRoute);
    router.use('/feedbacks', feedbackRoute);
    router.use('/printers', printerRoute);
    router.use('/pageOrders', pageOrderRoute);
    router.use('/printOrders', printOrderRoute);
    router.use('/account', accountRoute);
    router.use('/file', fileRoute);

    router.get('/', (req, res) => {
        res.send('Hello World!!');
    })

    return app.use('/api', router);
}

module.exports = initWebRouter;