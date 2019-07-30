const express = require('express');
const router = express.Router();
const db = require("../models/Index");

// =====================================================================================
//                                         API routes
// =====================================================================================

// /api/users
// add a user
router.post("/users", (req, res) => {
    // create a user immediately after signup

});

// delete a user
router.delete("/users/:userId", (req, res) => {
    // delete the user and cascade delete any training / athletes

});

// get all training for a user
router.get("/training/:athleteId", (req, res) => {
    
});

// add a training for a user
router.post("/training", (req, res) => {

});

// update a training for a user
router.put("/training/:trainingId", (req, res) => {

});

// delete a training for a user
router.delete("/training/:trainingId", (req, res) => {

});

// get all athletes for the coach
router.get("/athletes/:coachId", (req,res) => {

});

module.exports = router;