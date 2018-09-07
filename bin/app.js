require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { AuthService, DBService } = require('@services');

DBService.connect({
  params: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
});

const app = express();
const routes = require('@routes');

const password = AuthService.init();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(password.initialize());
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

  const error = { status: 500, success: false };
  if (process.env.NODE_ENV === 'development') {
    error.message = err.stack || err;
  } else {
    error.message = 'Something wrong!';
  }

  res.status(500);
  return res.send(error);
});



app.listen(process.env.APP_PORT, () => {
  process.stdout.write(`Server start port: ${process.env.APP_PORT}`);
});
