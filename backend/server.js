const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Product = require('./api/models/productModel');
var Basket = require('./api/models/basketModel');
var User = require('./api/models/userModel');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SimpleShop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

var routes = require('./api/routes/shopRoutes');
routes(app);

app.listen(port, () => console.log('Shop RESTful Api server started on: '+port));