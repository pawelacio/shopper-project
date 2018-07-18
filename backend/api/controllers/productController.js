var mongoose = require('mongoose');
var Product = mongoose.model('Products');

exports.listAllProducts = function(req, res) {
    Product.find({}, function(err, prod) {
        if(err)
            res.status(500).send(err);
        res.status(200).json(prod);
    });
};

exports.addProduct = function(req, res) {
    var newProduct = new Product(req.body);
    newProduct.save(function(err, prod) {
        if(err)
            res.status(500).send(err);
        res.status(200).json(prod);
    });
};

exports.readProduct = function(req, res) {
    var id = req.params.productId;
    Product.findById(id, function(err, prod) {
        if(err)
            res.status(500).send(err);
        else{
            if(!prod)
                res.status(404).json({message: 'Product not found!'});
            else
                res.status(200).json(prod);
        }
    });
};

exports.updateProduct = function(req, res) {
    var id = req.params.productId;
    Product.findOneAndUpdate({_id: id}, req.body, { new: true }, function(err, prod) {
        if(err)
            res.status(500).send(err);
        res.status(200).json(prod);
    });
};

exports.deleteProduct = function(req, res) {
    var id = req.params.productId;
    Product.remove({_id: id}, function(err, prod){
        if(err)
            res.status(500).send(err);
        else{
            if(!prod)
                res.status(404).json({message: 'Product not found!'});
            else
                res.status(200).json({message: 'Product deleted successfully!'});
        }
        
    });
};