module.exports = app => {
    const user = require("../controllers/user.controller.js");
    //all users 
    app.get("/api/user/:userId", user.getUserById);

    // murmurs by usser id with pagination 
    app.get("/api/murmurs/profile/:userId/:page", user.getUserMurmurById);

    //all follower users by user id 
	app.get("/api/user/all/:userId", user.getAlluser);

	// not following who is not following 
	app.get("/api/user/notfollowing/:userId", user.getNotFollowingUser);

  
  };