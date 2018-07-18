module.exports = function(app) {
    var productController = require('../controllers/productController');
    var basketController = require('../controllers/basketController');
    var userController = require('../controllers/userController');
    var checkAuth = require('../middlewares/checkAuth');

    //product routes
    app.route('/products')
        .get(productController.listAllProducts)
        .post(productController.addProduct)

    app.route('/products/:productId')
        .get(productController.readProduct)
        .put(productController.updateProduct)
        .delete(productController.deleteProduct);

    //basket routes
    app.route('/baskets')
        .get(basketController.listAllBaskets)
        .post(basketController.addBasket)

    app.route('/baskets/:basketId')
        .get(basketController.readBasket)
        .put(basketController.updateBasket)
        .delete(basketController.deleteBasket);

    app.route('/baskets/user/:userId')
        .get(basketController.readBasketsforUser);
    
    //user routes
    app.route('/signup')
        .post(userController.signUpUser);

    app.route('/login')
        .post(userController.logInUser);
};