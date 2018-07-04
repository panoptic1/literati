//+++++++++++++++++++++++++++++++++DEPENDENCIES++++++++++++++++++++++++++++++++++++++++++
var express = require("express");

var router = express.Router();

// Import the models to use its database functions.
var db = require("../models");

//Stash API key here...
require("dotenv")

//Create a method for pushing user info into database
router.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create({
      profile_pic : req.body.profile_pic, 
      user_name : req.body.user_name,
      email : req.body.email
    }).then(function(result){
      res.json(result)
    }).catch(function(result){
      res.json(result)
  })
});

//Create a method for pushing book info into the books database
router.post("/api/books", function(req, res){
  console.log(req.body);
    db.Books.create({
        user: DataTypes.STRING,
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        genre: DataTypes.STRING,
        copyright_date: DataTypes.DATE,
        ISBN: DataTypes.STRING,
        cover_art_url: DataTypes.STRING,
        synopsis: DataTypes.STRING,
        status: DataTypes.STRING
    })
})
//Create a method for grabbing books from a google API by title 
var request = require("request");

router.get("/book", function(req, res) {
  request('https://www.googleapis.com/books/v1/volumes?q=' + req.query.title + '&key=' + process.env.GOOGLE_APIKEY, function(err, gres, body) {
      res.json(JSON.parse(body));
  })
});

router.post("/api/books", function(req, res) {
  console.log(req.body);
  db.Books.create({

  }).then(function(result){
    console.log(result)
  })
});

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  recommendations.all(function(data) {
    var hbsObject = {
      recommendations: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});


router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
