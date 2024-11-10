const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


db = {};
db.client = require('./client.model');
db.spso = require('./spso.model');
db.user = require('./user.model');

module.exports = db;