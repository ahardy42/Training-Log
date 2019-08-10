const express = require('express');
const router = express.Router();
const authenticate = require("../config/middleware/authenticate");
const db = require("../models/Index");
const mongoose = require("mongoose");

// =====================================================================================
//                                         API routes
// =====================================================================================

// delete a user
router.delete("/users", authenticate.isLoggedIn, (req, res) => {
    // delete the user and cascade delete any training / athletes
    db.User.deleteOne({_id: req.user.id}, err => {
       if (err) throw err;
    });
});

// update a user's info
router.put("/users", authenticate.isLoggedIn, (req, res) => {
    db.User.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
        if (err) throw err;
        res.json(user);
    });
})

// get all training for a user, or training for a set timeframe need to work on this!
/*
router.get("/training/:year?/:month?/:week?", authenticate.isLoggedIn, (req, res) => {
    let {year, month, week} = req.params;
    db.User.findById(req.user.id, (err, athlete) => {
        if (err) throw err;
        res.json(athlete);
    });
});
*/

// get specific timeframe of training for a user params are unix time in ms
router.get("/training/:startTime/:endTime", authenticate.isLoggedIn, (req, res) => {
    let startTime = parseInt(req.params.startTime);
    let endTime = parseInt(req.params.endTime);
    db.User.findById(req.user.id, (err, athlete) => {
        if (err) throw err;
        let training = athlete.training;
        let filteredTraining = training.filter(element => {
            return element.date >= startTime && element.date <= endTime;
        })
        res.json(filteredTraining);
    });
});

// get trainingStats object for charts.js components
router.get("/stats/:startTime/:endTime", authenticate.isLoggedIn, (req, res) => {
    let startTime = parseInt(req.params.startTime);
    let endTime = parseInt(req.params.endTime);
    db.User.aggregate()
    .match({_id: mongoose.Types.ObjectId(req.user.id)})
    .unwind("$training")
    .match({$and: [{"training.date" : {$gte : startTime}}, {"training.date" : {$lte : endTime}}]})
    .group({_id: "$training.mode", total: {$sum: "$training.duration"}})
    .exec((err, stats) => {
        if (err) console.log(err);
        console.log(stats);
        res.json(stats);
    })

})

// add a training for a user
router.post("/training", authenticate.isLoggedIn, (req, res) => {
    if (req.user.type === "Athlete") {
        db.User.findById(req.user.id, (err, athlete) => {
            if (err) throw err;
            console.log("training object:",req.body);
            athlete.training.push(req.body);
            athlete.save((err, athlete) => {
                if (err) throw err;
                res.json(athlete.training);
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
                res.json(athlete.training);
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
                res.json(athlete.training);
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

// add comment on training for a coach

module.exports = router;