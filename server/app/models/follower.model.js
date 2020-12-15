const sql = require("./db.js");

// constructor
const Follower = function(follower) {
  this.follower_user_id = follower.follower_user_id;
  this.user_id = follower.user_id;
};

Follower.create = (newFollower, result) => {

  console.log(newFollower);

    sql.query(`SELECT * FROM followers WHERE follower_user_id = ${newFollower.follower_user_id} and user_id= ${newFollower.user_id}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
          }
          if (res.length) {
            //found followers by ID:  [ RowDataPacket { id: 35, user_id: 5, follower_user_id: 1 } ]
            console.log("found followers by ID: ", res[0].id);
             sql.query(`DELETE FROM followers WHERE id = ${res[0].id}`, (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
                }
                if (res.affectedRows == 0) {
                  // not found i with the id
                  result({ kind: "not_found" }, null);
                  return;
                }{
                    console.log("Deletec followers")
                }
                result(null, { kind: "deleted follower id :"+ newFollower.user_id });
              });
          }
          else{
                console.log(" Insert Follower")
                sql.query("INSERT INTO followers SET ?", newFollower, (err, res) => {
                if (err) {
                    console.log("InsertFollowerError")
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created Follower: ", { id: res.insertId, ...newFollower });
                result(null, { id: res.insertId, ...newFollower });
                });
            }
        });
  };


//   Follower.find=(user_id,follower_user_id,result)=>{

//     console.log(user_id)
//     sql.query(`SELECT * FROM followers WHERE user_id = ${user_id} and follower_user_id= ${follower_user_id}`, (err, res) => {
//         if (err) {
//             console.log("error:", err);
//             result(err, null);
//             return;
//           }
//           if (res.length) {
//             console.log("found followers by ID: ", res);
//             result(null, res);
//             return;
//           }
//           // not found follower with the id
//           result({ kind: "not_found" }, null);
//         });
//     }

    // Follower.insert=(user_id,follower_user_id,result)=>{

    //     console.log(" Insert Follower")
    //     sql.query("INSERT INTO followers SET ?", newFollower, (err, res) => {
    //     if (err) {
    //         console.log("ERRORFollower")
    //         console.log("error: ", err);
    //         result(err, null);
    //         return;
    //     }
    //     console.log("created Follower: ", { id: res.insertId, ...newFollower });
    //     result(null, { id: res.insertId, ...newFollower });
    //     });

    // }




    // Follower.remove =(user_id,follower_user_id) =>{
    //     sql.query(`DELETE FROM followers WHERE user_id =  ${user_id} and follower_user_id = ${follower_user_id}`, (err, res) => {
    //         if (err) {
    //           console.log("error: ", err);
    //           result(null, err);
    //           return;
    //         }
    //         if (res.affectedRows == 0) {
    //           // not found i with the id
    //           result({ kind: "not_found" }, null);
    //           return;
    //         }
    //         result(null, res);
    //       });
    
    //   };

  Follower.followerCount= (user_id,result)=>{
    sql.query(`SELECT COUNT(*) as count FROM followers WHERE follower_user_id = ${user_id}`, (err, res) => {
        console.log(res);
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("found followers: ", res);
            result(null, res[0]);
            return;
          }
          // not found Murmur with the id
          result({ kind: "not_found" }, null);
      });

  };



  Follower.followingCount= (user_id,result)=>{
    sql.query(`SELECT COUNT(*) as count FROM followers WHERE user_id = ${user_id}`, (err, res) => {
        console.log(res);
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("found following: ", res);
            result(null, res[0]);
            return;
          }
          // not found Murmur with the id
          result({ kind: "not_found" }, null);
      });

  };

  Follower.getFollowing = (userId,result) =>{

    console.log(userId)
    sql.query(`SELECT * FROM users WHERE id IN (select user_id from followers where follower_user_id = ${userId})`, (err, res) => {

      console.log(res)
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found followers: ", res);
        result(null, res);
        return;
      }

      // not found Murmur with the id
      result({ kind: "not_found" }, null);
    });

  }



module.exports = Follower;