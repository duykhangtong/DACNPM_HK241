const express = require('express');
const router = express.Router();
const printOrderController = require('../controllers/print_order.controller');


router.get('/my/:client_id', printOrderController.getByUserId);
router.put('/:id', printOrderController.set_state_and_endtime);
router.get('/:id', printOrderController.getById);
router.post('/', printOrderController.create);
router.get('/', printOrderController.getAll);

module.exports = router;