// load package
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const noticeRoutes = require('./Routes/notice');

// entry point to create a express app
const app = express();  

// middle-ware
// handle json data
app.use(bodyParser.json());
app.use('/department/notice', noticeRoutes);

// connect with database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, 
    useUnifiedTopology: true },
  () => {
    console.log("Database connected successfully..");
  }
);

// create a local server under port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000...');
});