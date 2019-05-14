//require("dotenv").config();
var express = require("express");
//var exphbs = require("express-handlebars");

var db = require("./models");



//dependencies for login
var session    = require('express-session')
var bodyParser = require('body-parser')
var passport   = require('passport')

var PORT = process.env.PORT || 3500;
var app = express();
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//For BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
//if (process.env.NODE_ENV === "test") {
//  syncOptions.force = true;
//}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

//module.exports = app;
