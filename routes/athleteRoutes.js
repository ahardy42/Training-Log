const express = require('express');
const router = express.Router();
const authenticate = require("../config/middleware/authenticate");
const db = require("../models");
const mongoose = require("mongoose");

const getDateFromParams = require("./helperFunc");

// =====================================================================================
//                               API routes for athletes
// =====================================================================================

// get all training for a user, or training for a set timeframe need to work on this!
router.get("/training/:year?/:month?", authenticate.isLoggedIn, (req, res) => {
    let {year, month} = req.params;
    let date = getDateFromParams(year, month);
    db.User.findOne({$and : [{_id : req.user.id}, {'training.date' : {$gte : date.start}}, {'training.date' : {$lt : date.end}}]}, "training", (err, training) => {
        if (err) console.log(err);
        res.json(training || []);
    });
});

// get trainingStats object for charts.js components
router.get("/stats/:year?/:month?", authenticate.isLoggedIn, (req, res) => {
    let { year, month } = req.params;
    let date = getDateFromParams(year, month);
    db.User.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.user.id) })
        .unwind("$training")
        .match({ $and: [{ "training.date": { $gte: date.start } }, { "training.date": { $lte: date.end } }] })
        .group({ _id: "$training.mode", total: { $sum: "$training.duration" } })
        .exec((err, stats) => {
            if (err) console.log(err);
            res.json(stats);
        })
});

// get stats for the year, by month for the chart
router.get("/chart-stats/:year", authenticate.isLoggedIn, (req, res) => {
    let {year} = req.params;
    let date = getDateFromParams(year);
    db.User.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.user.id) })
        .unwind("$training")
        .match({ $and: [{ "training.date": { $gte: date.start } }, { "training.date": { $lte: date.end } }] })
        .group({ _id: { month: { $month: "$training.date" } }, total: { $sum: "$training.duration" } })
        .exec((err, stats) => {
            if (err) console.log(err);
            res.json(stats);
        });
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

module.exports = router;