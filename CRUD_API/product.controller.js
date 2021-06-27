const Product = require('./product.model.js');

// create new product
exports.create = (req, res) => {
    // request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // create a product
    const product = new Product({
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    });

    // save product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating the product."
        });
    });
};

// retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving products."
        });
    });
};

// find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product is not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product is not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Something went wrong retrieving product with id " + req.params.productId
        });
    });
};

// update a product
exports.update = (req, res) => {
    // validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // find and update product with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product is not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.king === 'ObjectId') {
            return res.status(404).send({
                message: "Product is not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Something went wrong updating note with id " + req.params.productId
        });
    });
};

// delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product is not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product is not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};