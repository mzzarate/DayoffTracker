// var mysql = require('mysql')

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'your_user',
//   password: 'some_secret',
//   database: 'the_app_database'
// })

// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected...')
// })
require('dotenv').config();

var express = require('express');

var exphbs = require("express-handlebars");

var db = require('./models');

var app = express();

var passport = require('passport');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var passportGoogleAuth = require('passport-google-oauth20');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require('./routes/apiRoutes')(app, passport);
require('./routes/htmlRoutes')(app);
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};

// app.post("/file-upload", function(req, res, next){
// 	if (req.files) {
// 		console.log(util.inspect(req.files));
// 		if (req.files.myFile.size === 0) {
// 		            return next(new Error("Hey, first would you select a file?"));
// 		}
// 		fs.exists(req.files.myFile.path, function(exists) {
// 			if(exists) {
// 				res.end("Got your file!");
// 			} else {
// 				res.end("Well, there is no magic for those who don’t believe in it!");
// 			}
// 		});
// 	}
// });



db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on: http://localhost:' + PORT);
  });
});

// Google configure strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  function (accessToken, refreshToken, data, cb) {
    console.log(data);
    var email = data.emails[0].value;
    var google_id = data.id;

    //try to find user
    db.User.findOne({
      google_id: google_id
    })
      .then(function (user) {
        if (!user) {
          // SAVE USER DATA HERE
          db.User.create({
            email: email,
            google_id: google_id
          })
            .then(function (user) {
              //more magic after creating the user
              return cb(null, user);
            });
        }
        else {
          //more magic after finding the user
          return cb(null, user);
        }
      })
      //catches errors an hack attempts
      .catch(err => {
        console.log(err);
        return cb(err, null);
      });
  }));

// when we save a user to a session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// when we retrieve the data from a user session
passport.deserializeUser(function (id, done) {
  db.User.findOne({ where: { id: id } })
    .then(function (user) {
      done(null, user);
    })
    .catch(error => {
      console.log(error);
      done(error, false);
    })
});


require('./routes/apiRoutes')(app, passport);
require('./routes/htmlRoutes')(app);
