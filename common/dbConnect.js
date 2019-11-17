var mysql = require("mysql");
var dbcredentials;

dbcredentials = {
  host: "mysql-db",
  user: "silas",
  password: "8032",
  database: "kopa",
  insecureAuth: true
};

const pool = mysql.createPool({
  host: "mysql-db",
  user: "silas",
  password: "8032",
  database: "kopa",
  insecureAuth: true
});
setInterval(() => {
  pool.query("SELECT 1", (err, rows) => {
    if (err) throw err;
  });
}, 1000);

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
