const Feedback = require('../models/feedback.model');

const create = (req, res, next) => {
    const { title, content_send, client_id } = req.body;
    const content_respond = '';
    const feedback = new Feedback({ title, content_send, content_respond, client_id });
    feedback.save()
        .then(() => res.send('Add document successfully!!!'))
        .catch(err => next(err));
}

const showAll = (req, res, next) => {
    Feedback.find({})
        .then((feedbacks) => { res.status(200).json(feedbacks) })
        .catch(err => next(err));
}

const showById = (req, res, next) => {
    Feedback.findById(req.params.id)
        .then(feedback => res.status(200).json(feedback))
        .catch(err => next(err));
}

const update = (req, res, next) => {
    let id = req.params.id;
    const { content_respond } = req.body;
    Feedback.findByIdAndUpdate(id, { content_respond }, { returnDocument: 'after' })
        .then(feedback => res.json(feedback))
        .catch(err => next(err));
}


module.exports = { create, showAll, showById, update };