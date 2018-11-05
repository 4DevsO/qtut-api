import EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

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
export const validateEmail = (email) => {
  return EmailValidator.validate(email);
};

// Validate Username
export const validateUsername = (username) => {
  return UserVal.validate(username);
};

// Validate Password
export const validatePassword = (password) => {
  return PassVal.validate(password);
};
