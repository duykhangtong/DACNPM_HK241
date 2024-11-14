const PrintOrder = require('../models/print_order.model');

const create = (req, res, next) => {
    const { page_size, page_orientation, sided, pages_to_printed, pages_per_sheet, number_of_copies, client_id, document_id, printer_id } = req.body;
    let total_print_pages = pages_to_printed / (2 * pages_per_sheet);
    total_print_pages = (page_size === "A4" ? total_print_pages : total_print_pages * 2) * number_of_copies;
    const printOrder = new PrintOrder({ page_size, page_orientation, sided, pages_to_printed, pages_per_sheet, number_of_copies, total_print_pages, client_id, document_id, printer_id });

    printOrder.save()
        .then(() => res.status(200).send('Add print order successfully!!!'))
        .catch(err => next(err));
}

const getAll = (req, res, next) => {
    PrintOrder.find({})
        .then(printOrders => res.json(printOrders))
        .catch(err => next(err));
}

const getById = (req, res, next) => {
    const id = req.params.id;
    PrintOrder.findById(id)
        .then(printOrder => res.json(printOrder))
        .catch(err => next(err));
}

const set_state_and_endtime = (req, res, next) => {
    const id = req.params.id;
    let state = "completed";
    let end_time = Date.now();
    PrintOrder.findByIdAndUpdate(id, { state, end_time }, { returnDocument: "after" })
        .then(printOrder => res.json(printOrder))
        .catch(err => next(err));
}
module.exports = { create, getAll, getById, set_state_and_endtime };