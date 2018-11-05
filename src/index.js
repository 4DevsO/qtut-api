import Express from 'express';
import bodyParser from 'body-parser';
import Logger from './middlewares/logger';
import * as b4a from './wrappers/b4a';
import controllers from './controllers';
const app = Express();

const logger = new Logger('qtut-api', './qtut-api.log', 'info');
app.use(bodyParser.json());

//* EndPoints *//

/**
 * @name /hello
 * @description tests b4a conn
 */
app.get('/hello', (req, res) => {
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

app.use(controllers);

//* Server *//

const port = process.env.PORT | 5000;
const server = app.listen(port, () => {
  logger.log(
    'info',
    `API started at ${server.address().address}:${server.address().port}`
  );
});
