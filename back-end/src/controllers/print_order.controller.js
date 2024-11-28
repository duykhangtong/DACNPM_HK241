const PrintOrder = require('../models/print_order.model');
const Client = require('../models/client.model');

const create = async (req, res, next) => {
    const { page_size, page_orientation, sided, pages_to_printed, client_id, document_id, printer_id } = req.body;
    let total_print_pages = sided === "double-sided" ? pages_to_printed / 2 : pages_to_printed;
    total_print_pages = (page_size === "A4" ? total_print_pages : total_print_pages * 2);
    const printOrder = new PrintOrder({ page_size, page_orientation, sided, pages_to_printed, total_print_pages, client_id, document_id, printer_id });

    await printOrder.save()
        .then(() => res.status(200).send('Add print order successfully!!!'))
        .then(async () => {
            const client = await Client.findById(client_id);
            Client.updateOne({ _id: client_id }, { number_page: client.number_page - total_print_pages });
        })
        .catch(err => next(err));
}

const getAll = async (req, res, next) => {
    await PrintOrder.find({})
        .then(printOrders => res.json(printOrders))
        .catch(err => next(err));
}

const getById = async (req, res, next) => {
    const id = req.params.id;
    await PrintOrder.findById(id)
        .then(printOrder => res.json(printOrder))
        .catch(err => next(err));
}

const set_state_and_endtime = async (req, res, next) => {
    const id = req.params.id;
    let state = "completed";
    let end_time = Date.now();
    await PrintOrder.findByIdAndUpdate(id, { state, end_time }, { returnDocument: "after" })
        .then(printOrder => res.json(printOrder))
        .catch(err => next(err));
}

const getByUserId = async (req, res, next) => {
    const client_id = req.params.client_id;
    await PrintOrder.find({ client_id: client_id })
        .then(printOrders => res.json(printOrders))
        .catch(err => next(err));
}

// [GET] /api/printOrders/filters?startDate=&endDate=
const filterByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        const filter = {};
        if (startDate) {
            filter.createdAt = { ...filter.createdAt, $gte: new Date(startDate) };
        }
        if (endDate) {
            filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate).setUTCHours(23, 59, 59, 999) };
        } else {
            filter.createdAt = { ...filter.createdAt, $lte: new Date(startDate).setUTCHours(23, 59, 59, 999) };
        }

        const printOrders = await PrintOrder.find(filter).exec();
        res.json(printOrders);
    } catch (err) {
        console.log(err);
        next(err);
    }

}
module.exports = { create, getAll, getById, set_state_and_endtime, getByUserId, filterByDate };