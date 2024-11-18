const authorController = require('../controllers/author.controller');
const express = require('express');
const authJwt = require('../middleware/authJwt');

const router = express.Router();

router.get('/client', [authJwt.ClientVerifyToken], authorController.userBoard);
router.get('/admin', [authJwt.AdminVerifyToken], authorController.adminBoard);
router.get('/public', authorController.allAccess);
module.exports = router;