const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  invoice_number: {type: String, required: true},
  po_number: {type: String, required: true},
  due_date: {type: Date, required: true},
  amount_cents: {type: Number, required: true},
  created_at: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('Invoice', invoiceSchema);
