const express = require('express');
const router = express.Router();
const printerController = require('../controllers/printer.controller');
const authJwt = require('../middleware/authJwt');

router.delete('/:id', [authJwt.AdminVerifyToken], printerController.removeById);
router.put('/:id', [authJwt.AdminVerifyToken], printerController.updateState);
router.get('/filter', printerController.filterPrinter);
router.post('/', [authJwt.AdminVerifyToken], printerController.create);
router.get('/', printerController.getAll);

module.exports = router;