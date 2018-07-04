// *** Dependencies
var express = require("express");
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
var app = express();
require('dotenv').config();

// Requiring our models for syncing
var db = require("./models");


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
var db = require("./models");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/booksController.js");

// Routes
require("./routes/landingpage-routes")(app);
require("./routes/api-routes")(app);

app.use(routes);

//Sync sequelize
db.sequelize.sync({ force: true }).then(function(){
    app.listen(PORT, function(){
        console.log("Listening on port %s", PORT);
    });
});