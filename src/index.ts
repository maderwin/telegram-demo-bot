import * as assert from 'assert';

import app from './app';
import telegramBot from './bot';

import logger from './lib/logger';

// Bot

telegramBot();

// App

let customPort: number | undefined;

if (process.env.NODEJS_PORT !== undefined) {
    customPort = parseInt(process.env.NODEJS_PORT, 10);
    assert(
        !isNaN(customPort),
        'Environment variable NODEJS_PORT must be an integer'
    );
}
const port = customPort || 8080;
app.listen(port, () => {
    logger.info(`Application started on port ${port}`);
});
