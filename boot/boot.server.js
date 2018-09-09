const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./boot.app');
const config = require('@config');

const COUNT_FORKS = config.app.countForks !== 0 ?
  config.app.countForks : numCPUs;

if (cluster.isMaster) {
  process.stdout.write(`Master ${process.pid} is running\n`);
  for (let forks = 0; forks < COUNT_FORKS; forks += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    process.stdout.write(`worker ${worker.process.pid} died\n`);
  });
} else {
  app.listen(process.env.APP_PORT, () => {
    process.stdout.write(`Server start port: ${config.app.port}\n`);
  });

  process.stdout.write(`Worker ${process.pid} started\n`);
}
