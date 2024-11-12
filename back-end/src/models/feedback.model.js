const mongoose = require('mongoose');

const feedback = new mongoose.Schema({
    title: String,
    content_send: String,
    content_respond: String,
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

module.exports = mongoose.model('Feedback', feedback);