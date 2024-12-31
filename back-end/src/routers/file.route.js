const express = require('express');
const upload = require('../config/multer.config');
const router = express.Router();
const authJwt = require('../middleware/authJwt');

const fileController = require('../controllers/file.controller');

router.post('/upload',upload.array('files',5), fileController.upload);
router.get('/store', [authJwt.ClientVerifyToken] , fileController.getAll);
router.get('/:id', [authJwt.ClientVerifyToken], fileController.getById);
router.get('/:id/review', fileController.review);
router.patch('/:id/delete', [authJwt.ClientVerifyToken], fileController.remove);


module.exports = router;