/*SON/2018-11-06 00:29 - DEVELOPMENT
This class is the SessionLogs's controller class.
It receives calls from the "SessionLogsRoutes" class and
passes the calls down to the "SessionLogsModel" class
*/

const SessionLogsModel = require("../../models/common_utilities/SessionLogsModel.js");

module.exports = class SessionLogsController {
    constructor() {}

    static insert(jsonObject_) {
        return new Promise(function(resolve, reject) {
            var myPromise = SessionLogsModel.insert(jsonObject_);

            myPromise.then(
                function(result) {
                    resolve(result);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }

    static get_all_records() {
        return new Promise(function(resolve, reject) {
            var myPromise = SessionLogsModel.get_all_records();

            myPromise.then(
                function(result) {
                    resolve(result);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }

    static get_specific_records(ColumnName, value_) {
        return new Promise(function(resolve, reject) {
            var myPromise = SessionLogsModel.get_specific_records(ColumnName, value_);

            myPromise.then(
                function(result) {
                    resolve(result);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }

    static batch_update(jsonObject_) {
        return new Promise(function(resolve, reject) {
            var myPromise = SessionLogsModel.batch_update(jsonObject_);

            myPromise.then(
                function(result) {
                    resolve(result);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }

    static individual_record_update(ColumnName, value_, jsonObject_) {
        return new Promise(function(resolve, reject) {
            var myPromise = SessionLogsModel.individual_record_update(
                ColumnName,
                value_,
                jsonObject_
            );

            myPromise.then(
                function(result) {
                    resolve(result);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }

    static delete_user_specic_record(
        ColumnName,
        value_,
        UserIdColumnName,
        UserId
    ) {
        return new Promise(function(resolve, reject) {
            var myPromise = SessionLogsModel.delete_user_specic_record(
                ColumnName,
                value_,
                UserIdColumnName,
                UserId
            );

            myPromise.then(
                function(result) {
                    resolve(result);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }

    static get_number_of_records(ColumnName, value_) {
        return new Promise(function(resolve, reject) {
            var myPromise = SessionLogsModel.get_number_of_records(ColumnName, value_);

            myPromise.then(
                function(result) {
                    resolve(result);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }

    static user_specific_select_query(
        ColumnName,
        value_,
        UserIdColumnName,
        UserId
    ) {
        return new Promise(function(resolve, reject) {
            var myPromise = SessionLogsModel.user_specific_select_query(
                ColumnName,
                value_,
                UserIdColumnName,
                UserId
            );

            myPromise.then(
                function(result) {
                    resolve(result);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }
};
