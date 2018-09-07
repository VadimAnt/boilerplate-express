const fs = require('fs');

const PATH_ENV = './env';
const commonEnv = require(`${PATH_ENV}/common.env`);

const envirements = ['development', 'production', 'test'];

const config = {
  name: 'bpolierplate-express',
  script: './bin/app.js',
  watch: true,
  //env: commonEnv,
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
  }
});

module.exports = {
  apps: [config],
};
