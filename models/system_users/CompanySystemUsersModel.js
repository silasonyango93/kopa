/*SON/2018-11-06 00:29 - DEVELOPMENT

This class is the "company_owners" table's model
class.It receives any CRUD operation
requests and hands the over to class
ModelMaster.It creates an instance of class
ModelMaster then passes parameters to its
functions.

*/

const ModelMaster = require("../ModelMaster.js");
const TableName = "company_system_users";

module.exports = class CompanySystemUsersModel {
  constructor() {}

  static insert_users(jsonObject_) {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.insert(TableName, jsonObject_);

      myModelMasterPromise.then(
        function(result) {
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static get_all_users() {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.selectAll(TableName);
      myModelMasterPromise.then(
        function(result) {
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static get_specific_users(ColumnName, value_) {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.selectSpecific(
        TableName,
        ColumnName,
        value_
      );
      myModelMasterPromise.then(
        function(result) {
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static batch_users_update(jsonObject_) {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.batch_update(
        TableName,
        jsonObject_
      );
      myModelMasterPromise.then(
        function(result) {
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static individual_users_update(ColumnName, value_, jsonObject_) {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.individual_update(
        TableName,
        jsonObject_,
        ColumnName,
        value_
      );
      myModelMasterPromise.then(
        function(result) {
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static delete_users_record(ColumnName, value_) {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.delete(
        TableName,
        ColumnName,
        value_
      );
      myModelMasterPromise.then(
        function(result) {
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static get_staff_members_with_a_specific_quality(
    TableTwo,
    JoiningKey,
    SearchColumn,
    SearchValue
  ) {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.two_table_inner_join(
        TableName,
        TableTwo,
        JoiningKey,
        SearchColumn,
        SearchValue
      );
      myModelMasterPromise.then(
        function(result) {
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static getSystemUserCompanyDetails(SystemUserId) {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.getSystemUserCompanyDetails(
        SystemUserId
      );
      myModelMasterPromise.then(
        function(result) {
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static getACompaniesSystemUsers(companyId) {
    return new Promise(function(resolve, reject) {
      var myModelMasterPromise = ModelMaster.getACompaniesSystemUsers(
        companyId
      );
      myModelMasterPromise.then(
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
