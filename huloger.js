const fs = require('fs');
const path = require('path');
const { WebhookClient } = require('discord.js');
const chalk = require('chalk');
const rfs = require('rotating-file-stream');
require('dotenv').config();

class Huloger {
  constructor(config = {}) {
    this.logFile = config.logFile || process.env.LOG_FILE || 'bot.log';
    this.webhookUrl = config.webhookUrl || process.env.WEBHOOK_URL || null;
    this.logLevel = config.logLevel || process.env.LOG_LEVEL || 'info';
    this.enableJson = config.enableJson || (process.env.ENABLE_JSON === 'true');
    this.timeFormat = config.timeFormat || process.env.TIME_FORMAT || 'iso';
    this.outputs = config.outputs || [];
    this.levels = ['debug', 'info', 'warn', 'error'];
    this.webhookClient = this.webhookUrl ? new WebhookClient({ url: this.webhookUrl }) : null;

    this.logStream = rfs.createStream(this.logFile, {
      size: '10M',
      interval: '1d',
      path: path.resolve(__dirname, './logs'),
    });

    this.setupErrorHandlers();
  }

  setupErrorHandlers() {
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      this.log('error', `Unhandled Rejection: ${reason}`);
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      this.log('error', `Uncaught Exception: ${err.message}\nStack: ${err.stack}`);
    });
  }

  getTimeStamp() {
    const now = new Date();
    if (this.timeFormat === 'iso') {
      return now.toISOString();
    } else if (this.timeFormat === 'utc') {
      return now.toUTCString();
    }
    return now.toLocaleString();
  }

  log(level, message) {
    if (!this.levels.includes(level)) throw new Error(`Invalid log level: ${level}`);
    if (this.levels.indexOf(level) < this.levels.indexOf(this.logLevel)) return;

    const logEntry = {
      timestamp: this.getTimeStamp(),
      level,
      message,
    };

    const logMessage = this.enableJson
      ? JSON.stringify(logEntry)
      : `[${logEntry.timestamp}] [${logEntry.level.toUpperCase()}] ${logEntry.message}`;

    if (level === 'info') console.log(chalk.blue(logMessage));
    else if (level === 'warn') console.warn(chalk.yellow(logMessage));
    else if (level === 'error') console.error(chalk.red(logMessage));
    else console.log(logMessage);

    this.logStream.write(logMessage + '\n');

    if (this.webhookClient && ['warn', 'error'].includes(level)) {
      this.webhookClient.send({ content: logMessage }).catch(console.error);
    }
  }

  logToMultiple(level, message) {
    this.outputs.forEach(output => {
      if (output.type === 'file') {
        fs.appendFileSync(path.resolve(output.path), `[${level.toUpperCase()}] ${message}\n`);
      } else if (output.type === 'discord') {
        const webhookClient = new WebhookClient({ url: output.webhookUrl });
        webhookClient.send({ content: `[${level.toUpperCase()}] ${message}` }).catch(console.error);
      }
    });
  }

  debug(message) {
    this.log('debug', message);
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }
}

module.exports = Huloger;