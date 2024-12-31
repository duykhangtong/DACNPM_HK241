const express = require('express');
const router = express.Router();
const printOrderController = require('../controllers/print_order.controller');
const authJwt = require('../middleware/authJwt');


router.get('/my', [authJwt.ClientVerifyToken], printOrderController.getByUserId);
router.put('/:id/update', [authJwt.ClientVerifyToken], printOrderController.updateOrder);
router.patch('/confirm', [authJwt.ClientVerifyToken], printOrderController.confirm);
router.put('/:id', [authJwt.AdminVerifyToken], printOrderController.set_state_and_endtime);
router.get('/filters', printOrderController.filterByDate);
router.get('/:id', printOrderController.getById);
router.post('/', [authJwt.ClientVerifyToken], printOrderController.create);
router.get('/', [authJwt.AdminVerifyToken], printOrderController.getAll);

module.exports = router;