require('module-alias/register');
const httpStatus = require('http-status');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('@config');
const DBService = require('@services/DBService');

DBService.connect(config.db);

const {
  AuthService,
  LoggerService,
  MailService,
} = require('@services');

const app = express();
MailService.connect(config.smtp.default);

const passport = AuthService.init();
const routes = require('@routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(routes);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    message: 'Not found',
    error: [],
  });
});

app.use((err, req, res, next) => {
  if (err && err.status && err.message) {
    res.status(err.status);
    return res.send(err);
  }

  const error = { status: httpStatus.INTERNAL_SERVER_ERROR, success: false };
  if (config.app.env === 'development') {
    error.message = err.stack || err;
  } else {
    error.message = 'Something wrong!';
  }

  LoggerService.log({ message: error.message, level: 'error' });
  res.status(error.status);
  return res.send(error);
});

module.exports = app;
