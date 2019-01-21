const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json({
    msg: 'Orders fetched'
  });
});

router.post('/', function(req, res, next) {
  res.status(201).json({
    msg: 'Order created'
  });
});

router.patch('/:id', function(req, res, next) {
  res.status(200).json({
    msg: 'Order #' + req.params.id + " edited"
  });
});

router.delete('/:id', function(req, res, next) {
  res.status(200).json({
    msg: "Order #" + req.params.id + " deleted"
  });
});

module.exports = router;
