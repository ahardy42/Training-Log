const express = require('express');
const router = express.Router();
const db = require("../models/Index");
const passport = require("../config/passport");
const authenticate = require("../config/middleware/authenticate");

// =====================================================================================
//                                         authentication routes
// =====================================================================================

// /auth/login
// login route
router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log("sign in successful");
    // send the front end the user for now
    res.json(req.user);
});

// /auth/signup
// route to signup the user
router.post("/signup", (req, res) => {
    db.User.findOne({username: req.body.username}, (err, user) => {
      if (err) throw err;
      if (user) {
        console.log("user already exists")
        return res.json("user already exists");
      }
      if (!user) {
        // create the user and has the password
        let newUser = new db.User(req.body);
        newUser.password = newUser.generateHash(req.body.password);
        newUser.save((err) => {
          if (err) throw err;
          // redirects to the login route as a post route *307*
          res.redirect(307, "/auth/login");
        });  
      }
    })
  });
  
// /auth/logout
// logs out the user
router.get("/logout", authenticate.logout, function(req, res) {
    res.json("User logged out successfully");
  });

  module.exports = router;