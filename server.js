require('dotenv').config();

var express = require('express');

var db = require('./models');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes');

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on: http://localhost:' + PORT);
  });
});


module.exports = app;