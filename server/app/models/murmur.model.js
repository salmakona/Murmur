const sql = require("./db.js");

// constructor
const Murmur = function(murmur) {
  this.user_id = murmur.user_id;
  this.murmur_content = murmur.murmur_content;
  this.creation_date = murmur.creation_date;
};

Murmur.create = (newMurmur, result) => {
  console.log("MURMUR")
  sql.query("INSERT INTO murmurs SET ?", newMurmur, (err, res) => {
    if (err) {
      console.log("ERROR_MURMUR")
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created murmur: ", { id: res.insertId, ...newMurmur });
    result(null, { id: res.insertId, ...newMurmur });
  });
};


Murmur.getAll = result => {
  sql.query("SELECT * FROM murmurs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("murmurs: ", res);
    result(null, res);
  });
};


Murmur.findByUserId = (userId, result) => {
  console.log(userId)
  sql.query(`SELECT * FROM murmurs WHERE user_id = ${userId}`, (err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Murmur: ", res);
      result(null, res);
      return;
    }

    // not found Murmur with the id
    result({ kind: "not_found" }, null);
  });
};

// remove mumur by mumurId
Murmur.remove = (murmurid, result)=>{
  console.log("Murmur"+murmurid);

  sql.query(`DELETE FROM murmurs WHERE id =  ${murmurid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Murmur with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Murmur with id: ", murmurid);
    result(null, res);
  });

}


Murmur.findMumurByUserId = (userId, result) => {
  
  console.log(userId)
  sql.query(`SELECT * FROM murmurs WHERE user_id = ${userId}`, (err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Murmur: ", res);
      result(null, res);
      return;
    }

    // not found Murmur with the id
    result({ kind: "not_found" }, null);
  });
};


Murmur.getTimelineMurmurs = (userId,page, result) => {  
  console.log(userId)
  var page = (page-1)*10;
  sql.query(`SELECT u.full_name, u.user_name, m.*,
   (SELECT count(*) from likes WHERE likes.mumur_id = m.id) as like_count FROM users u,
    murmurs m where u.id = m.user_id and u.id IN (SELECT id FROM users WHERE id IN 
    (select user_id from followers WHERE follower_user_id = ${userId}) or id = ${userId}) 
    order by m.id desc LIMIT ${page},10`,
     (err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Murmur: ", res);
      result(null, res);
      return;
    }

    // not found Murmur with the id
    result({ kind: "not_found" }, null);
  });
};

Murmur.findByMurmurId = (murmurId, result) => { 
  console.log(murmurId+"Hello")
    sql.query(`SELECT u.full_name, u.user_name, m.*, (SELECT count(*) from likes WHERE likes.mumur_id = m.id) as like_count FROM users u, murmurs m where u.id = m.user_id and m.id=${murmurId}`,
     (err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Murmur: ", res);
      result(null, res);
      return;
    }

    // not found Murmur with the id
    result({ kind: "not_found" }, null);
  });

}



module.exports = Murmur;