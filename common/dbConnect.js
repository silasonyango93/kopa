var mysql = require("mysql");

const con = mysql.createPool({
  host: "mysql-db",
  user: "silas",
  password: "8032",
  database: "kopa",
  insecureAuth: true
});
setInterval(() => {
  con.query("SELECT 1", (err, rows) => {
    if (err) throw err;
  });
}, 1000);


module.exports = con;
