const mongoose = require('mongoose');

const printOrder = new mongoose.Schema({
    page_size: { type: String, enum: ['A3', 'A4'] },
    page_orientation: { type: String, enum: ["landscape", "portrait"] },
    sided: { type: String, enum: ["one-sided", "double-sided"] },
    scale: { type: Number, default: 1 },
    pages_to_printed: Number,
    pages_per_sheet: { type: Number, default: 1 },
    number_of_copies: { type: Number, min: 1, default: 1 },
    total_print_pages: Number,
    state: { type: String, default: "pending", enum: ['pending', 'completed'] },
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
    end_time: { type: Date, default: null },
}, {
    timestamps: true,
})

module.exports = mongoose.model('PrintOrder', printOrder);