const express = require('express');
const router = express.Router();
const printerController = require('../controllers/printer.controller');

router.delete('/:id', printerController.removeById);
router.put('/:id', printerController.updateState);
router.post('/', printerController.create);
router.get('/', printerController.getAll);

module.exports = router;