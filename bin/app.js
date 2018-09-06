require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { AuthService, DBService } = require('@services');

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
  // loggs
  res.send(err);
});

DBService.connect();

app.listen(process.env.APP_PORT, () => {
  process.stdout.write(`Server start port: ${process.env.APP_PORT}`);
});
