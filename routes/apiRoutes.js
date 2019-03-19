var db = require("../models");

module.exports = function(app, passport) {
  // Get all examples
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

  //Route used to authenticate the google sign in by saving the users profile and email
  app.get(
    "/_auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  //Route used to authenticate the google sign in and redirect the user back to the home page
  app.get(
    "/_auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
};
