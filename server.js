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

app.use(multer({
    dest: "./uploads/"
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

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on: http://localhost:' + PORT);
  });
});


module.exports = app;