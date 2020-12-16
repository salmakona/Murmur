module.exports = app => {
    const follower = require("../controllers/follower.controller.js");
    // Create a new follower
    app.post("/api/follower", follower.create);
    app.get("/api/followerCount/:userId", follower.followerCount);
    app.get("/api/followingCount/:userId", follower.followingCount);


    // get following 
	app.get("/api/following/:userId", follower.getFollowing);

	  // get followers for user 
	app.get("/api/follower/:userId", follower.getFollower);


  
  };