import morgan from 'morgan';
import mung from 'express-mung';
import fs from 'fs';

const reqTest = (obj) => {
  const str = JSON.stringify(obj);
  const trimedString = str
    .replace(String.fromCharCode(92), '')
    .replace('""', '"')
    .replace('\\"', '');
  return str === '{}' ? '{}' : trimedString;
};

export default (req, res, next) => {
  const start = new Date();
  morgan.token('body', (req) => reqTest(req.body));
  morgan.token('params', (req) => reqTest(req.params));
  morgan.token('query', (req) => reqTest(req.query));
  morgan.token('resBody', (req) => reqTest(req.responseBody));

  mung.json((body, req) => {
    req.responseBody = body;
    return body;
  })(req, res, next);

  const myMorgan = morgan(
    `{"date": ":date[iso]", "remote-address": ":remote-addr", "remote-user": ":remote-user", "http-method": ":method", "endpoint": ":url", "status": ":status", "body": :body, "params": :params, "query": :query, "response": :resBody, "response-time": "${new Date() -
      start} ms"}`,
    { stream: fs.createWriteStream('./qtut-api.log', { flags: 'a' }) }
  );
  myMorgan(req, res, next);
  next();
};
