const User = require("../models/user.model.js");

exports.getUserById = (req, res) => {

    console.log(req.params.userId);

    console.log("Find by user ID");
  

  User.getUserByID(req.params.userId, (err, data) => {
    
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      }
    } else res.send(data);
  });

}


exports.getUserMurmurById = (req, res) => {

    console.log(req.params.userId);

    console.log("Find by user ID");
  

  User.getUserMurmurById(req.params.userId,req.params.page, (err, data) => {
    
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      }
    } else res.send(data);
  });

}

exports.getAlluser = (req, res) => {

    console.log(req.params.userId);

    console.log("Find by not user ID");
  

  User.getAlluser(req.params.userId, (err, data) => {
    
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      }
    } else res.send(data);
  });

}


exports.getNotFollowingUser = (req, res) => {

    console.log(req.params.userId);

    console.log("Find by not user ID");
  

  User.getNotFollowingUser(req.params.userId, (err, data) => {
    
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          //message: `Not found getNotFollowingUser user with id ${req.params.userId}.`
          message: `user not exits....`,
          code:`404`
        });
        //res.send(err)
      } else {
        res.status(500).send({
          message: "Error retrieving getNotFollowingUser user with id " + req.params.userId
        });
      }

    } 
    else res.send(data);
  });

}




