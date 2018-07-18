var mongoose = require('mongoose');
var User = mongoose.model('Users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.signUpUser = function(req, res) {
    if(req.body.username && req.body.email && req.body.password)
        User.find({email: req.body.email}, function(err, user) {
            if(err)
                res.status(500).send(err);
            else{
                if(user.length >= 1) {
                    res.status(400).json({message: 'Mail exists'})
                }else{
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        if(err)
                            res.status(500).send(err);
                        var newUser = new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        });
                        newUser.save(function(e, u) {
                            if(e)
                                res.status(500).send(e);
                            res.status(200).json({message: 'User created!'});
                        });
                    })
                }
            }
        });
    else
        res.json({message: 'Fill required fields!'})
};

exports.logInUser = function(req, res) {
    if(req.body.email && req.body.password)
        User.find({email: req.body.email}, function(err, user) {
            if(err)
                res.status(500).send(err);
            else{
                if(user.length < 1) {
                    res.status(401).json({message: 'Auth failed'});
                }else{
                    bcrypt.compare(req.body.password, user[0].password, function(bcrypterr, bcryptres) {
                        if(bcrypterr)
                            res.status(401).send(bcrypterr);
                        if(bcryptres) {
                            jwt.sign({
                                userId: user[0]._id,
                                email: user[0].email
                            },'secretkey', function(signerr, token) {
                                if(signerr)
                                    res.status(500).send(signerr);
                                res.status(200).json({
                                    message: 'Auth succesful',
                                    user: user[0],
                                    token: token
                                })
                            });
                        } else {
                            res.status(401).json({message: 'Wrong password'});
                        }
                    });
                }
            }
        });
        else
            res.json({message: 'Fill required fields!'})
};