
var apiRoutes = require("express").Router();
var friends = require("../data/friends")


// will display all data objects in friends array from friends.js file
apiRoutes.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // receiving user survey input, compares against all objects in friends array, returns object with closest match 
apiRoutes.post("/api/friends", function(req, res) {
  
  // receives survey data as object in 'req', pulling out scores array, converting scores array from strings to numbers
  var newUser = req.body;
  var userResponses = newUser.scores;
  var newUserScore = userResponses.map(Number);
  
  // create variable to hold data to send back in response
  var matchName = "";
  var matchImage = "";
  var lowestDifference = 100; // arbitrary number to start the comparison for each friend object

  // for loop to search through each object in friend array
  for (let i = 0; i < friends.length; i++) {

    var scoreDifferenceTotal = 0;

      // for loop to search through each index in scores array for each friend object and find the difference between it and the user input scores 
      for (let j = 0; j < userResponses.length; j++) {
        scoreDifferenceTotal +=  Math.abs(friends[i].scores[j] - newUserScore[j]);
      }
  
      // if the total difference between all inputs of the scores array is less than the previous object, the response variables will be updated 
      if  (scoreDifferenceTotal < lowestDifference) {
        lowestDifference  =  scoreDifferenceTotal
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
  }

  // pushing user survey input to the friends array for this session, sends response back to the webpage 
  friends.push(newUser);
  res.json({matchName: matchName, matchImage: matchImage})
});


module.exports = apiRoutes;


