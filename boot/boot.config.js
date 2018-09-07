module.exports = {
  app: {
    port: process.env.APP_PORT || 80,
    env: process.env.NODE_ENV || 'development',
    jwtKey: process.env.JWT_SECRET || '',
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    sequre: process.env.SMTP_SEQURE,
  },
  security: {
    saltRounds: process.env.SECURITY_SOLDROUNDS || 10,
  },
  logger: {
    dailyRotate: {
      dirname: process.env.LOGGER_DAILY_DIRNAME || 'logs',
      filename: process.env.LOGGER_DAILY_FILENAME || 'application-%DATE%.log',
      datePattern: process.env.LOGGER_DAILY_DATEPATTERN || 'YYYY-MM-DD-HH',
      fileMaxSize: process.env.LOGGER_DAILY_FILE_MAXSIZE || '20m',
      fileMaxOld: process.env.LOGGER_DAILY_FILE_MAXOLD || '14d',
      fileZip: process.env.LOGGER_DAILY_FILE_ZIP || true,
    },
  },
};
