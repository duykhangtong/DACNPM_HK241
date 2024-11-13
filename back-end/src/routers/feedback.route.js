const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

router.put('/:id', feedbackController.update);
router.post('/', feedbackController.create)
router.get('/:id', feedbackController.showById);
router.get('/', feedbackController.showAll);

module.exports = router;