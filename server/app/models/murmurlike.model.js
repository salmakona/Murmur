const sql = require("./db.js");

// constructor
const MurmurLike = function(murmurLike) {
  this.mumur_id = murmurLike.mumur_id;
  this.user_id = murmurLike.user_id;
};



MurmurLike.create = (newLike, result) => {
  console.log(newLike)

    sql.query(`SELECT * FROM likes WHERE user_id = ${newLike.user_id} and mumur_id= ${newLike.mumur_id}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("found like by ID: ", res);

            sql.query(`DELETE FROM likes WHERE user_id =  ${newLike.user_id} and mumur_id = ${newLike.mumur_id}`, (err, res) => {
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
                result(null, { kind: "deleted Like  for murmur id :"+ newLike.mumur_id });
              });
          }else{
                console.log(" Insert Like")
                sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
                if (err) {
                    console.log("InsertLikerError")
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created Like: ", { id: res.insertId, ...newLike });
                result(null, { id: res.insertId, ...newLike });
                });
            }
        });
  };


module.exports = MurmurLike;