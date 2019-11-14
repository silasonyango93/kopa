/*SON/2018-11-06 00:29 - DEVELOPMENT

This is the system's entry point.It creates
the database connection and port binding 
then initializes all the route files.

*/
//require('dotenv').config()
const mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path");
var fs = require("fs");
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/'});
var dbcredentials;
const CompanyClientsController = require("./controllers/system_clients/CompanyClientsController.js");
var cors = require("cors");
var port = 80;

app.use(cors());
dbcredentials = {
  host: '35.195.17.86',
  user: "silas",
  password: "8032",
  database: "kopa",
  insecureAuth: true
};

app.use(express.static("uploads"));

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

app.post('/add_company_clients', upload.single('file'), function(req, res) {
  var file = __dirname + '/uploads/' + req.file.filename;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {

      var date = new Date();
      date.setHours(date.getHours() + 0);
      var jsonObject_ = {
        ClientUniqueId: req.body.ClientUniqueId,
        ClientFirstName: req.body.ClientFirstName,
        ClientMiddleName: req.body.ClientMiddleName,
        ClientSurname: req.body.ClientSurname,
        ClientNationalId: req.body.ClientNationalId,
        ClientProfilePicName: req.file.filename,
        GenderId: req.body.GenderId,
        ClientDOB: req.body.ClientDOB,
        ClientPhoneNumber: req.body.ClientPhoneNumber,
        ClientPhysicalAddress: req.body.ClientPhysicalAddress,
        ClientEmail: req.body.ClientEmail,
        EmploymentStatus: req.body.EmploymentStatus,
        EmploymentCategoryId: req.body.EmploymentCategoryId,
        Occupation: req.body.Occupation,
        EmploymentStation: req.body.EmploymentStation,
        ClientRegistrationDate: date
      };

      var myPromise = CompanyClientsController.insert(jsonObject_);

      myPromise.then(
        function(result) {
          var response_object = { results: result };
          res.send(response_object);
        },
        function(err) {
          console.log(err);
          res.send("An error occurred");
        }
      );
    }
  });
});

app.get("/display_image", (req, res) => {
  //res.sendFile(path.join(__dirname, "./uploads/df37ba09d301ed7e28a5ac7bdbd36a92"));
  var imageID = req.query.imageID;
  res.send('<img src="/' + imageID + '">');

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

var port = 80;

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
