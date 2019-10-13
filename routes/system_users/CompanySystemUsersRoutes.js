/*SON/2018-11-06 00:29 - DEVELOPMENT

This class is the users table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the 
"CompanySystemUsersController" class

*/

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const CompanySystemUsersController = require("../../controllers/system_users/CompanySystemUsersController.js");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.post("/system_user_registration", urlencodedParser, function(
  request,
  response
) {
  var date = new Date();
  date.setHours(date.getHours() + 0);

  var jsonObject_ = {
    CompanyBranchId: request.body.CompanyBranchId,
    UserFirstName: request.body.UserFirstName,
    UserMiddleName: request.body.UserMiddleName,
    UserSurname: request.body.UserSurname,
    GenderId: request.body.GenderId,
    StaffNo: request.body.StaffNo,
    UserNationalId: request.body.UserNationalId,
    UserEmail: request.body.UserEmail,
    UserPhoneNumber: request.body.UserPhoneNumber,
    UserPhysicalAddress: request.body.UserPhysicalAddress,
    Password: request.body.Password,
    UserRegistrationDate: date
  };

  var myCompanySystemUsersControllerObjectPromise = CompanySystemUsersController.insert_users(
    jsonObject_
  );

  myCompanySystemUsersControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      console.log(err);
      response.send("An error occurred");
    }
  );
});

router.get("/signup", function(req, res) {
  res.sendFile(__dirname + "/" + "form.html");
});

router.get("/admin_login", function(req, res) {
  res.sendFile(__dirname + "/" + "login_form.html");
});

router.post("/System_user_login", urlencodedParser, function(
  request,
  response
) {
  var jsonObject_ = {
    AttemptedEmail: request.body.AttemptedEmail,
    AttemptedPassword: request.body.AttemptedPassword
  };

  var myCompanySystemUsersControllerObjectPromise = CompanySystemUsersController.user_login(
    jsonObject_
  );

  myCompanySystemUsersControllerObjectPromise.then(
    function(result) {
      response.send(result);
    },
    function(err) {
      console.log(err);
      response.send("An error occurred");
    }
  );
});

router.post("/get_all_users", urlencodedParser, function(request, response) {
  var myCompanySystemUsersControllerObjectPromise = CompanySystemUsersController.get_all_users();

  myCompanySystemUsersControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      console.log(err);
      response.send("An error occurred");
    }
  );
});

router.post("/update_users", urlencodedParser, function(request, response) {
  var date = new Date();
  date.setHours(date.getHours() + 0);

  var jsonObject_ = {
    FirstName: request.body.FirstName,
    MiddleName: request.body.MiddleName,
    SurName: request.body.SurName,
    JobRefNo: request.body.JobRefNo,
    DOB: request.body.DOB,
    Gender: request.body.Gender,
    UserEmail: request.body.UserEmail,
    PhoneNumber: request.body.PhoneNumber,
    PhysicalAddress: request.body.PhysicalAddress,
    WardId: request.body.WardId,
    Password: request.body.Password,
    RegistrationDate: date
  };

  var myCompanySystemUsersControllerObjectPromise = CompanySystemUsersController.batch_users_update(
    jsonObject_
  );

  myCompanySystemUsersControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      response.send("An error occurred");
      console.log(err);
    }
  );
});

router.post("/get_specific_users", urlencodedParser, function(
  request,
  response
) {
  var mKey = request.body.column_name;
  //var mValue=parseInt(request.query.search_value, 10);
  var mValue = request.body.search_value;

  var myCompanySystemUsersControllerObjectPromise = CompanySystemUsersController.get_specific_users(
    mKey,
    mValue
  );

  myCompanySystemUsersControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      response.send("An error occurred");
      console.log(err);
    }
  );
});

router.post("/update_individual_users", urlencodedParser, function(
  request,
  response
) {
  var column_name = request.body.ColumnName;
  var value_ = request.body.ColumnValue;

  var date = new Date();
  date.setHours(date.getHours() + 0);

  var jsonObject_ = {
    FirstName: request.body.FirstName,
    MiddleName: request.body.MiddleName,
    SurName: request.body.SurName,
    JobRefNo: request.body.JobRefNo,
    DOB: request.body.DOB,
    Gender: request.body.Gender,
    UserEmail: request.body.UserEmail,
    PhoneNumber: request.body.PhoneNumber,
    PhysicalAddress: request.body.PhysicalAddress,
    WardId: request.body.WardId,
    Password: request.body.Password,
    RegistrationDate: date
  };

  var myCompanySystemUsersControllerObjectPromise = CompanySystemUsersController.individual_users_update(
    column_name,
    value_,
    jsonObject_
  );

  myCompanySystemUsersControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      response.send("An error occurred");
      console.log(err);
    }
  );
});

router.post("/delete_individual_users", urlencodedParser, function(
  request,
  response
) {
  var column_name = request.body.column_name;
  //var mValue=parseInt(request.body.search_value, 10);
  var value_ = request.body.search_value;

  var myCompanySystemUsersControllerObjectPromise = CompanySystemUsersController.delete_users_record(
    column_name,
    value_
  );

  myCompanySystemUsersControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      response.send("An error occurred");
      console.log(err);
    }
  );
});

router.post(
  "/get_staff_members_with_a_specific_quality",
  urlencodedParser,
  function(request, response) {
    var TableTwo = request.body.TableTwo;

    var JoiningKey = request.body.JoiningKey;

    var SearchColumn = request.body.SearchColumn;

    var SearchValue = request.body.SearchValue;

    var myCompanySystemUsersControllerObjectPromise = CompanySystemUsersController.get_staff_members_with_a_specific_quality(
      TableTwo,
      JoiningKey,
      SearchColumn,
      SearchValue
    );

    myCompanySystemUsersControllerObjectPromise.then(
      function(result) {
        var response_object = { results: result };
        response.send(response_object);
      },
      function(err) {
        response.send("An error occurred");
        console.log(err);
      }
    );
  }
);

module.exports = router;
