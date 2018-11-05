const Express = require('express');
const bodyParser = require('body-parser');
const Logger = require('./middlewares/logger');
const b4a = require('./b4a');
const StringUtils = require('./helpers/string-utils');
const app = Express();

const logger = new Logger('qtut-api', '../qtut-api.log', 'info');
app.use(bodyParser.json());

//* EndPoints *//

// Hello
app.get('/hello || /', (req, res) => {
  b4a
    .hello()
    .then((result) => {
      logger.log('info', {
        ip: req.ip,
        hostname: req.hostname,
        method: req.method,
        endpoint: req.path,
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
        response: err,
        date: new Date()
      });
      res.send(err).status(500);
    });
});

// Set User ACL
app.post('/user/setUsersAcls', (req, res) => {
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
app.post('/user/signUp', (req, res) => {
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
app.post('/user/logIn', (req, res) => {
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
app.post('/user/requestPasswordReset', (req, res) => {
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

// Get User
app.post('/user', (req, res) => {
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

//* Server *//

const port = process.env.PORT | 5000;
const server = app.listen(port, () => {
  logger.log(
    'info',
    `API started at ${server.address().address}:${server.address().port}`
  );
});
