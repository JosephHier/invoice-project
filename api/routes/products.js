const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', function(req, res, next) {
  Product.find()
    .exec()
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(err) {
      res.status(500).json({error: err});
    });
});

router.post('/', function(req, res, next) {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(function(result) {
      console.log(result);
      res.status(201).json({
        msg: "handling POST request for /products",
        createdProduct: product
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then(function(doc) {
      if (doc) {
        res.status(200).json(doc);
      }
      else {
        res.status(404).json({
          message: "No object found!"
        });
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch('/:id', function(req, res, next) {
  const id = req.params.id;
  const updateOps = {};
  for (ops in req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(err) {
      res.status(500).json({error: err});
    });
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  Product.remove({_id: id})
    .exec()
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(err) {
      res.status(500).json({error: err});
    });
});

function now() {
  var date = new Date();
  var dateStr = date.toString();
  return dateStr.splice();
}

module.exports = router;
