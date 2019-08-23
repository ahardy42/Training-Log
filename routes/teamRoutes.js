const express = require('express');
const router = express.Router();
const authenticate = require("../config/middleware/authenticate");
const db = require("../models");


// add a team to the db
router.post("/add", (req, res) => {
    db.Team.findOne({name : req.body.name}, (err, existingTeam) => {
        if (err) console.log(err);
        if (!existingTeam) {
            let newTeam = db.Team(req.body);
            newTeam.admin.password = newTeam.generateHash(req.body.admin.password);
            newTeam.save((err, team) => {
                if (err) console.log(err);
                res.json(team);
            });
        } else {
            res.json({messageType: "error", message: "Sorry, that team already exists"});
        }
    })
});

// get route for select menu
router.get("/select-menu", (req, res) => {
    db.Team.aggregate()
    .project({name : 1})
    .sort({name : 1})
    .exec((err, teamArray) => {
        if (err) console.log(err);
        res.json(teamArray);
    });
});

module.exports = router;