const express = require('express');
const upload = require('../config/multer.config');
const router = express.Router();
const authJwt = require('../middleware/authJwt');

const fileController = require('../controllers/file.controller');

router.post('/upload', [authJwt.ClientVerifyToken], upload.array('files',5), fileController.upload);
router.get('/', [authJwt.AdminVerifyToken] , fileController.getAll); // get all of Admin
router.get('/store', [authJwt.ClientVerifyToken] , fileController.getAllById);
router.get('/:id', [authJwt.ClientVerifyToken], fileController.getById);
router.get('/:id/infor', [authJwt.ClientVerifyToken], [authJwt.AdminVerifyToken], fileController.getByIdInfor);
router.get('/:id/review', fileController.review);
router.delete('/:id/delete', [authJwt.ClientVerifyToken], fileController.remove);
router.put('/update', [authJwt.ClientVerifyToken], fileController.update);


module.exports = router;