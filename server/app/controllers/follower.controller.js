const Follower = require("../models/follower.model.js");

exports.create = (req, res) => {

    console.log("HEllo Hello from post")

    //console.log(req.body)

    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a murmur
    const follower = new Follower({
        user_id:req.body.follower_user_id, 
        follower_user_id:req.body.user_id
    });
    console.log("follower1")
    // Save follower in the database
    Follower.create(follower, (err, data) => {

        console.log("follower2")

        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the follower."
        });
        else 
        res.send(data);
    });

  
};

exports.followerCount = (req, res) => {

    console.log(req.params.userId);

    console.log("Find by user ID");
  
    Follower.followerCount(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found follower with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving follower with id " + req.params.userId
          });
        }
      } else res.send(data);
    });

}


exports.followingCount = (req, res) => {

    console.log(req.params.userId);

    console.log("Find by user ID");
  
    Follower.followingCount(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found following with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving following with id " + req.params.userId
          });
        }
      } else res.send(data);
    });

}

exports.getFollowing = (req, res) => {
  console.log(req.params.userId);

    console.log("Find by user ID");
    Follower.getFollowing(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found followedby with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving followedby with id " + req.params.userId
          });
        }
      } else res.send(data);
    });

}

exports.getFollower = (req, res) => {
  console.log(req.params.userId);

    console.log("Find Followers by user ID");
    
    Follower.getFollower(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Follower with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Follower with id " + req.params.userId
          });
        }
      } else res.send(data);
    });

}

