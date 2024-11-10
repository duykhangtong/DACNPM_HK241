const authenController = require('../controllers/authen.controller');
const express = require('express');
const router = express.Router();

router.get('/signin', (req, res) => res.send("Sigin interface"));
router.post('/signin', authenController.signin);
router.post('/signout', authenController.signout);
module.exports = router;