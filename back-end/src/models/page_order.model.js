const mongoose = require('mongoose');

const pageOrder = new mongoose.Schema({
    number_of_page: { type: Number, required: true, min: 1 },
    money_amount: Number,
    purchase_time: { type: Date, default: Date.now() },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
})

module.exports = mongoose.model('PageOrder', pageOrder);