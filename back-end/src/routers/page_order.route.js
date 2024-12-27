const express = require('express');
const router = express.Router();
const pageOrderController = require('../controllers/page_order.controller');
const authJwt = require('../middleware/authJwt');

router.get('/my', [authJwt.ClientVerifyToken], pageOrderController.getByUserId);
router.post('/', [authJwt.ClientVerifyToken], pageOrderController.create);
router.patch('/update/:id.:number_page', pageOrderController.update);
router.get('/', pageOrderController.getAll);

module.exports = router;