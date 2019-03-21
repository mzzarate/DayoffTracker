var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_user',
  password: 'some_secret',
  database: 'the_app_database'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})



require('dotenv').config();
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes');

var bodyParser = require('body-parser');
var multer = require('multer');


var express = require('express');

var db = require('./models');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
//app.use(expbp.bodyParser({uploadDir:'./uploads'}));
//app.use(express.bodyParser({ uploadDir: './uploads' }));
app.use(bodyParser.urlencoded({
    extended: true
}));

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};

app.post("/file-upload", function(req, res, next){
	if (req.files) {
		console.log(util.inspect(req.files));
		if (req.files.myFile.size === 0) {
		            return next(new Error("Hey, first would you select a file?"));
		}
		fs.exists(req.files.myFile.path, function(exists) {
			if(exists) {
				res.end("Got your file!");
			} else {
				res.end("Well, there is no magic for those who don’t believe in it!");
			}
		});
	}
});

app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
});

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on: http://localhost:' + PORT);
  });
});


module.exports = app;