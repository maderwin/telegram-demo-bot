import {BotCommandStore} from '../lib/bot-command-store';
import {Message} from 'node-telegram-bot-api';

export default function* (сommandStore: BotCommandStore, chatId: number) {
    let message: Message;

    while (true) {
        сommandStore.bot.sendMessage(chatId, 'Введите имя: ');

        message = yield;
        if (message.text) {
            break;
        }

        сommandStore.bot.sendMessage(chatId, 'Это не похоже на человеческое имя, попробуйте снова');
    }

    const {text: firstName} = message;

    сommandStore.bot.sendMessage(chatId, 'Введите фамилию: ');
    const {text: secondName} = yield;
    сommandStore.bot.sendMessage(chatId, 'Введите отчество: ');
    const {text: lastName} = yield;
    сommandStore.bot.sendMessage(chatId, `Вас зовут: ${secondName} ${firstName} ${lastName}`);
}
