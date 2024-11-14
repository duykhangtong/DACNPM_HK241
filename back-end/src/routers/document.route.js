const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');

router.delete('/:id', documentController.removeById);
router.post('/', documentController.create)
router.get('/:id', documentController.getById);
router.get('/', documentController.getAll);

module.exports = router;

