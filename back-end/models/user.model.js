const mongoose = require('mongoose');

const user = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
})

module.exports = mongoose.model('User', user);