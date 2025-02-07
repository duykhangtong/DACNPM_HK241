const express = require('express');
const accountController = require('../controllers/account.controller');
const authJwt = require('../middleware/authJwt');

const router = express.Router();

router.get('/allClient', accountController.getAllClient);
router.put('/updatePage', [authJwt.ClientVerifyToken], accountController.updateNumberPage);
router.get('/client', [authJwt.ClientVerifyToken], accountController.getClientInfo);
router.get('/spso', [authJwt.AdminVerifyToken], accountController.getAdminInfo);

module.exports = router;