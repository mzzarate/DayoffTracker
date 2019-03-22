var db = require("../models");

module.exports = function(app, passport) {

  app.get("/lp/create", function(req, res) {

    // edited lp create to add in a lp_name
  
    db.lp.create({
  
      item_name: "fake stuff"
  
    })
  
      // pass the result of our call
  
      .then(function(dbLp) {
  
        // log the result to our terminal/bash window
  
        console.log(dbLp);
  
        // redirect
  
        res.redirect("/");
  
      });
  
  });

  // Get all examples

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

  app.get('/_auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
 
  app.get('/_auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user-account');
  });
};
