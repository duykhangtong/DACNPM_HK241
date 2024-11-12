const mongoose = require('mongoose');

const document = new mongoose.Schema({
    name: String,
    format: String,
    number_of_page: Number
});

module.exports = mongoose.model('Document', document);