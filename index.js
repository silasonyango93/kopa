/*SON/2018-11-06 00:29 - DEVELOPMENT

This is the system's entry point.It creates
the database connection and port binding 
then initializes all the route files.

*/

const mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path");
var dbcredentials;
var cors = require("cors");
var port = process.env.PORT || 5000;

app.use(cors());
dbcredentials = {
  host: process.env.DB_HOST,
  user: "silas",
  password: "8032",
  database: "kopa",
  insecureAuth: true
};

app.use(express.static("public"));

var con;
app.use((req, res, next) => {
  con = mysql.createConnection(dbcredentials);
  con.on("error", err => {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log(err);
    } else {
      //throw err;
    }
  });
  console.log("Connection established");

  next();
});

/*SON/2019-1-04 11:50 - DEVELOPMENT : Start User Management*/

app.use(require("./routes/company_owners/CompanyOwnersRoutes.js"));

/*SON/2019-1-04 11:50 - DEVELOPMENT : End User Management*/

/*SON/2019-1-04 11:50 - DEVELOPMENT : Start company ownership groups Management*/

app.use(require("./routes/ownership_groups/CompanyOwnershipGroupsRoutes.js"));
app.use(
  require("./routes/company_owners/OwnershipGroupsCompanyOwnersRshipRoutes.js")
);

/*SON/2019-1-04 11:50 - DEVELOPMENT : End User Management*/

/*SON/2019-1-04 11:50 - DEVELOPMENT : Start User Management*/

app.use(require("./routes/companies/CompanyBranchesRoutes.js"));
app.use(require("./routes/companies/CompaniesRoutes.js"));
app.use(require("./routes/system_clients/CompanyClientsRoutes.js"));

/*SON/2019-1-04 11:50 - DEVELOPMENT : End User Management*/

/*SON/2019-1-04 11:50 - DEVELOPMENT : Start Common Utilities*/

app.use(require("./routes/common_utilities/GenderRoutes.js"));
app.use(require("./routes/common_utilities/SessionLogs.js"));
app.use(require("./routes/common_utilities/EmploymentCategoriesRoutes.js"));

/*SON/2019-1-04 11:50 - DEVELOPMENT : End Common Utilities*/

/*SON/2019-1-04 11:50 - DEVELOPMENT : Start Common Utilities*/

app.use(require("./routes/loan_management/LoanApplicationRoutes.js"));
app.use(require("./routes/loan_management/LoanRepaymentInstallmentsRoutes.js"));

/*SON/2019-1-04 11:50 - DEVELOPMENT : End Common Utilities*/

/*SON/2019-1-04 11:50 - DEVELOPMENT : Start System Admin*/

app.use(require("./routes/system_admin/SystemAdminRoutes.js"));

/*SON/2019-1-04 11:50 - DEVELOPMENT : End System Admin*/

/*SON/2019-1-04 11:50 - DEVELOPMENT : Start System Admin*/

app.use(require("./routes/system_users/CompanySystemUsersRoutes.js"));

/*SON/2019-1-04 11:50 - DEVELOPMENT : End System Admin*/

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});
