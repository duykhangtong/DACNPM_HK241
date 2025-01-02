const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


db = {};
db.client = require('./client.model');
db.spso = require('./spso.model');
db.user = require('./user.model');
db.page_order = require('./page_order.model');
db.print_order = require('./print_order.model');
db.printer = require('./printer.model');
db.file = require('./file.model');

module.exports = db;