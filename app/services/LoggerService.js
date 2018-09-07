const provider = require('winston');
require('winston-daily-rotate-file');

const config = require('@config').logger;

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
      dirname: config.dailyRotate.dirname,
      filename: config.dailyRotate.filename,
      datePattern: config.dailyRotate.datePattern,
      zippedArchive: config.dailyRotate.fileZip === true,
      maxSize: config.dailyRotate.fileMaxSize,
      maxFiles: config.dailyRotate.fileMaxOld,
    }));
  }

  log({ message, level = 'info' }) {
    this.logger.log({ level, message });
  }
}

module.exports = new LoggerService();
