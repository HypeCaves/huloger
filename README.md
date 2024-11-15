# Welcome to Huloger! *Simplified logging module*

## What is **Huloger**?
**Huloger** is a customizable, versatile and professional logging module developed for use in Node.js projects. *It is designed specifically for Discord bots*, but can be used in any Node.js application. It can send the logging process to files, console and Discord Webhooks, and create records in JSON format or user-defined format.

## Features of Huloger
- Multi-Channel Logging: Console, file and Discord Webhook support.
- Cyclic File System: A system that rotates log files when the maximum size is reached.
- Log Levels: Logging at `debug`, `info`, `warn`, `error` levels.
- JSON Format Support: Logs can be written in JSON format.
- Time Format: ISO, UTC or local date formats.
- Error Trapping: Automatically captures and logs `unhandledRejection` and `uncaughtException` errors.
- Multiple Output Support: Simultaneous logging to multiple files and webhooks.

## Setuping

1. Module Installation
```bash
npm install huloger
```
So much :) *(sshh yes that's it)*

## Usage
1. Importing the Module
```js
const Huloger = require('huloger');
```

2. Basic Configuration
**Huloger** is defined as an object. It can be configured with the following options during installation.
```js
const logger = new Huloger({
  logFile: 'application.log',                                                      // Log File Name
  webhookUrl: 'https://discord.com/api/webhooks/xxxx/yyyy',                        // Discord Webhook URL
  logLevel: 'info',                                                                // Minimum log level
  enableJson: true,                                                                // Writing logs in JSON format
  timeFormat: 'iso',                                                               // Time format: 'iso', 'utc', 'local'
  outputs: [
    { type: 'file', path: './extra.log' },                                         // Additional file output
    { type: 'discord', webhookUrl: 'https://discord.com/api/webhooks/xxxx/yyyy' }, // Additional Discord Webhook output
  ],
});
```

## Logging Procedures
1. Basic Logging
Huloger can log at certain levels using the following methods:
```js
logger.debug('A debug level message.');
logger.info('An informative message.');
logger.warn('Warning message!');
logger.error('Error message!');
```

2. Logging to Multiple Outputs
```js
logger.logToMultiple('info', 'This message was logged in multiple places.');
```

## Error Trapping
Huloger can log unexpected errors with its automatic error trapping feature:

- Unhandled Rejections: Catches Promise errors.
- Uncaught Exceptions: Catches unexpected errors that occur while the code is running.

Example:
```js
setTimeout(() => {
  throw new Error('This is a testing error!');
}, 3000);
```

# Configuration Options
| Parameter      | Default Value   | Description                                                  |
|----------------|-----------------|--------------------------------------------------------------|
| `logFile`      | `bot.log`       | The name of the file where logs will be stored.              |
| `webhookUrl`   | `null`          | Discord Webhook URL.                                         |
| `logLevel`     | `info`          | Minimum log level (`debug`, `info`, `warn`, `error`).        |
| `enableJson`   | `false`         | Whether logs will be stored in JSON format.                 |
| `timeFormat`   | `iso`           | Time format (`iso`, `utc`, `local`).                        |
| `outputs`      | `[]`            | Additional log outputs (files or Discord Webhooks).         |

## Huloger API
1. Methods
**log(level, message)**
Writes logs at the specified level.
- level: Log level (debug, info, warn, error).
- message: The message to be logged.
```js
logger.log('info', 'This is a informative message.');
```

**logToMultiple(level, message)**
Sends logs to multiple outputs.
- level: Log level.
- message: The message to be logged.

**debug(message)**
Writes logs at debug level.

**info(message)**
Writes logs at information level.

**warn(message)**
Writes logs at warning level.

**error(message)**
Writes log at error level.

## Sample Application
```js
const Huloger = require('huloger');

const logger = new Huloger({
  logFile: 'app.log',
  webhookUrl: process.env.WEBHOOK_URL,
  logLevel: 'debug',
  enableJson: true,
  timeFormat: 'utc',
});

logger.debug('Debug message.');
logger.info('İnfo message.');
logger.warn('Warn message!');
logger.error('Error message!');
```

## Advanced Configuration
Huloger can determine configuration parameters by reading the `.env` file:
```dotenv
LOG_FILE=bot.log
WEBHOOK_URL=https://discord.com/api/webhooks/xxxx/yyyy
LOG_LEVEL=info
ENABLE_JSON=true
TIME_FORMAT=iso
```

## Debugging

If you are having problems with Huloger, follow these steps:

1. Set your log level to `debug`.
2. Check log files (`bot.log` or another log file).
3. Make sure you configure the Discord Webhook URL correctly.

## License
Apache-2.0
