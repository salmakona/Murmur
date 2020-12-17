const sql = require("./db.js");
const User = function(user) {
  this.user_name = user.user_name;
  this.full_name = user.full_name;
  this.email = user.email;
  this.password = user.password;
  this.about_me = user.about_me,
  this.join_date = user.join_date
};


User.getUserByID = (userId, result) => {
  console.log(userId)
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


User.getUserMurmurById = (userId,page, result) => {
   var page = (page-1)*10;
   
  sql.query(`SELECT u.full_name, u.user_name, 
    m.*, (SELECT count(*) from likes where likes.mumur_id = m.id) 
    as like_count FROM users u, murmurs m where u.id = m.user_id and u.id = ${userId} 
    order by m.id desc LIMIT ${page},10`, (err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


User.getAlluser = (userId, result) => {
  console.log(userId)
  sql.query(`SELECT * FROM users WHERE id != ${userId}`, (err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


User.getNotFollowingUser = (userId, result) => {
  console.log(userId)
  sql.query(`SELECT u.id,u.user_name, u.full_name FROM users u where u.id NOT IN (select user_id from followers where follower_user_id = ${userId}) AND u.id <> ${userId}`, (err, res) => {
    console.log(res);

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};





module.exports = User;
