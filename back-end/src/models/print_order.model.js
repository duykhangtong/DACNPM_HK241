const mongoose = require('mongoose');

const printOrder = new mongoose.Schema({
    page_size: { type: String, enum: ['A3', 'A4'] },
    page_orientation: Boolean, //honizon or vertical
    sided: { type: String, enum: ["one-sided", "two-sided"] },
    papers_per_sheet: Number,
    scale: Number,
    pages_print: String,
    number_of_copies: { type: Number, min: 1 },
    total_print_pages: Number,
    state: { type: String, default: "pending", enum: ['pending', 'printing', 'completed'] },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    document_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    printer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Printer'
    },
    start_time: { type: Date, default: Date.now() },
    end_time: { type: Date, default: null },
})

module.exports = mongoose.model('PrintOrder', printOrder);