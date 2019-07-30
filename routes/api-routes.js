const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../models/Index");

// =====================================================================================
//                                         API routes
// =====================================================================================

// add a user
router.post("/api/users", (req, res) => {

});

// delete a user
router.delete("/api/users/:userId", (req, res) => {

});

// get all training for a user
router.get("/api/training/:athleteId", (req, res) => {
    db.Athlete
});

// add a training for a user
router.post("/api/training", (req, res) => {

});

// update a training for a user
router.put("/api/training/:trainingId", (req, res) => {

});

// delete a training for a user
router.delete("/api/training/:trainingId", (req, res) => {

});

// get all athletes for the coach
router.get("/api/athletes/:coachId", (req,res) => {

});