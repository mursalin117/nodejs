// improting the package and express
const express = require('express');

// importing mongoose
const mongoose = require('mongoose');

// importing body-parser
const bodyParser = require('body-parser');

// importing .env package
require('dotenv/config');

// importing routes
const noticeRoutes = require('./routes/notice');

// port creating
const port = process.env.PORT || 3000;

// executing express
const app = express();

// middle-ware and handling json data
app.use(bodyParser.json());

// route defining
app.use('/department/notice', noticeRoutes);

// database connection
mongoose.connect(process.env.DataBaseConnection, // using .env file
    {   useNewUrlParser: true,
        useUnifiedTopology: true },
     () => {
        console.log('Database connected successfully'); // showing database connected
});

// server creating
app.listen(port, () => {
    console.log('listening to the port 3000....'); // showing connecting to server
});