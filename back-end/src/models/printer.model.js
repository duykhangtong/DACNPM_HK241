const mongoose = require('mongoose');

const printer = new mongoose.Schema({
    name: String,
    brand: String,
    machine_model: String,
    state: Boolean,
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }

})

module.exports = mongoose.model('Printer', printer);