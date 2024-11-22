
const mongoose = require('mongoose');

const File = new mongoose.Schema({
  originalname: String,
  buffer: Buffer,
  pageNumber: {type: Number, default: 0},
  mimetype: String,
},{
  timestamps: true
});

module.exports = mongoose.model('File', File);
