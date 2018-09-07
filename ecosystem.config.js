const fs = require('fs');

const APP_PATH_ENV = './env';
const APP_SCRIPT_PATH = './boot/app.js';
const APP_NAME = 'bpolierplate-express';
const APP_WATCH = true;

const commonEnv = require(`${APP_PATH_ENV}/common.env`);

const envirements = ['development', 'production', 'test'];

const config = {
  name: APP_NAME,
  script: APP_SCRIPT_PATH,
  watch: APP_WATCH,
  env: commonEnv,
};

envirements.forEach((env) => {
  const path = `./env/${env}.env.js`;
  const envName = `env_${env}`;
  if (fs.existsSync(path)) {
    try {
      config[envName] = require(path);
    } catch (error) {
      throw error;
    }
  } else {
    process.stderr.write('You did not create environment file! ');
  }
});

module.exports = {
  apps: [config],
};
