var mongoose = require('mongoose');
var Basket = mongoose.model('Baskets');
var Product = mongoose.model('Products');

exports.listAllBaskets = function(req, res) {
    Basket.find({})
        .populate('products', '_id name type price')
        .exec(function(err, bas) {
        if(err)
            res.status(500).send(err);
        res.status(200).json(bas);
    });
};

exports.addBasket = function(req, res) {
    var newBasket = new Basket(req.body);
    newBasket.save(function(err, prod) {
        if(err)
            res.status(500).send(err);
        res.status(200).json(prod);
    });
};

exports.readBasket = function(req, res) {
    var id = req.params.basketId;
    Basket.findById(id)
        .populate('products', '_id name type price')
        .exec(function(err, bas) {
            if(err)
                res.status(500).send(err);
            else {
                if(!bas)
                    res.status(404).json({message: 'Basket not found!'});
                else
                    res.status(200).json(bas);
            }
        });
};

exports.readBasketsforUser = function(req, res) {
    //TODO
};

exports.updateBasket = function(req, res) {
    var id = req.params.basketId;
    Basket.findOneAndUpdate({_id: id}, req.body, { new: true }, function(err, bas) {
        if(err)
            res.status(500).send(err);
        res.status(200).json(bas);
    });
};

exports.deleteBasket = function(req, res) {
    var id = req.params.basketId;
    Basket.remove({_id: id}, function(err, bas) {
        if(err)
            res.status(500).send(err);
        else{
            if(!bas)
                res.status(404).json({message: 'Basket not found!'});
            else
                res.status(200).json({message: 'Product deleted successfully!'});
        }
    })
};