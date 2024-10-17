require('dotenv').config();

const express = require('express');
const app = express();
const middleWare = require('./middleware/index');
const router = require('./routers/index');

middleWare(app);
router(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listen on port ${port}!!!`);
})
