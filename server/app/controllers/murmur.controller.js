const Murmur = require("../models/murmur.model.js");
const MurmurLike = require("../models/murmurlike.model.js");

exports.create = (req, res) => {

    console.log("HEllo Hello from post")

    console.log(req.body)

    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a murmur
    const murmur = new Murmur({
      user_id: req.body.user_id,
      murmur_content: req.body.murmur_content,
      creation_date:req.body.creation_date

    });
    console.log("Murmur")
    // Save Murmur in the database
    Murmur.create(murmur, (err, data) => {

        console.log("murmur2")

        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the murmur."
        });
        else 
        res.send(data);
});

  
};

// Retrieve all murmurs from the database.
exports.findAll = (req, res) => {

  console.log("Find all")

    Murmur.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Murmur."
          });
        else res.send(data);
      });
  
};


// Retrieve all murmurs from the database.
exports.findByUserId = (req, res) => {

  console.log(req.params.userId);

  console.log("Find by user ID");

  Murmur.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found murmur with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving murmur with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
  
};



// Delete a murmur with the specified Id in the request
exports.delete = (req, res) => {

  Murmur.remove(req.params.murmurId, (err, data) => {
  
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Murmur with id ${req.params.murmurId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Murmur with id " + req.params.murmurId
          });
        }
      } else res.send({ message: `Murmur was deleted successfully!` });
    });
  

};


// like a murmur by user

exports.like = (req,res) =>{



  console.log("HEllo From MurMUrlike")

  console.log(req.body)

  // Validate request
  if (!req.body) {
      res.status(400).send({
      message: "Content can not be empty!"
      });
  }

  // Create a like
  var body = {
      user_id: req.body.user_id,
      mumur_id: req.body.mumur_id
    }
 
  console.log("mumurLike1")
  // Save follower in the database
  MurmurLike.create(body, (err, data) => {

      console.log("like2")

      if (err)
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the like."
      });
      else 
      res.send(data);
});




}


exports.findMumurByUserId = (req, res) => {

  console.log(req.params.userId);

  console.log("Find by user ID");

  Murmur.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found murmur with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving murmur with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
  
};

exports.getTimelineMurmurs = (req,res) => {


  console.log(req.params.userId);
   console.log(req.params.page);
  //console.log(req.query.page);

  console.log("Timeline user ID");

  Murmur.getTimelineMurmurs(req.params.userId,req.params.page, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found murmur with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving murmur with id " + req.params.userId
        });
      }
    } else res.send(data);
  });

}


exports.findByMurmurId = (req,res) =>{

  console.log(req.params.murmurId);

  console.log("Find by Murmur ID");

  Murmur.findByMurmurId(req.params.murmurId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found murmur with id ${req.params.murmurId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving murmur with id " + req.params.murmurId
        });
      }
    } else res.send(data);
  });

}




