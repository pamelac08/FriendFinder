
var apiRoutes = require("express").Router();
var friends = require("../data/friends")


apiRoutes.get("/api/friends", function(req, res) {
    res.json(friends);
  });


apiRoutes.post("/api/friends", function(req, res) {
    
  var newUser = req.body;
  var userResponses = newUser.scores;
  var newUserScore = userResponses.map(Number);
  
  var matchName = "";
  var matchImage = "";
  var lowestDifference = 100;

  
  for (let i = 0; i < friends.length; i++) {

    var scoreDifferenceTotal = 0;

      for (let j = 0; j < userResponses.length; j++) {
        scoreDifferenceTotal +=  Math.abs(friends[i].scores[j] - newUserScore[j]);
      }
  
      if  (scoreDifferenceTotal < lowestDifference) {
        lowestDifference  =  scoreDifferenceTotal
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
  }
  
  friends.push(newUser);
  res.json({matchName: matchName, matchImage: matchImage})
});


module.exports = apiRoutes;


