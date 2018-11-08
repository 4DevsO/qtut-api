import Express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from '~/middlewares/log';
import { success, internalError } from '~/helpers/status';
import * as b4a from '~/wrappers/b4a';
import controllers from '~/controllers';
require('dotenv').config();
const app = Express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(helmet());
// app.use(logger);

//* EndPoints *//

app.get('/', (req, res) => {
  const test = req.query.teste;

  res.send({ message: test }).status(200);
});

/**
 * @name /hello
 * @description tests b4a conn
 */
app.get('/hello', (req, res) => {
  b4a
    .hello()
    .then((result) => success(res, result))
    .catch((err) => internalError(res, err));
});

app.use(controllers);

//* Server *//

const port = process.env.PORT | 5000;
app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`);
});
