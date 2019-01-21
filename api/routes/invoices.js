const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Invoice = require('../models/invoice');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  const invoice = new Invoice({
    id: new mongoose.Types.ObjectId(),
    invoice_number: req.body.invoice_number,
    po_number: req.body.po_number,
    due_date: new Date(req.body.due_date),
    amount_cents: req.body.amount_cents
  });
  invoice
    .save()
    .then(function(result) {
      res.status(201).json(invoice);
    })
    .catch(function(err) {
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:query', function(req, res, next) {
  const query = req.params.query;
  Invoice
    .find({
      $or: [
        {invoice_number: query},
        {po_number: query}
      ]
    })
    .sort({created_at: 'desc'})
    .exec(function (err, results) {
      res.status(201).json(results);
    });
});

module.exports = router;
