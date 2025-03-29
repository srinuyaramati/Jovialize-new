const winston = require('winston');

const logger =  winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
});

// logger.info('This is an info message.')

exports.logger = { logger: logger };