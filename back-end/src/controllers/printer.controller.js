const Printer = require('../models/printer.model');
const { filterByDate } = require('./print_order.controller');

const create = (req, res, next) => {
    const { name, brand, machine_model, state, campus, building, room } = req.body;
    const printer = new Printer({ name, brand, machine_model, state, campus, building, room });
    printer.save()
        .then(() => {
            res.status(200).send("Add printer successfully!!");
        })
        .catch(err => next(err));
}

const getAll = (req, res, next) => {
    Printer.find({})
        .then(printers => res.json(printers))
        .catch(err => next(err));
}

const updateState = (req, res, next) => {
    let id = req.params.id;
    let state = req.body;
    Printer.findByIdAndUpdate(id, { state }, { returnDocument: 'after' })
        .then(printer => res.json(printer))
        .catch(err => next(err));
}

const removeById = (req, res, next) => {
    let id = req.params.id;
    Printer.findOneAndDelete({ _id: id })
        .then(() => res.status(201).send('Remove printer successfully!!'))
        .catch(err => next(err));
}

// [GET] /api/printers/filter?brand=&machine_model=&building=&campus=&state=
const filterPrinter = async (req, res, next) => {
    try {
        const { brand, machine_model, building, campus, state } = req.query;

        const filter = {};
        if (brand) filter.brand = {
            $regex: brand,
            $options: 'i'
        };
        if (machine_model) filter.machine_model = {
            $regex: machine_model,
            $options: 'i'
        };
        if (building) filter.building = {
            $regex: building,
            $options: 'i'
        };
        if (campus) filter.campus = {
            $regex: campus,
            $options: 'i'
        };
        if (state) filter.state = state;

        const printers = await Printer.find(filter);
        res.json(printers);
    } catch(err) {
        next(err);
    }
}
module.exports = { create, getAll, updateState, removeById, filterPrinter };