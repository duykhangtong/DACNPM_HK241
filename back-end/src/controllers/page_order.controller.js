const PageOrder = require('../models/page_order.model');
const Client = require('../models/client.model');
const { client } = require('../models');

const create = (req, res, next) => {
    const { number_of_page, state } = req.body;
    const money_amount = number_of_page * 500;
    const client_id = req.role;
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

// [PATCH] /api/pageOrders/update/:id.:number_page
const update = async (req, res, next) => {
    try {
        const { id, number_page } = req.params;

        const updateUser = await Client.findByIdAndUpdate({ _id: id }, { $inc: { number_page } });
        const user = await Client.findById({ _id: id });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const getByUserId = async (req, res, next) => {
    try {
        const user_id = req.role;
        const pageOrders = await PageOrder.find({ user_id: user_id });
        res.status(200).json(pageOrders);
    } catch (error) {
        next(error);
    }
}
module.exports = { create, getAll, update, getByUserId };