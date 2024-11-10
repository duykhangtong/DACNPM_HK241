const mongoose = require('mongoose');

const spso = new mongoose.Schema({
    full_name: String,
    last_login: Date
});

module.exports = mongoose.model('Spso', spso);

