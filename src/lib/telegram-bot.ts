import * as TelegramBot from 'tgfancy';
import * as ProxyAgent from 'proxy-agent';

import config from './config';

const botConfig: TelegramBot.ConstructorOptions = {
    polling: true,
    tgfancy: {
        orderedSending: true,
        textPaging: true,
        emojification: true
    }
};

if (config.proxy) {
    botConfig.request = <any>{
        agent: new ProxyAgent(config.proxy)
    };
}

export default function () {
    const bot = new TelegramBot(
        config.telegram.token,
        botConfig
    );

    return bot;
}
