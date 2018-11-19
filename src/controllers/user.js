import express from 'express';
import * as b4a from '~/wrappers/b4a';
import Imgur from '~/wrappers/imgur';
import keys from '../../configs/keys';
import { success, internalError, badRequest } from '~/helpers/status';
import * as StringUtils from '~/helpers/string-utils';

const router = express.Router();
const imgur = new Imgur(keys.imgur_client_id);

/**
 * @name /user/get/:userObjectId
 * @description get user
 * @param {string} userObjectId
 */
router.get('/get/:userObjectId', (req, res) => {
  if (req.params != undefined && req.params.userObjectId != undefined) {
    const userObjectId = req.params.userObjectId;
    if (typeof userObjectId == typeof 'string') {
      b4a
        .userGet(userObjectId)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res);
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/signUp
 * @description signUp one user
 * @param {string} email
 * @param {string} password
 */
router.post('/signUp', (req, res) => {
  if (
    req.body != undefined &&
    req.body.email != undefined &&
    req.body.password != undefined
  ) {
    const email = req.body.email;
    const password = req.body.password;
    if (!StringUtils.validateEmail(email)) {
      badRequest(res);
    } else if (!StringUtils.validatePassword(password)) {
      badRequest(res);
    } else {
      b4a
        .userSignUp(email, password)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/signIn
 * @description signIn one user
 * @param {string} email
 * @param {string} password
 */
router.post('/signIn', (req, res) => {
  if (
    req.body != undefined &&
    req.body.email != undefined &&
    req.body.password != undefined
  ) {
    const email = req.body.email;
    const password = req.body.password;
    if (!StringUtils.validateEmail(email)) {
      badRequest(res, 'Invalid Email');
    } else if (!StringUtils.validatePassword(password)) {
      badRequest(res, 'Invalid Password');
    } else {
      b4a
        .userSignIn(email, password)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/resetPassword
 * @description request password reset for user
 * @param {string} email
 */
router.post('/resetPassword', (req, res) => {
  if (req.body != undefined && req.body.email != undefined) {
    const email = req.body.email;
    if (!StringUtils.validateEmail(email)) {
      badRequest(res, 'Invalid Email');
    } else {
      b4a
        .userResetPassword(email)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/update/:userObjectId
 * @description update info of one user
 * @param {...params} body
 * @param {string} userObjectId
 */
router.post('/update/:userObjectId', (req, res) => {
  if (req.body && req.params && req.params.userObjectId) {
    const data = req.body;
    const userObjectId = req.params.userObjectId;
    const allowedFields = Object.keys(data).filter(
      (field) =>
        field !== 'premium' &&
        field !== 'username' &&
        field !== 'email' &&
        field !== 'password'
    );
    if (allowedFields.length > 0) {
      const userToBeUpdated = allowedFields.reduce((newUser, field) => {
        newUser[field] = data[field];
        return newUser;
      }, {});
      userToBeUpdated['objectId'] = userObjectId;
      if (userToBeUpdated['profilePic']) {
        imgur
          .uploadImage(userToBeUpdated['profilePic'])
          .then((profilePic) => {
            userToBeUpdated['profilePic'] = profilePic;
            b4a
              .userUpdate(userToBeUpdated)
              .then((result) => success(res, result))
              .catch((err) => internalError(res, err));
          })
          .catch((err) => internalError(res, err));
      } else {
        b4a
          .userUpdate(userToBeUpdated)
          .then((result) => success(res, result))
          .catch((err) => internalError(res, err));
      }
    } else {
      badRequest(res, 'Must pass at least one allowed field');
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/delete/:userObjectId
 * @description delete user
 * @param {string} userObjectId
 */
router.post('/delete/:userObjectId', (req, res) => {
  if (req.params != undefined && req.params.userObjectId != undefined) {
    const userObjectId = req.params.userObjectId;
    if (typeof userObjectId == typeof 'string') {
      b4a
        .userDelete(userObjectId)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res, 'userObjectId must be a string');
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/list?name
 * @description get users by name
 * @param {string} name
 */
router.get('/list', (req, res) => {
  if (req.query != undefined && req.query.name != undefined) {
    const name = req.query.name;
    if (typeof name == typeof 'string') {
      const filter = {
        name: name
      };
      b4a
        .userGetByFilter(filter)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res, 'name must be a string');
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/activatePremium/:userObjectId
 * @description activate premium for user
 * @param {string} userObjectId
 * @param {number<months>} period
 */
router.post('/activatePremium/:userObjectId', (req, res) => {
  if (
    req.body != undefined &&
    req.body.period != undefined &&
    req.params != undefined &&
    req.params.userObjectId != undefined
  ) {
    const userObjectId = req.params.userObjectId;
    const period = req.body.period;
    if (typeof period != typeof 1 || period < 0) {
      badRequest(
        res,
        'period must be the number of months and cannot be negative'
      );
    } else if (typeof userObjectId != typeof 'string') {
      badRequest(res, 'userObjectId must be a string');
    } else {
      b4a
        .userGet(userObjectId)
        .then((user) => {
          let premiumFinalDate = new Date();
          if (user['premium'] == true) {
            premiumFinalDate = user['premiumExpiresAt'];
          }
          premiumFinalDate.setMonth(premiumFinalDate.getMonth() + period);
          const userToBeUpdated = {
            objectId: userObjectId,
            premium: true,
            premiumExpiresAt: premiumFinalDate
          };
          b4a
            .userUpdate(userToBeUpdated)
            .then((result) => success(res, result))
            .catch((err) => internalError(res, err));
        })
        .catch((err) => internalError(res, err));
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/deactivatePremium/:userObjectId
 * @description deactivate a user premium
 * @param {string} userObjectId
 */
router.post('/deactivatePremium/:userObjectId', (req, res) => {
  if (req.params != undefined && req.params.userObjectId != undefined) {
    const userObjectId = req.params.userObjectId;
    if (typeof userObjectId == typeof 'string') {
      b4a
        .userGet(userObjectId)
        .then((user) => {
          if (user['premium'] == true) {
            user['premium'] = false;
            b4a
              .userUpdate(user)
              .then((result) => success(res, result))
              .catch((err) => internalError(res, err));
          } else {
            badRequest(res);
          }
        })
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res, 'userObjectId must be a string');
    }
  } else {
    badRequest(res);
  }
});

export default router;
