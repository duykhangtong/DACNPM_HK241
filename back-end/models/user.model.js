const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    role_type: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: function () {
            return this.role_type === "admin" ? "Spso" : "Client";
        }
    }
});

module.exports = mongoose.model('User', user);