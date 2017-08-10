var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  app.post("/api/friends", function(req, res) {
    var match = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var userScores = req.body.scores;

    var totalDifference;

    for (var i = 0; i < friends.length; i++) {
      var friend = friends[i];
      totalDifference = 0;

      for (var j = 0; j < friend.scores.length; j++) {
        var friendScore = friend.scores[j];
        var userScore = userScores[j];
        totalDifference += Math.abs(parseInt(friendScore) - parseInt(userScore));
      }

      if (totalDifference <= match.friendDifference) {
        match.name = friend.name;
        match.photo = friend.photo;
        match.friendDifference = totalDifference;
      }
    }

    friends.push(req.body);

    res.json(match);
  });
};
