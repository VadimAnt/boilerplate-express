const fs = require('fs');

const APP_PATH_ENV = './env';
const APP_SCRIPT_PATH = './boot/boot.server.js';
const APP_NAME = 'bpolierplate-express';
const APP_WATCH = true;
const APP_NODE_ARGS = '';
const APP_MERGE_LOGS = true;
const APP_CWD = './';
const APP_ARGS = [];
const APP_IGNORE_WATCH = [
  'node_modules',
  'logs',
  '.git',
  '.idea',
  '.pm2',
  'temp',
];

const envs = {
  env: {},
  env_development: {},
  env_staging: {},
  env_production: {},
};


if (fs.existsSync(`${APP_PATH_ENV}/env.common.js`)) {
  envs.env = require(`${APP_PATH_ENV}/env.common.js`);
}

if (fs.existsSync(`${APP_PATH_ENV}/env.development.js`)) {
  envs.env_development = require(`${APP_PATH_ENV}/env.development.js`);
}

if (fs.existsSync(`${APP_PATH_ENV}/env.staging.js`)) {
  envs.env_staging = require(`${APP_PATH_ENV}/env.staging`);
}

if (fs.existsSync(`${APP_PATH_ENV}/env.production.js`)) {
  envs.env_production = require(`${APP_PATH_ENV}/env.production`);
}

module.exports = {
  apps: [{
    name: APP_NAME,
    script: APP_SCRIPT_PATH,
    args: APP_ARGS,
    watch: APP_WATCH,
    ignore_watch: APP_IGNORE_WATCH,
    node_args: APP_NODE_ARGS,
    merge_logs: APP_MERGE_LOGS,
    cwd: APP_CWD,
    ...envs,
  }],
};
