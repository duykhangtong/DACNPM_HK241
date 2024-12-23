const express = require('express');
const router = express.Router();
const pageOrderController = require('../controllers/page_order.controller');


router.post('/', pageOrderController.create);
router.patch('/update/:id.:number_page', pageOrderController.update);
router.get('/', pageOrderController.getAll);

module.exports = router;