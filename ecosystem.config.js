const fs = require('fs');
const envirements = ['dev', 'prod', 'test'];

const config = {
  name: 'changeMyName',
  script: './bin/app.js',
  watch: true,
};

envirements.forEach((env) => {
  const path = `./config/${env}.js`;
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
