import express from 'express';
import b4a from '../wrappers/b4a';
import Logger from '../middlewares/logger';
import StringUtils from '../helpers/string-utils';

const logger = new Logger('qtut-api', '../../qtut-api.log', 'info');
const router = express.Router();

// Get User
router.post('/', (req, res) => {
  if (req.body != undefined && req.body.id != undefined) {
    b4a
      .getUser(req.body.id)
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

// Set User ACL
router.post('/setUsersAcls', (req, res) => {
  if (req.body != undefined && req.body.user != undefined) {
    b4a
      .setUsersAcls(req.body.user)
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

// User SignUp
router.post('/signUp', (req, res) => {
  if (
    req.body != undefined &&
    req.body.email != undefined &&
    req.body.username != undefined &&
    req.body.password != undefined
  ) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    if (!StringUtils.validateEmail(email)) {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        response: 'Invalid Email',
        date: new Date()
      });
      res.send('Invalid Email').status(400);
    }
    if (!StringUtils.validateUsername(username)) {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        response: 'Invalid User',
        date: new Date()
      });
      res.send('Invalid User').status(400);
    }
    if (!StringUtils.validatePassword(password)) {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        response: 'Invalid Password',
        date: new Date()
      });
      res.send('Invalid Password').status(400);
    }
    b4a
      .signUp(email, username, password)
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

// User logIn
router.post('/logIn', (req, res) => {
  if (
    req.body != undefined &&
    req.body.username != undefined &&
    req.body.password != undefined
  ) {
    const username = req.body.username;
    const password = req.body.password;
    if (!StringUtils.validateUsername(username)) {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        response: 'Invalid User',
        date: new Date()
      });
      res.send('Invalid User').status(400);
    }
    if (!StringUtils.validatePassword(password)) {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        response: 'Invalid Password',
        date: new Date()
      });
      res.send('Invalid Password').status(400);
    }
    b4a
      .logIn(username, password)
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

// User Request Password Reset
router.post('/requestPasswordReset', (req, res) => {
  if (req.body != undefined && req.body.email != undefined) {
    const email = req.body.email;
    if (!StringUtils.validateEmail(email)) {
      logger.log('error', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
        params: req.body,
        response: 'Invalid Email',
        date: new Date()
      });
      res.send('Invalid Email').status(400);
    }
    b4a
      .requestPasswordReset(email)
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

export default router;
