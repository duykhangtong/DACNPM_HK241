const PageOrder = require('../models/page_order.model');

const create = (req, res, next) => {
    const { number_of_page, state, client_id } = req.body;
    const money_amount = number_of_page * 500;
    const pageOrder = new PageOrder({ number_of_page, money_amount, state, client_id });
    pageOrder.save()
        .then(() => res.status(200).send('Buy print page successfully!!!'))
        .catch(err => next(err));
}

const getAll = (req, res, next) => {
    PageOrder.find({})
        .then(page_orders => res.json(page_orders))
        .catch(err => next(err));
}

module.exports = { create, getAll };