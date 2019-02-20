//SPDX-License-Identifier: Apache-2.0

// nodejs server setup 

// call the packages we need
var express       = require('express');        // call express
var app           = express();                 // define our app using express
var bodyParser    = require('body-parser');
var http          = require('http');
var fs            = require('fs');
var Fabric_Client = require('fabric-client');
var path          = require('path');
var util          = require('util');
var os            = require('os');

var xFrameOptions = require('x-frame-options');
var xssFilter = require('x-xss-protection');
var helmet = require('helmet');
var morgan = require('morgan');

require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss' });

// instantiate the app
var app = express();
//
// Load all of our middleware
// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ extended: true }));

// Morgan configuration
app.use(morgan('[ Request ] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
//app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

// security
app.use(bodyParser.json());
//app.use(xFrameOptions());
app.use(xssFilter({ setOnOldIE: true }));
//app.use(helmet());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'sameorigin' }));

//app.use(fileUpload());
// this line requires and runs the code from our routes.js file and passes it app
require('./routes.js')(app);

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './app')));

process.env.TZ = 'Asia/Kolkata';

// Save our port
var port = process.env.PORT || 8000;
var env = process.env.ENV || 'production';

// Start the server and listen on port 

app.listen(port,function(){
  console.log("**************************************************");
  console.log("**	DApp running on port	: " + port);
  console.log("**	DApp environment 	: " + env);
  console.log("**	Timezone		: " + process.env.TZ);
  console.log("**************************************************");
});
