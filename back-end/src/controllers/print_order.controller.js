const PrintOrder = require('../models/print_order.model');
const Client = require('../models/client.model');

const create = async (req, res, next) => {
    const { page_size, page_orientation, sided, pages_to_printed, file_id, printer_id } = req.body;
    const client_id = req.role;
    let total_print_pages = sided === "double-sided" ? pages_to_printed / 2 : pages_to_printed;
    total_print_pages = page_size === "A4" ? total_print_pages : total_print_pages * 2;
    const printOrder = new PrintOrder({ page_size, page_orientation, sided, pages_to_printed, total_print_pages, client_id, file_id, printer_id });

    await printOrder.save()
        .then(() => res.status(200).send('Add print order successfully!!!'))
        .catch(err => next(err));
}

const getAll = async (req, res, next) => {
    await PrintOrder.find({})
        .then(printOrders => res.json(printOrders))
        .catch(err => next(err));
}

const calculateTotalPrintPages = (page_size, sided, pages_per_sheet, pages_to_printed, number_of_copies) => {
    let total_print_pages = sided === "double-sided" ? Math.ceil(pages_to_printed / 2) : pages_to_printed;
    total_print_pages = Math.ceil(total_print_pages / pages_per_sheet);
    total_print_pages = page_size === "A4" ? total_print_pages : total_print_pages * 2;
    total_print_pages = total_print_pages * number_of_copies;
    return total_print_pages;
}
// [PUT] /api/printOrders/:id/update
const updateOrder = async (req, res, next) => {
    const { printer_id, page_size, page_orientation, sided, pages_per_sheet, number_of_copies} = req.body;

    try {
        const printerOrder = await PrintOrder.findByIdAndUpdate(req.params.id, { printer_id, page_size, page_orientation, sided, pages_per_sheet, number_of_copies }, { returnDocument: "after" });
        
        printerOrder.total_print_pages = calculateTotalPrintPages(page_size, sided, pages_per_sheet, printerOrder.pages_to_printed, number_of_copies);

        res.json({
            message: "Update print order successfully!!!",
            data: printerOrder
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// [PATCH] /api/printOrders/confirm
const confirm = async (req, res, next) => {
    try {
        const printOrder = await PrintOrder.findByIdAndUpdate(req.body.id, { isTransaction: true }, { returnDocument: "after" });
        
        res.status(200).json({
            message: "Confirm print order successfully!!!",
            data: printOrder
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const getById = async (req, res, next) => {
    const clientId = req.body.id;
    await PrintOrder.findById({client_id: clientId, isTransaction: false})
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
    const client_id = req.role;
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
            if (endDate) {
                filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate).setUTCHours(23, 59, 59, 999) };
            } else {
                filter.createdAt = { ...filter.createdAt, $lte: new Date(startDate).setUTCHours(23, 59, 59, 999) };
            }
        } else {
            if (endDate) {
                filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate).setUTCHours(23, 59, 59, 999) };
            } else {
                filter.createdAt = { ...filter.createdAt, $lte: new Date().setUTCHours(23, 59, 59, 999) };
            }
        }


        const printOrders = await PrintOrder.find(filter).exec();
        res.json(printOrders);
    } catch (err) {
        console.log(err);
        next(err);
    }

}
module.exports = { create, getAll, getById, set_state_and_endtime, getByUserId, filterByDate, updateOrder, confirm };