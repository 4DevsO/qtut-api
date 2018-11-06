import morgan from 'morgan';
import mung from 'express-mung';
import fs from 'fs';

const reqTest = (obj) => {
  const str = JSON.stringify(obj);
  return str === '{}' ? undefined : str;
};

export default (req, res, next) => {
  morgan.token('body', (req) => reqTest(req.body));
  morgan.token('params', (req) => reqTest(req.params));
  morgan.token('query', (req) => reqTest(req.query));

  let resBody = '';
  mung.json((body) => {
    resBody = JSON.stringify(body);
    return body;
  })(req, res, next);

  const myMorgan = morgan(
    `:date[iso] :remote-addr :remote-user ":method :url HTTP/:http-version" :status body :body params :params query :query response ${resBody}`,
    { stream: fs.createWriteStream('./qtut-api.log', { flags: 'a' }) }
  );
  myMorgan(req, res, next);
  next();
};
