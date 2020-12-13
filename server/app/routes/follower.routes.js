module.exports = app => {
    const follower = require("../controllers/follower.controller.js");
    // Create a new murmurs
    app.post("/follower", follower.create);
    app.get("/followerCount/:userId", follower.followerCount);
    app.get("/followedBYCount/:follower_user_id", follower.followedBYCount);
  
  };