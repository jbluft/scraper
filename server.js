var express = require("express");
var exphbs = require("express-handlebars");
var request = require('request');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var http = require('http');
var path = require('path');


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));



// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");




// var routes = require("./controllers/fetch");
// app.use(routes);

// var routes = require("./routes/index");


var router = express.Router();

// Require routes file pass router object
require("./routes/index")(router);
app.use(router);


// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/mongoHeadlines");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


// Start the server
app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});
