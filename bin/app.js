require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const DBService = require('@services/DBService');
const routes = require('@routes');

const app = express();
DBService.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server start port: ${process.env.APP_PORT}`);
});
