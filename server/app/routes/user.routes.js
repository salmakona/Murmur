module.exports = app => {
    const user = require("../controllers/user.controller.js");

    app.get("/api/user/:userId", user.getUserById);
    app.get("/api/all/:userId", user.getUserMurmurById);
	app.get("/api/user/all/:userId", user.getAlluser);

  
  };