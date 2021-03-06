dbPath = 'mongodb://node_shop:' + process.env.MONGO_ATLAS_PW
  + '@node-rest-shop-shard-00-00-mdwgx.mongodb.net:27017,node-rest-shop-shard-0'
  + '0-01-mdwgx.mongodb.net:27017,node-rest-shop-shard-00-02-mdwgx.mongodb.net:'
  + '27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&ret'
  + 'ryWrites=true';

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const invoiceRoutes = require('./api/routes/invoices');

app.set('view engine', 'pug');

mongoose.connect(dbPath, {
  useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/v1/invoices', invoiceRoutes);

app.use(function(req, res, next) {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

module.exports = app;
