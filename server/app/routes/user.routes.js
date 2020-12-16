module.exports = app => {
    const user = require("../controllers/user.controller.js");

    app.get("/api/user/:userId", user.getUserById);

    // app.get("/api/murmurs/timeline/:userId/:page", murmurs.getTimelineMurmurs);
    app.get("/api/murmurs/profile/:userId/:page", user.getUserMurmurById);


	app.get("/api/user/all/:userId", user.getAlluser);

	// not following 
	app.get("/api/user/notfollowing/:userId", user.getNotFollowingUser);

  
  };