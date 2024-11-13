const mongoose = require('mongoose');

const printer = new mongoose.Schema({
    name: String,
    brand: String,
    machine_model: String,
    state: Boolean,
})

module.exports = mongoose.model('Printer', printer);