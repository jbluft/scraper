var express = require("express");
// Require all models
var db = require("../models");


module.exports = {


  HelloArticles: function(req, res){
    // Route for getting all Articles from the db
    // router.get("/articles", function(req, res) {
      // Grab every document in the Articles collection
      db.Headline.find({})
        .then(function(dbHeadline) {
          // If we were able to successfully find Articles, send them back to the client
          res.json(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    },

  }