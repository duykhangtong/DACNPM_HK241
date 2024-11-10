const mongoose = require('mongoose');

const client = new mongoose.Schema({
    full_name: String,
    number_page: Number,
    last_login: Date
});

module.exports = mongoose.model('Client', client);