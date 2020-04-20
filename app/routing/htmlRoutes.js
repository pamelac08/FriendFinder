
var path = require("path");
var htmlRoutes = require("express").Router();


// will display the home page when user goes to the main webpage address
htmlRoutes.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

// will display the survey page (primarily when user click on survey button from home page) 
htmlRoutes.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

module.exports = htmlRoutes;