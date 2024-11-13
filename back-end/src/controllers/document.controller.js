const Document = require('../models/document.model');

const create = (req, res, next) => {
    const { name, format, number_of_page } = req.body;
    document = new Document({ name, format, number_of_page });
    document.save()
        .then(() => res.send('Add document successfully!!!'))
        .catch(err => next(err));
}

const showAll = (req, res, next) => {
    Document.find({})
        .then((documents) => { res.status(200).json(documents) })
        .catch(err => next(err));
}

const showById = (req, res, next) => {
    Document.findById(req.params.id)
        .then(document => res.status(200).json(document))
        .catch(err => next(err));
}

const removeById = (req, res, next) => {
    const id = req.params.id;
    Document.findOneAndDelete({ _id: id })
        .then(() => res.status(201).send('Remove successfully!!'))
        .catch(err => next(err));
}

module.exports = { create, showAll, showById, removeById };