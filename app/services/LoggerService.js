const provider = require('winston');
require('winston-daily-rotate-file');

class LoggerService {
  constructor() {
    this.logger = provider.createLogger({
      level: 'info',
      format: provider.format.json(),
      transports: [],
    });
    this.addTransports();
  }

  addTransports() {
    this.logger.add(new (provider.transports.DailyRotateFile)({
      dirname: 'logs',
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }));
  }

  log({ message, level = 'info' }) {
    this.logger.log({ level, message });
  }
}

module.exports = new LoggerService();
