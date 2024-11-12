const mongoose = require('mongoose');

const location = new mongoose.Schema({
    branch: String,
    building: String,
    room: String
})

module.exports = mongoose.model('Location', location);