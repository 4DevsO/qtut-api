const EmailValidator = require('email-validator');
const PasswordValidator = require('password-validator');

//* Configs *//

// Username
const UserVal = new PasswordValidator();
UserVal.is()
  .min(4)
  .is()
  .max(20)
  .has()
  .not()
  .symbols()
  .has()
  .letters();

// Password
const PassVal = new PasswordValidator();
PassVal.is()
  .min(8)
  .is()
  .max(50)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

// Validate Email
module.exports.validateEmail = (email) => {
  return EmailValidator.validate(email);
};

// Validate Username
module.exports.validateUsername = (username) => {
  return UserVal.validate(username);
};

// Validate Password
module.exports.validatePassword = (password) => {
  return PassVal.validate(password);
};
