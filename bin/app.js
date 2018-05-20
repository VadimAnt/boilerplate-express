require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthService = require('@services/AuthService');
const DBService = require('@services/DBService');
DBService.connect();

const app = express();
const routes = require('@routes');
const password = AuthService.init();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(password.initialize());
app.use(routes);
app.use(cors());


app.listen(process.env.APP_PORT, () => {
  console.log(`Server start port: ${process.env.APP_PORT}`);
});
