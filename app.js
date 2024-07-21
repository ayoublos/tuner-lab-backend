const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const songsController = require("./controllers/songsController.js");
app.use("/songs", songsController);

app.get("/", (req, res) => {
    res.send("Welcome to Tuner");
  });
app.get("/*", (req, res) => {
    res.send("Page does not exist");
  });

  module.exports=app;