var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    var bearerHeader = req.headers.authorization;
    if(typeof bearerHeader !== 'undefined') {
        var token = bearerHeader.split(' ')[1];
        jwt.verify(token, 'secretkey', function(err, authData){
            if(err)
                res.status(403).send(err);
            else{
                req.userData = authData;
                next();
            }
        });
    }else{
        res.status(403).json({message: 'Auth failed!'});
    }
}