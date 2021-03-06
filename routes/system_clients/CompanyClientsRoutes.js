/*SON/2018-11-06 00:29 - DEVELOPMENT
This class is the company_clients table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the
"CompanyClientsController" class
*/


const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/" });
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const CompanyClientsController = require("../../controllers/system_clients/CompanyClientsController.js");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.post("/upload_client_photo", upload.single("file"), function(req, res) {
  var file = __dirname + "/uploads/" + req.file.filename;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      console.log(req.file.filename);
    }
  });
});

router.get("/display_client_photo", (req, res) => {
  var imageID = req.query.imageID;
  res.send('<img src="/' + imageID + '">');
});

router.post("/add_company_clients", urlencodedParser, function(
  request,
  response
) {
  var date = new Date();
  date.setHours(date.getHours() + 3);
  var jsonObject_ = {
    ClientUniqueId: request.body.ClientUniqueId,
    ClientFirstName: request.body.ClientFirstName,
    ClientMiddleName: request.body.ClientMiddleName,
    ClientSurname: request.body.ClientSurname,
    ClientNationalId: request.body.ClientNationalId,
    ClientProfilePicName: request.body.ClientProfilePicName,
    GenderId: request.body.GenderId,
    ClientDOB: request.body.ClientDOB,
    ClientPhoneNumber: request.body.ClientPhoneNumber,
    ClientPhysicalAddress: request.body.ClientPhysicalAddress,
    ClientEmail: request.body.ClientEmail,
    EmploymentStatus: request.body.EmploymentStatus,
    EmploymentCategoryId: request.body.EmploymentCategoryId,
    Occupation: request.body.Occupation,
    EmploymentStation: request.body.EmploymentStation,
    ClientRegistrationDate: date
  };

  var myPromise = CompanyClientsController.insert(jsonObject_);

  myPromise.then(
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

router.post("/get_all_company_clients", urlencodedParser, function(
  request,
  response
) {
  var myPromise = CompanyClientsController.get_all_records();

  myPromise.then(
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

router.post("/get_specific_company_clients", urlencodedParser, function(
  request,
  response
) {
  var mKey = request.body.column_name;
  //var mValue=parseInt(request.query.search_value, 10);
  var mValue = request.body.search_value;

  var myPromise = CompanyClientsController.get_specific_records(mKey, mValue);

  myPromise.then(
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

router.post("/update_company_clients", urlencodedParser, function(
  request,
  response
) {
  var jsonObject_ = {
    ClientId: request.body.ClientId,
    ClientFirstName: request.body.ClientFirstName,
    ClientMiddleName: request.body.ClientMiddleName,
    ClientSurname: request.body.ClientSurname,
    ClientNationalId: request.body.ClientNationalId,
    ClientPhotoUrl: request.body.ClientPhotoUrl,
    ClientImageName: request.body.ClientImageName,
    GenderId: request.body.GenderId,
    ClientPhoneNumber: request.body.ClientPhoneNumber,
    ClientPhysicalAddress: request.body.ClientPhysicalAddress,
    ClientEmail: request.body.ClientEmail
  };

  var myPromise = CompanyClientsController.batch_update(jsonObject_);

  myPromise.then(
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
  "/update_company_clients_employment_details",
  urlencodedParser,
  function(request, response) {
    var column_name = request.body.ColumnName;
    var value_ = request.body.ColumnValue;

    var jsonObject_ = {
      EmploymentStatus: request.body.EmploymentStatus,
      EmploymentCategoryId: request.body.EmploymentCategoryId,
      Occupation: request.body.Occupation,
      EmploymentStation: request.body.EmploymentStation
    };

    var myPromise = CompanyClientsController.individual_record_update(
      column_name,
      value_,
      jsonObject_
    );

    myPromise.then(
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

router.post("/update_individual_company_clients", urlencodedParser, function(
  request,
  response
) {
  var column_name = request.body.ColumnName;
  var value_ = request.body.ColumnValue;

  var jsonObject_ = {
    ClientId: request.body.ClientId,
    ClientFirstName: request.body.ClientFirstName,
    ClientMiddleName: request.body.ClientMiddleName,
    ClientSurname: request.body.ClientSurname,
    ClientNationalId: request.body.ClientNationalId,
    ClientPhotoUrl: request.body.ClientPhotoUrl,
    ClientImageName: request.body.ClientImageName,
    GenderId: request.body.GenderId,
    ClientPhoneNumber: request.body.ClientPhoneNumber,
    ClientPhysicalAddress: request.body.ClientPhysicalAddress,
    ClientEmail: request.body.ClientEmail
  };

  var myPromise = CompanyClientsController.individual_record_update(
    column_name,
    value_,
    jsonObject_
  );

  myPromise.then(
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
  "/update_individual_company_clients_employment_details",
  urlencodedParser,
  function(request, response) {
    var column_name = request.body.ColumnName;
    var value_ = request.body.ColumnValue;

    var jsonObject_ = {
      EmploymentStatus: request.body.EmploymentStatus,
      EmploymentCategoryId: request.body.EmploymentCategoryId,
      Occupation: request.body.Occupation,
      EmploymentStation: request.body.EmploymentStation
    };

    var myPromise = CompanyClientsController.individual_record_update(
      column_name,
      value_,
      jsonObject_
    );

    myPromise.then(
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

router.post(
  "/update_individual_company_clients_encoded_image",
  urlencodedParser,
  function(request, response) {
    var column_name = request.body.ColumnName;
    var value_ = request.body.ColumnValue;

    var jsonObject_ = {
      EncodedImageString: request.body.EncodedImageString
    };

    var myPromise = CompanyClientsController.individual_record_update(
      column_name,
      value_,
      jsonObject_
    );

    myPromise.then(
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

router.post("/delete_individual_company_clients", urlencodedParser, function(
  request,
  response
) {
  var column_name = request.body.column_name;
  //var mValue=parseInt(request.body.search_value, 10);
  var value_ = request.body.search_value;

  var UserIdColumnName = request.body.UserIdColumnName;

  var UserId = request.body.UserId;

  var myPromise = CompanyClientsController.delete_user_specic_record(
    column_name,
    value_,
    UserIdColumnName,
    UserId
  );

  myPromise.then(
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
  "/get_number_of_company_clients_records",
  urlencodedParser,
  function(request, response) {
    var column_name = request.body.column_name;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_ = request.body.search_value;

    var myPromise = CompanyClientsController.get_number_of_records(
      column_name,
      value_
    );

    myPromise.then(
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

router.post("/company_clients_user_specific_query", urlencodedParser, function(
  request,
  response
) {
  var ColumnName = request.body.ColumnName;
  //var mValue=parseInt(request.body.search_value, 10);
  var value_ = request.body.value_;

  var UserIdColumnName = request.body.UserIdColumnName;

  var UserId = request.body.UserId;

  var myPromise = CompanyClientsController.user_specific_select_query(
    ColumnName,
    value_,
    UserIdColumnName,
    UserId
  );

  myPromise.then(
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

router.post("/client_any_search", urlencodedParser, function(
  request,
  response
) {
  var searchParameter = request.body.searchParameter;
  var myPromise = CompanyClientsController.searchClientsByAnyParameter(
    searchParameter
  );

  myPromise.then(
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
  "/get_a_companies_clients_with_pending_loans",
  urlencodedParser,
  function(request, response) {
    var companyId = request.body.companyId;
    var isFullyPaidStatus = request.body.isFullyPaidStatus;

    var myPromise = CompanyClientsController.getACompaniesClientsWithPendingLoans(
      companyId,
      isFullyPaidStatus
    );

    myPromise.then(
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
