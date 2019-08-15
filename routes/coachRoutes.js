const express = require('express');
const router = express.Router();
const authenticate = require("../config/middleware/authenticate");
const db = require("../models/Index");
const mongoose = require("mongoose");

const getDateFromParams = require("./helperFunc");

// =====================================================================================
//                               API routes for coaches
// =====================================================================================

// get all athletes for the coach and return an object with name, total training time for each
// activity for the specified timeframe
router.get("/team/activity/:year/:month?", authenticate.isLoggedIn, (req,res) => {
    let {year, month} = req.params;
    let date = getDateFromParams(year, month);
    /* wow! this is a bit complicated but what it does is...
    * 1. matches the team with the coaches team name and makes sure it is only returning athletes...
    * 2. creates a doc for each element of training
    * 3. groups by username AND training mode (kind of a weird group)
    * 4. creates a total during this group for each mode
    * 5. re-groups by username so that the athletes each have their own formed doc
    */
    if (req.user.type === "Coach") {
        db.User.aggregate()
        .match({$and : [{"team" : req.user.team}, {"type" : "Athlete"}]})
        .unwind("training")
        .match({$and : [{"training.date" : {$gte : date.start}}, {"training.date" : {$lt : date.end}}]})
        .group({
            _id: {username: "$username", mode: "$training.mode"},
            athleteId: {$first: "$_id"},
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
            athleteId: {$first: "$athleteId"},
            mode: {
                $push: {
                    mode: "$_id.mode",
                    totalDuration: "$totalMinutes"
                }
            }
        })
        .project({_id: 1,name: 1,mode: 1,athleteId:1,totalTime: {$sum : "$mode.totalDuration"}})
        .exec((err, athleteArray) => {
            if (err) console.log(err);
            res.json(athleteArray);
        })
    } else {
        res.json("only coaches can hit this route");
    }
});

// populate training calendar with athlete data for the coach modal
router.get("/:athleteId/:year/:month", authenticate.isLoggedIn, (req, res) => {
    let {athleteId, year, month} = req.params;
    if (req.user.type === "Coach") {
        let date = getDateFromParams(year, month);
        db.User.findOne({$and : [{_id : athleteId}, {'training.date' : {$gte : date.start}}, {'training.date' : {$lt : date.end}}, {"team" : req.user.team}]}, "training", (err, training) => {
            if (err) console.log(err);
            console.log(training);
            res.json(training || []);
        });
    } else {
        res.json("only coaches can hit this route");
    }
});

router.put("/:athleteId/:trainingId", authenticate.isLoggedIn, (req, res) => {
    let {athleteId, trainingId} = req.params;
    db.User.findById(athleteId, (err, athlete) => {
        if (err) throw err;
        let training = athlete.training.id(trainingId);
        training.set(req.body); // need to have req.body match exactly the structure of the training subdoc
        athlete.save((err, athlete) => {
            if (err) throw err;
            res.json(athlete.training.id(trainingId));
        });
    });
});

module.exports = router;