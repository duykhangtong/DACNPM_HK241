const authorController = require('../controllers/author.controller');
const express = require('express');
const authJwt = require('../middleware/authJwt');

const router = express.Router();

router.get('/client', [authJwt.verifyToken], authorController.userBoard);
router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], authorController.adminBoard);
router.get('/all', authorController.allAccess);
module.exports = router;