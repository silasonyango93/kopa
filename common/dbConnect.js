var mysql = require("mysql");
var dbcredentials;

dbcredentials = {
  host: process.env.DB_HOST,
  user: "silas",
  password: "8032",
  database: "kopa",
  insecureAuth: true
};

var con = mysql.createConnection(dbcredentials);
con.on("error", err => {
  console.log("db error", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log(err);
  } else {
    //throw err;
  }
});

module.exports = con;
