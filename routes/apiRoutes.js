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
router.get("/training/:year?/:month?", authenticate.isLoggedIn, (req, res) => {
    let {year, month} = req.params;
    year = parseInt(year);
    month = parseInt(month);
    let date = {};
    if (month) {
        date.start = new Date(`${month}/01/${year}`);
        date.end = month === "12" ? new Date(`01/01/${year + 1}`) : new Date(`${month + 1}/01/${year}`);
    } else {
        date.start = new Date(`01/01/${year}`);
        date.end = new Date(`01/01/${year + 1}`);
    }
    console.log(date);
    db.User.findOne({$and : [{_id : req.user.id}, {'training.date' : {$gte : date.start}}, {'training.date' : {$lt : date.end}}]}, "training", (err, training) => {
        if (err) console.log(err);
        res.json(training || []);
    });
});

// get specific timeframe of training for a user params are unix time in ms
// router.get("/training/:startTime/:endTime", authenticate.isLoggedIn, (req, res) => {
//     let startTime = parseInt(req.params.startTime);
//     let endTime = parseInt(req.params.endTime);
//     db.User.findById(req.user.id, (err, athlete) => {
//         if (err) throw err;
//         let training = athlete.training;
//         let filteredTraining = training.filter(element => {
//             return element.date >= startTime && element.date <= endTime;
//         })
//         res.json(filteredTraining);
//     });
// });

// get trainingStats object for charts.js components
router.get("/stats/:year?/:month?", authenticate.isLoggedIn, (req, res) => {
    let {year, month} = req.params;
    year = parseInt(year);
    month = parseInt(month);
    let date = {};
    if (month) {
        date.start = new Date(`${month}/01/${year}`);
        date.end = month === "12" ? new Date(`01/01/${year + 1}`) : new Date(`${month + 1}/01/${year}`);
    } else {
        date.start = new Date(`01/01/${year}`);
        date.end = new Date(`01/01/${year + 1}`);
    }
    console.log(date);
    db.User.aggregate()
    .match({_id: mongoose.Types.ObjectId(req.user.id)})
    .unwind("$training")
    .match({$and: [{"training.date" : {$gte : date.start}}, {"training.date" : {$lte : date.end}}]})
    .group({_id: "$training.mode", total: {$sum: "$training.duration"}})
    .exec((err, stats) => {
        if (err) console.log(err);
        console.log(stats);
        res.json(stats);
    })
});

// router.get("/stats/:startTime/:endTime", authenticate.isLoggedIn, (req, res) => {
//     let startTime = parseInt(req.params.startTime);
//     let endTime = parseInt(req.params.endTime);
//     db.User.aggregate()
//     .match({_id: mongoose.Types.ObjectId(req.user.id)})
//     .unwind("$training")
//     .match({$and: [{"training.date" : {$gte : startTime}}, {"training.date" : {$lte : endTime}}]})
//     .group({_id: "$training.mode", total: {$sum: "$training.duration"}})
//     .exec((err, stats) => {
//         if (err) console.log(err);
//         console.log(stats);
//         res.json(stats);
//     })

// })

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

// get all athletes for the coach and return an object with name, total training time for each
// activity for the specified timeframe
router.get("/athletes/:year/:month?", authenticate.isLoggedIn, (req,res) => {
    let {year, month} = req.params;
    let date = month ? `${month}/01/${year}` : `01/01/${year}`;
    if (req.user.type === "Coach") {
        db.User.aggregate()
        .match({$and : [{"team" : req.user.team}, {"type" : "Athlete"}]})
        .unwind("training")
        .match({"training.date" : {$gte : new Date(date)}})
        .group({
            _id: {username: "$username", mode: "$training.mode"},
            name: {
                $first: {$concat : ["$firstName", " ", "$lastName"]}
            },
            totalMinutes: {
                $sum: "$training.duration"
            }
        })
        .group({
            _id: "$_id.username",
            name: {$first: "$name"},
            mode: {
                $push: {
                    mode: "$_id.mode",
                    totalDuration: "$totalMinutes"
                }
            }
        })
        .project({
            _id: 1,
            name: 1,
            mode: 1,
            totalTime: {$sum : "$mode.totalDuration"}
        })
        .exec((err, athleteArray) => {
            if (err) console.log(err);
            res.json(athleteArray);
        })
    } else {
        res.json("only coaches can hit this route");
    }
});

// add comment on training for a coach

module.exports = router;