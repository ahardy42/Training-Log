const express = require('express');
const router = express.Router();
const authenticate = require("../config/middleware/authenticate");
const db = require("../models/Index");

// =====================================================================================
//                                         API routes
// =====================================================================================

// delete a user
router.delete("/users/:userId", authenticate.isLoggedIn, (req, res) => {
    // delete the user and cascade delete any training / athletes
    db.User.deleteOne({_id: req.user.id}, err => {
       if (err) throw err;
    });
});

// get all training for a user
router.get("/training", authenticate.isLoggedIn, (req, res) => {
    db.User.findById(req.user.id, (err, athlete) => {
        if (err) throw err;
        res.json(athlete.training);
    });
});

// add a training for a user
router.post("/training", authenticate.isLoggedIn, (req, res) => {
    if (req.user.type === "Athlete") {
        db.User.findById(req.user.id, (err, athlete) => {
            if (err) throw err;
            athlete.training.push(req.body);
            athlete.save((err, athlete) => {
                if (err) throw err;
                res.json(athlete);
            });
        });
    } else {
        res.json("Only Athletes can add training");
    }
});

// update a training for a user
router.put("/training/:trainingId", authenticate.isLoggedIn, (req, res) => {
    if (req.user.type === "Athlete") {
        db.User.findById(req.user.id, (err, athlete) => {
            if (err) throw err;
            let training = athlete.training.id(req.params.trainingId);
            training.set(req.body); // need to have req.body match exactly the structure of the training subdoc
            athlete.save((err, athlete) => {
                if (err) throw err;
                res.json(athlete);
            });
        });
    } else {
        res.json("Only Athletes can modify training");
    }
});

// delete a training for a user
router.delete("/training/:trainingId", authenticate.isLoggedIn, (req, res) => {
    if (req.user.type === "Athlete") {
        db.User.findById(req.user.id, (err, athlete) => {
            if (err) throw err;
            athlete.training.id(req.params.trainingId).remove();
            athlete.save((err, athlete) => {
                if (err) throw err;
                res.json(athlete);
            });
        });
    } else {
        res.json("Only Athletes can modify training");
    }
});

// get all athletes for the coach
router.get("/athletes", authenticate.isLoggedIn, (req,res) => {
    if (req.user.type === "Coach") {
        db.User.find({team: req.user.team, type: "Athlete"}, (err, athletes) => {
            if (err) throw err;
            res.json(athletes);
        });
    } else {
        res.json("only coaches can hit this route");
    }
});

module.exports = router;