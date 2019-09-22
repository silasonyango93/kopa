/*SON/2018-11-06 00:29 - DEVELOPMENT
This class is the ownership_groups_company_owners_rship table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the 
"OwnershipGroupsCompanyOwnersRshipController" class
*/

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const OwnershipGroupsCompanyOwnersRshipController = require("../../controllers/company_owners/OwnershipGroupsCompanyOwnersRshipController.js");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.post("/add_ownership_groups_company_owners_rship", urlencodedParser, function(
    request,
    response
) {
    var jsonObject_ = {
        CompanyOwnershipGroupId: request.body.CompanyOwnershipGroupId,
        CompanyOwnerId: request.body.CompanyOwnerId,
    };

    var myPromise = OwnershipGroupsCompanyOwnersRshipController.insert(jsonObject_);

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

router.post("/get_all_ownership_groups_company_owners_rship", urlencodedParser, function(
    request,
    response
) {
    var myPromise = OwnershipGroupsCompanyOwnersRshipController.get_all_records();

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

router.post("/get_specific_ownership_groups_company_owners_rship", urlencodedParser, function(
    request,
    response
) {
    var mKey = request.body.column_name;
    //var mValue=parseInt(request.query.search_value, 10);
    var mValue = request.body.search_value;

    var myPromise = OwnershipGroupsCompanyOwnersRshipController.get_specific_records(mKey, mValue);

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

router.post("/update_ownership_groups_company_owners_rship", urlencodedParser, function(
    request,
    response
) {
    var jsonObject_ = {
        CompanyOwnershipGroupId: request.body.CompanyOwnershipGroupId,
        CompanyOwnerId: request.body.CompanyOwnerId,
    };

    var myPromise = OwnershipGroupsCompanyOwnersRshipController.batch_update(jsonObject_);

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

router.post("/update_individual_ownership_groups_company_owners_rship", urlencodedParser, function(
    request,
    response
) {
    var column_name = request.body.ColumnName;
    var value_ = request.body.ColumnValue;

    var jsonObject_ = {
        CompanyOwnershipGroupId: request.body.CompanyOwnershipGroupId,
        CompanyOwnerId: request.body.CompanyOwnerId,
    };

    var myPromise = OwnershipGroupsCompanyOwnersRshipController.individual_record_update(
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

router.post("/delete_individual_ownership_groups_company_owners_rship", urlencodedParser, function(
    request,
    response
) {
    var column_name = request.body.column_name;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_ = request.body.search_value;

    var UserIdColumnName = request.body.UserIdColumnName;

    var UserId = request.body.UserId;

    var myPromise = OwnershipGroupsCompanyOwnersRshipController.delete_user_specic_record(
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
    "/get_number_of_ownership_groups_company_owners_rship_records",
    urlencodedParser,
    function(request, response) {
        var column_name = request.body.column_name;
        //var mValue=parseInt(request.body.search_value, 10);
        var value_ = request.body.search_value;

        var myPromise = OwnershipGroupsCompanyOwnersRshipController.get_number_of_records(
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

router.post("/ownership_groups_company_owners_rship_user_specific_query", urlencodedParser, function(
    request,
    response
) {
    var ColumnName = request.body.ColumnName;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_ = request.body.value_;

    var UserIdColumnName = request.body.UserIdColumnName;

    var UserId = request.body.UserId;

    var myPromise = OwnershipGroupsCompanyOwnersRshipController.user_specific_select_query(
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
