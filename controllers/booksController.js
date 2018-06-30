var express = require("express");

var router = express.Router();

// Import the models to use its database functions.
var db = require("../models");

require("dotenv")

//Create a method for pushing user info into database
router.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create({
      profile_pic : req.body.profile_pic, 
      user_name : req.body.user_name,
      email : req.body.email
    }).then(function(result){
      console.log(result)
    })
  });

//Create a method for grabbing books from a google API by title 
var request = require("request");


//Create a method to grab info about books from Google
/*var options = { method: 'GET',
  url: 'https://www.googleapis.com/books/v1/volumes',
  qs: 
   { q: title ,
     key: 'AIzaSyA0mpVc-NF2jWunLV5arTusSUHdj53jcXY' },
  headers: 
   { 'Postman-Token': '506f7037-1ead-48eb-addf-b6aab257fb6f',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { name: 'mothman' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
*/
router.get("/book", function(req, res) {
    request('https://www.googleapis.com/books/v1/volumes?q=' + req.query.title + '&key=' + process.env.GOOGLE_APIKEY, function(err, gres, body) {
        res.json(JSON.parse(body));
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

router.post("/api/cats", function(req, res) {
  recommendations.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
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
