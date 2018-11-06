import express from 'express';
import * as b4a from '~/wrappers/b4a';
import { success, internalError, badRequest } from '~/helpers/status';
import StringUtils from '~/helpers/string-utils';

const router = express.Router();

/**
 * @name /user
 * @description get user
 * @param {string} userObjectId
 */
router.get('/:userObjectId', (req, res) => {
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
    }
    if (!StringUtils.validatePassword(password)) {
      badRequest(res);
    }
    b4a
      .userSignUp(email, password)
      .then((result) => success(res, result))
      .catch((err) => internalError(res, err));
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
      badRequest(res);
    }
    if (!StringUtils.validatePassword(password)) {
      badRequest(res);
    }
    b4a
      .userSignIn(email, password)
      .then((result) => success(res, result))
      .catch((err) => internalError(res, err));
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
      badRequest(res);
    }
    b4a
      .userResetPassword(email)
      .then((result) => success(res, result))
      .catch((err) => internalError(res, err));
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/update
 * @description update info of one user
 * @param {User{objectId, ...params}} user
 */
router.post('/update', (req, res) => {
  if (req.body != undefined && req.body.user != undefined) {
    const user = req.body.user;
    const allowedFields = Object.keys(user).filter(
      (field) =>
        field !== 'premium' &&
        field !== 'username' &&
        field !== 'email' &&
        field !== 'password'
    );
    if (allowedFields.length > 0) {
      const userToBeUpdated = allowedFields.reduce((newUser, field) => {
        newUser[field] = user[field];
        return newUser;
      }, {});

      b4a
        .userUpdate(userToBeUpdated)
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
 * @name /user/delete
 * @description delete user
 * @param {string} userObjectId
 */
router.post('/delete', (req, res) => {
  if (req.body != undefined && req.body.userObjectId != undefined) {
    const userObjectId = req.body.userObjectId;
    if (typeof userObjectId == typeof 'string') {
      b4a
        .userDelete(userObjectId)
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
 * @name /user/list
 * @description get users by name
 * @param {string} name
 */
router.get('/list/:name', (req, res) => {
  if (req.params != undefined && req.params.name != undefined) {
    const name = req.params.name;
    if (typeof name == typeof 'string') {
      const filter = {
        name: name
      };
      b4a
        .userGetByFilter(filter)
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
 * @name /user/activatePremium
 * @description activate premium for user
 * @param {string} userObjectId
 * @param {number<months>} period
 */
router.post('/activatePremium', (req, res) => {
  if (
    req.body != undefined &&
    req.body.userObjectId != undefined &&
    req.body.period != undefined
  ) {
    const userObjectId = req.body.userObjectId;
    const period = req.body.period;
    if (typeof period != typeof 1 || period < 0) {
      badRequest(res);
    }
    if (typeof userObjectId != typeof 'string') {
      badRequest(res);
    }
    b4a
      .userGet(userObjectId)
      .then((user) => {
        let premiumFinalDate = new Date();
        if (user['premium'] == true) {
          premiumFinalDate = user.get('premiumExpiresAt');
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
  } else {
    badRequest(res);
  }
});

/**
 * @name /user/deactivatePremium
 * @description deactivate a user premium
 * @param {string} userObjectId
 */
router.post('/deactivatePremium', (req, res) => {
  if (req.body != undefined && req.body.userObjectId != undefined) {
    const userObjectId = req.body.userObjectId;
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
      badRequest(res);
    }
  } else {
    badRequest(res);
  }
});

export default router;
