const Huloger = require('../huloger');
require('dotenv').config();

const logger = new Huloger({
  logFile: 'test.log',
  webhookUrl: process.env.WEBHOOK_URL,
  logLevel: 'debug',
  enableJson: true,
  timeFormat: 'utc',
  outputs: [
    { type: 'file', path: './logs/extra.log' },
    { type: 'discord', webhookUrl: process.env.WEBHOOK_URL },
  ],
});

logger.debug('Bu bir debug mesajıdır.');
logger.info('Bu bir info mesajıdır.');
logger.warn('Bu bir uyarı mesajıdır!');
logger.error('Bu bir hata mesajıdır!');
logger.logToMultiple('info', 'Bu birden fazla yere gönderilen mesajdır.');

setTimeout(() => {
  throw new Error('Bu bir test hatasıdır!');
}, 3000);