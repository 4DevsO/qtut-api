import morgan from 'morgan';
import mung from 'express-mung';
import fs from 'fs';

const reqTest = (obj) => {
  const str = JSON.stringify(obj);
  if (str) {
    const trimedString = str
      .replace(String.fromCharCode(92), '')
      .replace('""', '"')
      .replace('\\"', '');
    return str === '{}' ? '{}' : trimedString;
  }

  return str;
};

export const responseBody = mung.json((body, req) => {
  req.responseBody = body;
  return body;
});

export default (req, res, next) => {
  morgan.token('body', (req) => reqTest(req.body));
  morgan.token('params', (req) => reqTest(req.params));
  morgan.token('query', (req) => reqTest(req.query));
  morgan.token('resBody', (req) => reqTest(req.responseBody));

  const myMorgan = morgan(
    '{"date": ":date[iso]", "remote-address": ":remote-addr", "remote-user": ":remote-user", "http-method": ":method", "endpoint": ":url", "status": ":status", "body": :body, "params": :params, "query": :query, "response": :resBody, "response-time": ":response-time ms"}',
    { stream: fs.createWriteStream('./qtut-api.log', { flags: 'a' }) }
  );
  myMorgan(req, res, next);
};
