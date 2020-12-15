module.exports = app => {
    const follower = require("../controllers/follower.controller.js");
    // Create a new murmurs
    app.post("/api/follower", follower.create);
    app.get("/api/followerCount/:userId", follower.followerCount);
    app.get("/api/followedBYCount/:follower_user_id", follower.followedBYCount);
  
  };