module.exports = app => {
    const follower = require("../controllers/follower.controller.js");
    // Create a new follower
    app.post("/api/follower", follower.create);
    // followers count by user id
    app.get("/api/followerCount/:userId", follower.followerCount);
    // following count by user id 
    app.get("/api/followingCount/:userId", follower.followingCount);


    // get following 
	app.get("/api/following/:userId", follower.getFollowing);

	  // get followers for user 
	app.get("/api/follower/:userId", follower.getFollower);


  
  };