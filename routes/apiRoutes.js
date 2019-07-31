const express = require('express');
const router = express.Router();
const authenticate = require("../config/middleware/authenticate");
const db = require("../models/Index");

// =====================================================================================
//                                         API routes
// =====================================================================================

// /api/users
// add a user
router.post("/users", authenticate.isLoggedIn, (req, res) => {
    // create a user immediately after signup and then redirect to login
    console.log(req.user.type);
    if (req.user.type === "Coach") {
        db.Coach.create(req.body, (err) => {
            if (err) throw err;
            console.log("user created");
        });
    } else {
        let newAthlete = {
            username: req.user.username,
            name: `${req.user.firstName} ${req.user.lastName}`,
            team: req.user.team
        };

        db.Athlete.create(newAthlete, err => {
            if (err) throw err;
            res.redirect(303, "/api/training");
        });
    }
});

// delete a user
router.delete("/users/:userId", authenticate.isLoggedIn, (req, res) => {
    // delete the user and cascade delete any training / athletes
    db.User.deleteOne({_id: req.user.id}, err => {
        if (req.user.type === "Coach") {
            db.Coach.deleteOne({_id: req.user.id}, err => {
                if (err) throw err;
            });
        } else {
            db.Athlete.deleteOne({_id: req.user.id}, err => {
                if (err) throw err;
            });
        }
    });
});

// get all training for a user
router.get("/training", authenticate.isLoggedIn, (req, res) => {
    db.Athlete.findOne({username: req.user.username}, (err, athlete) => {
        if (err) throw err;
        res.json(athlete);
    });
});

// add a training for a user
router.post("/training", authenticate.isLoggedIn, (req, res) => {
    db.Athlete.findById(req.user.id, (err, athlete) => {
        if (err) throw err;
        athlete.training.push(req.body);
        athlete.save((err, athlete) => {
            if (err) throw err;
            res.json(athlete);
        });
    })
});

// update a training for a user
router.put("/training/:trainingId", authenticate.isLoggedIn, (req, res) => {
    db.Athlete.findById(req.user.id, (err, athlete) => {
        if (err) throw err;
        let training = athlete.training.id(req.params.trainingId);
        training.set(req.body); // need to have req.body match exactly the structure of the training subdoc
        athlete.save((err, athlete) => {
            if (err) throw err;
            res.json(athlete);
        });
    });
});

// delete a training for a user
router.delete("/training/:trainingId", authenticate.isLoggedIn, (req, res) => {
    db.Athlete.findById(req.user.id, (err, athlete) => {
        if (err) throw err;
        athlete.training.id(req.params.trainingId).remove();
        athlete.save((err, athlete) => {
            if (err) throw err;
            res.json(athlete);
        });
    });
});

// get all athletes for the coach
router.get("/athletes", authenticate.isLoggedIn, (req,res) => {
    db.Coach.findById(req.user.id)
    .populate("athletes")
    .exec( (err, coach) => {
        if (err) throw err;
        res.json(coach);
    });
});

module.exports = router;