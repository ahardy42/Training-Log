// dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/apiRoutes");

// Sets an initial port. heroku uses the process.env.PORT option
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/TrainingLog";

const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the React app
app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// set up routes
app.use("/", routes);

// route for sending the index.html after any API routes
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// =============================================================================
// LISTENERS
// =============================================================================
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});