const express = require('express');
const router = express.Router();
const db = require("../models");
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
  if (req.user.message) {
    let {message} = req.user;
    res.json(message)
  } else {
    res.json(req.user);
  }
});

// /auth/signup
// route to signup the user
router.post("/signup", (req, res) => {
  db.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (user) {
      console.log("user already exists")
      return res.json({messageType: "error", message: "user already exists"});
    }
    if (!user) {
      // create the user and has the password
      if (req.body.type === "Coach") {
        // this is a new coach => proceed to new coach signup at Temp
        let newCoach = new db.Temp(req.body);
        newCoach.password = newCoach.generateHash(req.body.password);
        newCoach.save((err, coach) => {
          if (err) console.log(err);
          req.body.id = coach._id;
          // redirects to the new coach route as a post route *307*
          res.redirect(307, "/email/new-coach");
        });
      } else {
        let newUser = new db.User(req.body);
        newUser.password = newUser.generateHash(req.body.password);
        newUser.save((err) => {
          if (err) console.log(err);
          // redirects to the login route as a post route *307*
          res.redirect(307, "/auth/login");
        });
      }
    }
  })
});

// /auth/profile
// checks if user is logged in
router.get("/profile", authenticate.isLoggedIn, (req, res) => {
  res.json(req.user);
});

// /auth/logout
// logs out the user
router.get("/logout", authenticate.logout, (req, res) => {
  res.json("User logged out successfully");
});

// /auth/reset
// finds the user(s) based on email and returns the array of users to the front end
router.post("/reset", (req, res) => {
  let {email} = req.body;
    db.User.find({email: email}, (err, userArray) => {
        if (err) {
            res.json("error message: " + err);
        }
        else if (!userArray.length) {
            // res.json("no user found!");
            res.json({messageType: "error", message: "No user with that email was found"});
        } else {
            let resArray = userArray.map(user => {
              return {name: `${user.firstName} ${user.lastName}`, username: user.username, id: user._id};
            })
            res.json(resArray); // sends back the list of users to be used as a "button"
        }
    })
});

// /auth/reset-password/:key 
// hit when reset auth component mounts to show a form
router.get("/reset-password/:key", (req, res) => {
  // route to send the user to the reset page where they can reset their password
  let {key} = req.params;
  db.User.findOne({resetKey: key}, (err, user) => {
      if (err) res.json(err);
      if (!user) {
          return res.json("Sorry no user exists with that key");
      } else {
          res.json(user);
      }
  })
});

module.exports = router;