const authenController = require('../controllers/authen.controller');
const express = require('express');
const router = express.Router();

router.post('/signin', authenController.signin);

module.exports = router;