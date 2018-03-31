var express = require("express");
// Require all models
var db = require("../models");
var mongojs = require("mongojs");



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


    remove: function(req, res) {

      db.Headline.remove(
        {
          _id: mongojs.ObjectId(req.params.id)
        },
        // When that's done, run this function
        function(error, edited) {
          // show any errors
          if (error) {
            console.log(error);
            res.send(error);
          }
          else {
            // Otherwise, send the result of our update to the browser
            console.log(edited);
            // res.send(edited);
          }
        }
      );
    },


    update: function(req, res) {

      db.Headline.update(
        {
          _id: mongojs.ObjectId(req.params.id)
        },
        {
          // Set "read" to true for the book we specified
          $set: {
            saved: true
          }
        },
        // When that's done, run this function
        function(error, edited) {
          // show any errors
          if (error) {
            console.log(error);
            res.send(error);
          }
          else {
            // Otherwise, send the result of our update to the browser
            console.log(edited);
            // res.send(edited);
          }
        }
      );
    },

    saved: function(req, res) {

      db.Headline.find(
          // Set "read" to true for the book we specified
          { saved: true })
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