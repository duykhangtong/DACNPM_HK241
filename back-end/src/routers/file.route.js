const express = require('express');
const upload = require('../config/multer.config');
const router = express.Router();

const fileController = require('../controllers/file.controller');

router.post('/upload',upload.array('files',5), fileController.upload);
router.get('/store', fileController.getAll);
router.get('/:id', fileController.getById);
router.get('/:id/review', fileController.review);


module.exports = router;