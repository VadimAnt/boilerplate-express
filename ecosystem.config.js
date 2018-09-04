const fs = require('fs');

const envirements = ['development', 'production', 'test'];

const config = {
  name: 'bpolierplate-express',
  script: './bin/app.js',
  watch: true,
};

envirements.forEach((env) => {
  const path = `./config/${env}.env.js`;
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
