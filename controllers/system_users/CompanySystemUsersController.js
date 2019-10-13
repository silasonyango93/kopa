/*SON/2018-11-06 00:29 - DEVELOPMENT

This class is the company_owners's controller class.
It receives calls from the "UsersRoutes" class and
passes the calls down to the "CompanySystemUsersModel" class

*/

const ModelMaster = require("../../models/ModelMaster.js");
const CompanySystemUsersModel = require("../../models/system_users/CompanySystemUsersModel.js");
const crypto = require("crypto");
var pbkdf2 = require("pbkdf2");

module.exports = class CompanySystemUsersController {
  constructor() {}

  /*my_hash_function(password, salt){
          
            var hash = crypto.createHmac('sha512', salt); 
            hash.update(password);
            var value = hash.digest('hex');
            return {
               salt:salt,
               encrypted_Password:value
            };
      }*/

  static insert_users(jsonObject_) {
    return new Promise(function(resolve, reject) {
      //var userAlreadyRegisteredResult;
      var TableName = "company_system_users";
      var ColumnName = "UserEmail";
      var value_ = jsonObject_.UserEmail;

      var myModelMasterPromise = ModelMaster.selectSpecific(
        TableName,
        ColumnName,
        value_
      );

      myModelMasterPromise.then(
        function(userAlreadyRegisteredResult) {
          if (userAlreadyRegisteredResult.length === 0) {
            var salt = crypto.randomBytes(128).toString("base64");
            var hash = crypto.createHmac(
              "sha512",
              salt
            ); /** Hashing algorithm sha512 */

            hash.update(jsonObject_.Password);
            var encrypted_Password = hash.digest("hex");

            delete jsonObject_["Password"];
            jsonObject_["UserEncryptedPassword"] = encrypted_Password;
            jsonObject_["UserSalt"] = salt;

            var myUsersObjectPromise = CompanySystemUsersModel.insert_users(
              jsonObject_
            );

            myUsersObjectPromise.then(
              function(result) {
                resolve(result);
              },
              function(err) {
                reject(err);
              }
            );
          } else {
            var myResponse = "A user already exists by this staff number";
            resolve(myResponse);
          }
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static user_login(jsonObject_) {
    return new Promise(function(resolve, reject) {
      var TableName = "company_system_users";
      var SearchColumn = "UserEmail";
      var SearchValue = jsonObject_.AttemptedEmail;

      var myModelMasterPromise = ModelMaster.selectSpecific(
        TableName,
        SearchColumn,
        SearchValue
      );

      myModelMasterPromise.then(
        function(userExistsResult) {
          if (userExistsResult.length === 0) {
            var error_msg = "There is no staff member by this email";
            var response_object = { error: true, error_msg: error_msg };
            resolve(response_object);
          } else {
            // var loginResponse = [];
            var hash = crypto.createHmac(
              "sha512",
              userExistsResult[0].UserSalt
            ); /** Hashing algorithm sha512 */
            hash.update(jsonObject_.AttemptedPassword);
            var Attempted_encrypted_Password = hash.digest("hex");

            if (
              Attempted_encrypted_Password ===
              userExistsResult[0].UserEncryptedPassword
            ) {
              var response_object = {
                error: false,
                SystemUserId: userExistsResult[0].SystemUserId,
                CompanyBranchId: userExistsResult[0].CompanyBranchId,
                UserFirstName: userExistsResult[0].UserFirstName,
                UserMiddleName: userExistsResult[0].UserMiddleName,
                UserSurname: userExistsResult[0].UserSurname,
                GenderId: userExistsResult[0].GenderId,
                StaffNo: userExistsResult[0].StaffNo,
                UserNationalId: userExistsResult[0].UserNationalId,
                UserEmail: userExistsResult[0].UserEmail,
                UserPhoneNumber: userExistsResult[0].UserPhoneNumber,
                UserPhysicalAddress: userExistsResult[0].UserPhysicalAddress,
                UserRegistrationDate: userExistsResult[0].UserRegistrationDate
              };
            } else {
              var error_msg = "Login failed";
              var response_object = { error: true, error_msg: error_msg };
            }

            //loginResponse.push(response_object);
            resolve(response_object);
          }
        },
        function(err) {
          reject(err);
        }
      );
    });
  }

  static get_all_users() {
    return new Promise(function(resolve, reject) {
      var myUsersObjectPromise = CompanySystemUsersModel.get_all_users();

      myUsersObjectPromise.then(
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
      var myUsersObjectPromise = CompanySystemUsersModel.get_specific_users(
        ColumnName,
        value_
      );

      myUsersObjectPromise.then(
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
      var myUsersObjectPromise = CompanySystemUsersModel.batch_users_update(
        jsonObject_
      );

      myUsersObjectPromise.then(
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
      var myUsersObjectPromise = CompanySystemUsersModel.individual_users_update(
        ColumnName,
        value_,
        jsonObject_
      );

      myUsersObjectPromise.then(
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
      var myUsersObjectPromise = CompanySystemUsersModel.delete_users_record(
        ColumnName,
        value_
      );

      myUsersObjectPromise.then(
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
      var myUsersObjectPromise = CompanySystemUsersModel.get_staff_members_with_a_specific_quality(
        TableTwo,
        JoiningKey,
        SearchColumn,
        SearchValue
      );

      myUsersObjectPromise.then(
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
