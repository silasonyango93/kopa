/*SON/2018-11-06 00:29 - DEVELOPMENT
This class is the customer_registration table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the
"CustomerRegistrationController" class
*/


const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/" });
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const CustomerRegistrationController = require("../../controllers/system_clients/CustomerRegistrationController.js");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});


router.post("/add_customer_registration", urlencodedParser, function(
  request,
  response
) {
  var date = new Date();
  date.setHours(date.getHours() + 3);
  var jsonObject_ = {
    SessionLogId: request.body.SessionLogId,
    ClientId: request.body.ClientId,
    CustomerRegistrationDate: date
  };

  var myPromise = CustomerRegistrationController.insert(jsonObject_);

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

router.post("/get_all_customer_registration", urlencodedParser, function(
  request,
  response
) {
  var myPromise = CustomerRegistrationController.get_all_records();

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

router.post("/get_specific_customer_registration", urlencodedParser, function(
  request,
  response
) {
  var mKey = request.body.column_name;
  //var mValue=parseInt(request.query.search_value, 10);
  var mValue = request.body.search_value;

  var myPromise = CustomerRegistrationController.get_specific_records(mKey, mValue);

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

router.post("/update_customer_registration", urlencodedParser, function(
  request,
  response
) {
  var jsonObject_ = {
    SessionLogId: request.body.SessionLogId,
    ClientId: request.body.ClientId,
    CustomerRegistrationDate: date
  };

  var myPromise = CustomerRegistrationController.batch_update(jsonObject_);

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
  "/update_customer_registration_employment_details",
  urlencodedParser,
  function(request, response) {
    var column_name = request.body.ColumnName;
    var value_ = request.body.ColumnValue;

    var jsonObject_ = {
      SessionLogId: request.body.SessionLogId,
      ClientId: request.body.ClientId,
      CustomerRegistrationDate: date
    };

    var myPromise = CustomerRegistrationController.individual_record_update(
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

router.post("/update_individual_customer_registration", urlencodedParser, function(
  request,
  response
) {
  var column_name = request.body.ColumnName;
  var value_ = request.body.ColumnValue;

  var jsonObject_ = {
    SessionLogId: request.body.SessionLogId,
    ClientId: request.body.ClientId,
    CustomerRegistrationDate: date
  };

  var myPromise = CustomerRegistrationController.individual_record_update(
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



router.post("/delete_individual_customer_registration", urlencodedParser, function(
  request,
  response
) {
  var column_name = request.body.column_name;
  //var mValue=parseInt(request.body.search_value, 10);
  var value_ = request.body.search_value;

  var UserIdColumnName = request.body.UserIdColumnName;

  var UserId = request.body.UserId;

  var myPromise = CustomerRegistrationController.delete_user_specic_record(
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
  "/get_number_of_customer_registration_records",
  urlencodedParser,
  function(request, response) {
    var column_name = request.body.column_name;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_ = request.body.search_value;

    var myPromise = CustomerRegistrationController.get_number_of_records(
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

router.post("/customer_registration_user_specific_query", urlencodedParser, function(
  request,
  response
) {
  var ColumnName = request.body.ColumnName;
  //var mValue=parseInt(request.body.search_value, 10);
  var value_ = request.body.value_;

  var UserIdColumnName = request.body.UserIdColumnName;

  var UserId = request.body.UserId;

  var myPromise = CustomerRegistrationController.user_specific_select_query(
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
  var myPromise = CustomerRegistrationController.searchClientsByAnyParameter(
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

    var myPromise = CustomerRegistrationController.getACompaniesClientsWithPendingLoans(
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
