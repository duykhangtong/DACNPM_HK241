const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');

router.delete('/:id', documentController.removeById);
router.post('/', documentController.create)
router.get('/:id', documentController.showById);
router.get('/', documentController.showAll);

module.exports = router;

