// dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const passport = require("./config/passport");
const flash = require("express-flash");
require("dotenv").config();

// Sets an initial port. heroku uses the process.env.PORT option
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/TrainingLog";

const app = express();

// setup the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: "nordic18",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Serve static files from the React app
app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// set up routes for the app
app.use(routes);

// =============================================================================
// LISTENERS
// =============================================================================
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});