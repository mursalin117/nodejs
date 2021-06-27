module.exports = (app) => {
    const products = require('./product.controller.js');

    // create a new product
    app.post('/products', products.create);
    
    // retrieve all products
    app.get('/products', products.findAll);

    // retrieve a single product with productId
    app.get('/products/:productId', products.findOne);

    // update a note with productId
    app.put('/products/:productId', products.update);

    // delete a note with productId
    app.delete('/products/:productId', products.delete);
}