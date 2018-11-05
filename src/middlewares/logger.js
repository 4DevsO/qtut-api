import winston from 'winston';

class Logger {
  constructor(name, filename, level) {
    const logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          name: name,
          filename: filename,
          json: true,
          level: level
        })
      ]
    });
    return logger;
  }
}

export default Logger;
