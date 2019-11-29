/*SON/2018-11-06 00:29 - DEVELOPMENT
This class is the loan_repayment_installments table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the 
"LoanRepaymentInstallmentsController" class
*/

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const LoanRepaymentInstallmentsController = require("../../controllers/loan_management/LoanRepaymentInstallmentsController.js");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.post("/add_loan_repayment_installments", urlencodedParser, function(
    request,
    response
) {
  var date = new Date();
  date.setHours(date.getHours() + 0);
    var jsonObject_ = {
        LoanApplicationId: request.body.LoanApplicationId,
        InstallmentAmount: request.body.InstallmentAmount,
        InstallmentDate: date
    };

    var myPromise = LoanRepaymentInstallmentsController.insert(jsonObject_);

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

router.post("/get_all_loan_repayment_installments", urlencodedParser, function(
    request,
    response
) {
    var myPromise = LoanRepaymentInstallmentsController.get_all_records();

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

router.post("/get_specific_loan_repayment_installments", urlencodedParser, function(
    request,
    response
) {
    var mKey = request.body.column_name;
    //var mValue=parseInt(request.query.search_value, 10);
    var mValue = request.body.search_value;

    var myPromise = LoanRepaymentInstallmentsController.get_specific_records(mKey, mValue);

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

router.post("/update_loan_repayment_installments", urlencodedParser, function(
    request,
    response
) {
    var jsonObject_ = {
        LoanApplicationId: request.body.LoanApplicationId,
        InstallmentAmount: request.body.InstallmentAmount,
        InstallmentDate: request.body.InstallmentDate
    };

    var myPromise = LoanRepaymentInstallmentsController.batch_update(jsonObject_);

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

router.post("/update_individual_loan_repayment_installments", urlencodedParser, function(
    request,
    response
) {
    var column_name = request.body.ColumnName;
    var value_ = request.body.ColumnValue;

    var jsonObject_ = {
        LoanApplicationId: request.body.LoanApplicationId,
        InstallmentAmount: request.body.InstallmentAmount,
        InstallmentDate: request.body.InstallmentDate
    };

    var myPromise = LoanRepaymentInstallmentsController.individual_record_update(
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

router.post("/delete_individual_loan_repayment_installments", urlencodedParser, function(
    request,
    response
) {
    var column_name = request.body.column_name;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_ = request.body.search_value;

    var UserIdColumnName = request.body.UserIdColumnName;

    var UserId = request.body.UserId;

    var myPromise = LoanRepaymentInstallmentsController.delete_user_specic_record(
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
    "/get_number_of_loan_repayment_installments_records",
    urlencodedParser,
    function(request, response) {
        var column_name = request.body.column_name;
        //var mValue=parseInt(request.body.search_value, 10);
        var value_ = request.body.search_value;

        var myPromise = LoanRepaymentInstallmentsController.get_number_of_records(
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

router.post("/loan_repayment_installments_user_specific_query", urlencodedParser, function(
    request,
    response
) {
    var ColumnName = request.body.ColumnName;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_ = request.body.value_;

    var UserIdColumnName = request.body.UserIdColumnName;

    var UserId = request.body.UserId;

    var myPromise = LoanRepaymentInstallmentsController.user_specific_select_query(
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

module.exports = router;
