module.exports = app => {
  const murmurs = require("../controllers/murmur.controller.js");

  // Create a new murmurs
  app.post("/murmur", murmurs.create);

  // Retrieve all murmurs
  app.get("/murmurs", murmurs.findAll);

  // Retrieve a single murmurs with userId
  app.get("/murmurs/:userId", murmurs.findByUserId);

   // remove a single murmurs with Id
  app.delete("/murmurs/:murmurId", murmurs.delete);

  app.post("/murmurs/like", murmurs.like);

  // get murmur for timeline
  app.get("/murmurs/:userId", murmurs.findMumurByUserId);

};