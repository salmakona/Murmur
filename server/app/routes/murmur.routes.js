module.exports = app => {
  const murmurs = require("../controllers/murmur.controller.js");

  // Create a new murmurs
  app.post("/api/murmur", murmurs.create);

  // Retrieve all murmurs
  app.get("/api/murmurs", murmurs.findAll);

  // Retrieve a single murmurs with userId for profile page
  app.get("/api/murmurs/:userId", murmurs.findByUserId);

   // remove a single murmurs with Id from profile page 
  app.delete("/api/murmurs/:murmurId", murmurs.delete);

  app.post("/api/murmurs/like", murmurs.like);

  // get murmurs by userid
  app.get("/api/murmurs/:userId", murmurs.findMumurByUserId);

  //get murmurs for timeline page

  app.get("/api/murmurs/timeline/:userId/:page", murmurs.getTimelineMurmurs);

  // get murmurs with user and like by murmur id
  app.get("/api/murmurs/murmurId/:murmurId", murmurs.findByMurmurId);


};