const express = require('express');
const router = express.Router();
const athleteRoutes = require("./athleteRoutes");
const coachRoutes = require("./coachRoutes");
const authRoutes = require("./authRoutes");
const emailRoutes = require("./emailRoutes");
const teamRoutes = require("./teamRoutes");
const path = require("path");

// =====================================================================================
//                                         all routes
// =====================================================================================

// routes for api and auth
router.use("/auth", authRoutes);
router.use("/email", emailRoutes);
router.use("/api/athlete", athleteRoutes);
router.use("/api/coach", coachRoutes);
router.use("/api/team", teamRoutes);


// route for sending the index.html after any API routes
router.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;