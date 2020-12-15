module.exports = app => {
  const murmurs = require("../controllers/murmur.controller.js");

  // Create a new murmurs
  app.post("/api/murmur", murmurs.create);

  // Retrieve all murmurs
  app.get("/api/murmurs", murmurs.findAll);

  // Retrieve a single murmurs with userId
  app.get("/api/murmurs/:userId", murmurs.findByUserId);

   // remove a single murmurs with Id
  app.delete("/api/murmurs/:murmurId", murmurs.delete);

  app.post("/api/murmurs/like", murmurs.like);

  // get murmur for timeline
  app.get("/api/murmurs/:userId", murmurs.findMumurByUserId);

};