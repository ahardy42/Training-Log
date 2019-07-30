const express = require('express');
const router = express.Router();
const apiRoutes = require("./apiRoutes");
const authRoutes = require("./authRoutes");
const path = require("path");

// =====================================================================================
//                                         all routes
// =====================================================================================

// routes for api and auth
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

// route for sending the index.html after any API routes
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;