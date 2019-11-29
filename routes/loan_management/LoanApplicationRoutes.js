/*SON/2018-11-06 00:29 - DEVELOPMENT
This class is the loan_application table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the
"LoanApplicationController" class
*/

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const LoanApplicationController = require("../../controllers/loan_management/LoanApplicationController.js");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.post("/add_loan_application", urlencodedParser, function(
    request,
    response
) {
    var date = new Date();
    date.setHours(date.getHours() + 0);
    var jsonObject_ = {
        ClientId: request.body.ClientId,
        CompanyId: request.body.CompanyId,
        CompanyBranchId: request.body.CompanyBranchId,
        SystemUserId: request.body.SystemUserId,
        LoanAmount: request.body.LoanAmount,
        ExpectedSettlementDate: request.body.ExpectedSettlementDate,
        LoanRating: request.body.LoanRating,
        IsFullyPaid: request.body.IsFullyPaid,
        RemainingLoanAmount: request.body.RemainingLoanAmount,
        EmploymentStatus: request.body.EmploymentStatus,
        EmploymentCategoryId: request.body.EmploymentCategoryId,
        Occupation: request.body.Occupation,
        EmploymentStation: request.body.EmploymentStation,
        LoanApplicationDate: date
    };

    var myPromise = LoanApplicationController.insert(jsonObject_);

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

router.post("/get_all_loan_application", urlencodedParser, function(
    request,
    response
) {
    var myPromise = LoanApplicationController.get_all_records();

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

router.post("/get_specific_loan_application", urlencodedParser, function(
    request,
    response
) {
    var mKey = request.body.column_name;
    //var mValue=parseInt(request.query.search_value, 10);
    var mValue = request.body.search_value;

    var myPromise = LoanApplicationController.get_specific_records(mKey, mValue);

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

router.post("/update_loan_application", urlencodedParser, function(
    request,
    response
) {
    var jsonObject_ = {
        ClientId: request.body.ClientId,
        CompanyId: request.body.CompanyId,
        CompanyBranchId: request.body.CompanyBranchId,
        SystemUserId: request.body.SystemUserId,
        LoanAmount: request.body.LoanAmount,
        LoanApplicationDate: request.body.LoanApplicationDate,
        ExpectedSettlementDate: request.body.ExpectedSettlementDate,
        LoanRating: request.body.LoanRating,
        IsFullyPaid: request.body.IsFullyPaid,
        RemainingLoanAount: request.body.RemainingLoanAount,
        EmploymentStatus: request.body.EmploymentStatus,
        EmploymentCategoryId: request.body.EmploymentCategoryId,
        Occupation: request.body.Occupation,
        EmploymentStation: request.body.EmploymentStation,
    };

    var myPromise = LoanApplicationController.batch_update(jsonObject_);

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

router.post("/update_individual_loan_application", urlencodedParser, function(
    request,
    response
) {
    var column_name = request.body.ColumnName;
    var value_ = request.body.ColumnValue;

    var jsonObject_ = {
        ClientId: request.body.ClientId,
        CompanyId: request.body.CompanyId,
        CompanyBranchId: request.body.CompanyBranchId,
        SystemUserId: request.body.SystemUserId,
        LoanAmount: request.body.LoanAmount,
        LoanApplicationDate: request.body.LoanApplicationDate,
        ExpectedSettlementDate: request.body.ExpectedSettlementDate,
        LoanRating: request.body.LoanRating,
        IsFullyPaid: request.body.IsFullyPaid,
        RemainingLoanAount: request.body.RemainingLoanAount,
        EmploymentStatus: request.body.EmploymentStatus,
        EmploymentCategoryId: request.body.EmploymentCategoryId,
        Occupation: request.body.Occupation,
        EmploymentStation: request.body.EmploymentStation,
    };

    var myPromise = LoanApplicationController.individual_record_update(
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

router.post("/delete_individual_loan_application", urlencodedParser, function(
    request,
    response
) {
    var column_name = request.body.column_name;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_ = request.body.search_value;

    var UserIdColumnName = request.body.UserIdColumnName;

    var UserId = request.body.UserId;

    var myPromise = LoanApplicationController.delete_user_specic_record(
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
    "/get_number_of_loan_application_records",
    urlencodedParser,
    function(request, response) {
        var column_name = request.body.column_name;
        //var mValue=parseInt(request.body.search_value, 10);
        var value_ = request.body.search_value;

        var myPromise = LoanApplicationController.get_number_of_records(
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

router.post("/loan_application_user_specific_query", urlencodedParser, function(
    request,
    response
) {
    var ColumnName = request.body.ColumnName;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_ = request.body.value_;

    var UserIdColumnName = request.body.UserIdColumnName;

    var UserId = request.body.UserId;

    var myPromise = LoanApplicationController.user_specific_select_query(
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



router.post("/pending_loan_with_current_company", urlencodedParser, function(
  request,
  response
) {
    var clientId = request.body.clientId;
    var companyId = request.body.companyId;

    var myPromise = LoanApplicationController.getIfClientHasIncompleteLoanWithCurrentCompany(clientId,companyId);

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

module.exports = router;
