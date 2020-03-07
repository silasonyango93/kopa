/*SON/2018-11-06 00:29 - DEVELOPMENT

This class is the users table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the 
"CompanyOwnersController" class

*/



const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const CompanyOwnersController = require("../../controllers/company_owners/CompanyOwnersController.js");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.post("/company_owner_registration", urlencodedParser, function(
  request,
  response
) {
  var date = new Date();
  date.setHours(date.getHours() + 3);

  var jsonObject_ = {
    OwnerFirstName: request.body.OwnerFirstName,
    OwnerMiddleName: request.body.OwnerMiddleName,
    OwnerSurname: request.body.OwnerSurname,
    OwnerNationalId: request.body.OwnerNationalId,
    OwnerPhoneNumber: request.body.OwnerPhoneNumber,
    OwnerEmail: request.body.OwnerEmail,
    GenderId: request.body.GenderId,
    Password: request.body.Password,
    OwnerRegisteredDate: date
  };

  var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.insert_users(
    jsonObject_
  );

  myCompanyOwnersControllerObjectPromise.then(
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

router.post("/company_owner_login", urlencodedParser, function(
  request,
  response
) {
  var jsonObject_ = {
    AttemptedEmail: request.body.AttemptedEmail,
    AttemptedPassword: request.body.AttemptedPassword
  };
  var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.user_login(
    jsonObject_
  );

  myCompanyOwnersControllerObjectPromise.then(
    function(result) {
      response.send(result);
    },
    function(err) {
      console.log(err);
      response.send("An error occurred");
    }
  );
});

router.post("/get_all_company_owners", urlencodedParser, function(
  request,
  response
) {
  var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.get_all_users();

  myCompanyOwnersControllerObjectPromise.then(
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
  date.setHours(date.getHours() + 3);

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

  var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.batch_users_update(
    jsonObject_
  );

  myCompanyOwnersControllerObjectPromise.then(
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

  var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.get_specific_users(
    mKey,
    mValue
  );

  myCompanyOwnersControllerObjectPromise.then(
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

  var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.individual_users_update(
    column_name,
    value_,
    jsonObject_
  );

  myCompanyOwnersControllerObjectPromise.then(
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

  var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.delete_users_record(
    column_name,
    value_
  );

  myCompanyOwnersControllerObjectPromise.then(
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

    var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.get_staff_members_with_a_specific_quality(
      TableTwo,
      JoiningKey,
      SearchColumn,
      SearchValue
    );

    myCompanyOwnersControllerObjectPromise.then(
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

router.post("/get_company_owner_company_details", urlencodedParser, function(
  request,
  response
) {
  var companyOwnerId = request.body.companyOwnerId;
  var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.getCompanyOwnersCompanyDetails(
    companyOwnerId
  );
  myCompanyOwnersControllerObjectPromise.then(
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
  "/get_all_company_owners_and_their_details",
  urlencodedParser,
  function(request, response) {
    var myCompanyOwnersControllerObjectPromise = CompanyOwnersController.getAllCompanyOwnersAndTheirDetails();
    myCompanyOwnersControllerObjectPromise.then(
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
