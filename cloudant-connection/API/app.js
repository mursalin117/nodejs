const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Cloudant = require('@cloudant/cloudant');
const cfenv = require('cfenv');

const loc_imgRoutes = require('./api/routes/loc-img');
const userRoutes = require('./api/routes/user');
// const vcap = require('./vcap-local.json');
//
// let mydb, cloudant;
// var vendor; // Because the MongoDB and Cloudant use different API commands, we
//             // have to check which command should be used based on the database
//             // vendor.
// var dbName = 'mydb';
//
// // load local VCAP configuration  and service credentials
// var vcapLocal;
// try {
//   vcapLocal = require('./vcap-local.json');
//   console.log("Loaded local VCAP", vcapLocal);
// } catch (e) { }
//
// const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}
//
// const appEnv = cfenv.getAppEnv(appEnvOpts);
//
// if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/[Cc][Ll][Oo][Uu][Dd][Aa][Nn][Tt]/)) {
//   // Load the Cloudant library.
//   // var Cloudant = require('@cloudant/cloudant');
//
//   // Initialize database with credentials
//   if (appEnv.services['cloudantNoSQLDB']) {
//     cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
//   } else {
//      // user-provided service with 'cloudant' in its name
//      cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
//   }
// } else if (process.env.CLOUDANT_URL){
//   // Load the Cloudant library.
//   // var Cloudant = require('@cloudant/cloudant');
//
//   if (process.env.CLOUDANT_IAM_API_KEY){ // IAM API key credentials
//     let cloudantURL = process.env.CLOUDANT_URL
//     let cloudantAPIKey = process.env.CLOUDANT_IAM_API_KEY
//     cloudant = Cloudant({ url: cloudantURL, plugins: { iamauth: { iamApiKey: cloudantAPIKey } } });
//   } else { //legacy username/password credentials as part of cloudant URL
//     cloudant = Cloudant(process.env.CLOUDANT_URL);
//   }
// }
// if(cloudant) {
//   //database name
//   dbName = 'mydb';
//
//   // Create a new "mydb" database.
//   cloudant.db.create(dbName, function(err, data) {
//     if(!err) //err if database doesn't already exists
//       console.log("Created database: " + dbName);
//   });
//
//   // Specify the database we are going to use (mydb)...
//   mydb = cloudant.db.use(dbName);
//   console.log('Database connected...');
//
//   vendor = 'cloudant';
// }


// Get account details from environment variables
var url = process.env.cloudant_url;
var username = process.env.cloudant_username;
var password = process.env.cloudant_password;

// Initialize the library with url and credentials.
var cloudant = Cloudant({ url: url, username: username, password: password });
console.log('Database connected...');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     req.header("Access-Control-Allow-Origin", "*");
//     req.header("Access-Control-Allow-Headers", "*");
//     if(req.method === 'OPTIONS') {
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({});
//     }
//     next();
// });

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.get('/location', async (req, res, next) => {
//     try {
// 		var result = [];
//         await mydb.find({
// 			selector: {
// 				'about': 'location'}
// 			}).then((result) => {
//             if (result['docs'].length === 0) {
//                 return res.status(404).json({
//                     message: 'Nothig found'
//                 });
//             }
//             return res.status(200).json({
// 				message: 'Got everything',
// 				count: result.length,
// 				information: result['docs'].map(info => {
//                     return {
//                         _id: info._id,
//                         name: info.name,
//                         note: info.note,
//                         request: {
//                             type: 'GET',
//                             url: "http://localhost:4000/location/" + info._id
//                         }
//                     }
//                 })
// 			});
//         });
//     } catch (error) {
//         return res.status(error['statusCode']).json({
//             type: error['error']
//         });
//     }
// });

// adding the route to handle
app.use('/location', loc_imgRoutes);
app.use('/user', userRoutes);

// all errors of not finding the route
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// any other error like the db communication
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
