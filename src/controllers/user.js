import express from 'express';
import * as b4a from '~/wrappers/b4a';
import Logger from '~/middlewares/logger';
import StringUtils from '~/helpers/string-utils';

const logger = new Logger('qtut-api', '../../qtut-api.log', 'info');
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
        .then((result) => {
          logger.log('info', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.params,
            response: result,
            date: new Date()
          });
          res.send(result).status(200);
        })
        .catch((err) => {
          logger.log('error', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.params,
            response: err,
            date: new Date()
          });
          res.send(err).status(500);
        });
    } else {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid objectId').status(400);
    }
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.params,
      date: new Date()
    });
    res.sendStatus(400);
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
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid Email').status(400);
    }
    if (!StringUtils.validatePassword(password)) {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid Password').status(400);
    }
    b4a
      .userSignUp(email, password)
      .then((result) => {
        logger.log('info', {
          ip: req.ip,
          hostname: req.hostname,
          method: req.method,
          endpoint: req.path,
          params: req.body,
          response: result,
          date: new Date()
        });
        res.send(result).status(200);
      })
      .catch((err) => {
        logger.log('error', {
          ip: req.ip,
          hostname: req.hostname,
          method: req.method,
          endpoint: req.path,
          params: req.body,
          response: err,
          date: new Date()
        });
        res.send(err).status(500);
      });
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.body,
      date: new Date()
    });
    res.sendStatus(400);
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
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid Email').status(400);
    }
    if (!StringUtils.validatePassword(password)) {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid Password').status(400);
    }
    b4a
      .userSignIn(email, password)
      .then((result) => {
        logger.log('info', {
          ip: req.ip,
          hostname: req.hostname,
          method: req.method,
          endpoint: req.path,
          params: req.body,
          response: result,
          date: new Date()
        });
        res.send(result).status(200);
      })
      .catch((err) => {
        logger.log('error', {
          ip: req.ip,
          hostname: req.hostname,
          method: req.method,
          endpoint: req.path,
          params: req.body,
          response: err,
          date: new Date()
        });
        res.send(err).status(500);
      });
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.body,
      date: new Date()
    });
    res.sendStatus(400);
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
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid Email').status(400);
    }
    b4a
      .userResetPassword(email)
      .then((result) => {
        logger.log('info', {
          ip: req.ip,
          hostname: req.hostname,
          method: req.method,
          endpoint: req.path,
          params: req.body,
          response: result,
          date: new Date()
        });
        res.send(result).status(200);
      })
      .catch((err) => {
        logger.log('error', {
          ip: req.ip,
          hostname: req.hostname,
          method: req.method,
          endpoint: req.path,
          params: req.body,
          response: err,
          date: new Date()
        });
        res.send(err).status(500);
      });
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.body,
      date: new Date()
    });
    res.sendStatus(400);
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
        .then((result) => {
          logger.log('info', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.body,
            response: result,
            date: new Date()
          });
          res.send(result).status(200);
        })
        .catch((err) => {
          logger.log('error', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.body,
            response: err,
            date: new Date()
          });
          res.send(err).status(500);
        });
    } else {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid params for update').status(400);
    }
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.body,
      date: new Date()
    });
    res.sendStatus(400);
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
        .then((result) => {
          logger.log('info', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.body,
            response: result,
            date: new Date()
          });
          res.send(result).status(200);
        })
        .catch((err) => {
          logger.log('error', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.body,
            date: new Date()
          });
          res.send(err).status(500);
        });
    } else {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid objectId').status(400);
    }
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.body,
      date: new Date()
    });
    res.sendStatus(400);
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
        .then((result) => {
          logger.log('info', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.body,
            response: result,
            date: new Date()
          });
          res.send(result).status(200);
        })
        .catch((err) => {
          logger.log('error', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.body,
            date: new Date()
          });
          res.send(err).status(500);
        });
    } else {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid name').status(400);
    }
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.body,
      date: new Date()
    });
    res.sendStatus(400);
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
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid period').status(400);
    }
    if (typeof userObjectId != typeof 'string') {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid objectId').status(400);
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
          .then((result) => {
            logger.log('info', {
              ip: req.ip,
              hostname: req.hostname,
              method: req.method,
              endpoint: req.path,
              params: req.body,
              response: result,
              date: new Date()
            });
            res.send(result).status(200);
          })
          .catch((err) => {
            logger.log('error', {
              ip: req.ip,
              hostname: req.hostname,
              method: req.method,
              endpoint: req.path,
              params: req.body,
              date: new Date()
            });
            res.send(err).status(500);
          });
      })
      .catch((err) => {
        logger.log('error', {
          ip: req.ip,
          hostname: req.hostname,
          method: req.method,
          endpoint: req.path,
          params: req.body,
          date: new Date()
        });
        res.send(err).status(500);
      });
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.body,
      date: new Date()
    });
    res.sendStatus(400);
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
              .then((result) => {
                logger.log('info', {
                  ip: req.ip,
                  hostname: req.hostname,
                  method: req.method,
                  endpoint: req.path,
                  params: req.body,
                  response: result,
                  date: new Date()
                });
                res.send(result).status(200);
              })
              .catch((err) => {
                logger.log('error', {
                  ip: req.ip,
                  hostname: req.hostname,
                  method: req.method,
                  endpoint: req.path,
                  params: req.body,
                  date: new Date()
                });
                res.send(err).status(500);
              });
          } else {
            logger.log('error', {
              ip: req.ip,
              hostname: req.hostname,
              method: req.method,
              endpoint: req.path,
              params: req.body,
              date: new Date()
            });
            res.send('User is not premium').status(400);
          }
        })
        .catch((err) => {
          logger.log('error', {
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            endpoint: req.path,
            params: req.body,
            date: new Date()
          });
          res.send(err).status(500);
        });
    } else {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        date: new Date()
      });
      res.send('Invalid objectId').status(400);
    }
  } else {
    logger.log('error', {
      ip: req.ip,
      hostname: req.hostname,
      method: req.method,
      endpoint: req.path,
      params: req.body,
      date: new Date()
    });
    res.sendStatus(400);
  }
});

export default router;
