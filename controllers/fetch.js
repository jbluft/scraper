var express = require("express");

// Require all models
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
  HelloWorld: function(req, res){
     res.render("index");
    },

  HelloScrape: function(req, res) {

    // A GET route for scraping the echoJS website
    // router.get("/scrape", function(req, res) {
      // First, we grab the body of the html with request
      axios.get("http://www.drf.com/news/all-news/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
    
        // Now, we grab every h2 within an article tag, and do the following:
        $("div.title").each(function(i, element) {
          // Save an empty result object
          var result = {};
    
          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this).text();
          result.link = $(this).children().attr("href");
      
          console.log(result);

    
          // Create a new Article using the `result` object built from scraping
          db.Headline.create(result)
            .then(function(dbHeadline) {
              // View the added result in the console
              console.log(dbHeadline);
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
              return res.json(err);
            });
        });
    
        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
      });
  
   },
  }