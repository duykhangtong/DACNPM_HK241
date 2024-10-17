const express = require('express');
const router = express.Router();

initWebRouter = (app) => {
    router.get('/', (req, res) => {
        res.send('Hello World!!');
    })

    return app.use('/', router);
}

module.exports = initWebRouter;