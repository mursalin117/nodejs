// get dependencies
const express = require('express');
const bodyParser = require('body-parser');

// for heroku
const PORT = process.env.PORT || 5000;

const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

// enable CORS for all HTTR methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');

// adding routes file here
require('./product.routes.js')(app);

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the world of server application!!!"});
});

// listen on port 3000 (not for heroku)
app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});