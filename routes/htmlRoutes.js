var db = require("../models");

var path  = require('path');


module.exports = function(app) {
  /*// Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });*/

  //GET route to display the survey.html page
  app.get('/form',function(req,res){
    res.sendFile(path.join(__dirname, '../form-page/form.html'));
});

//GET route to display the home.html page by default
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, '../index.html'));
});

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
