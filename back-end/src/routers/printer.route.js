const express = require('express');
const router = express.Router();
const printerController = require('../controllers/printer.controller');
const authJwt = require('../middleware/authJwt');


router.get('/active', printerController.getActive);
router.delete('/:id', printerController.removeById);
router.put('/:id', printerController.updateState);
router.get('/:id', printerController.getById);
//router.delete('/:id', [authJwt.AdminVerifyToken], printerController.removeById);
//router.put('/:id', [authJwt.AdminVerifyToken], printerController.updateState);
router.get('/filter', printerController.filterPrinter);
router.post('/', printerController.create);
//router.post('/', [authJwt.AdminVerifyToken], printerController.create);
router.get('/', printerController.getAll);

module.exports = router;