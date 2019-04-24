import createBot from './lib/telegram-bot';
import isPalindrom from './func/is-palindrom';
import * as RLE from './func/rle';
import {BotCommandStore} from './lib/bot-command-store';

export default function () {
    const bot = createBot();
    const commandStore = new BotCommandStore(bot);

    commandStore.addCommand(
        'isPalindrom',
        'Проверяет, является ли введенный текст палиндромом.',
        ({bot}, msg, [_messageText, _command, arg]): void => {
            const chatId = msg.chat.id;
            bot.sendMessage(chatId, isPalindrom (arg) ? 'Палиндром' : 'Не палиндром');
        }
    );

    commandStore.addCommand(
        'decodeRLE',
        'Декодирует RLE-сжатую строку.',
        ({bot}, msg, [_messageText, _command, arg]): void => {
            const chatId = msg.chat.id;
            const response = RLE.decode (arg);
            bot.sendMessage(chatId, response);
        }
    );

    commandStore.addCommand(
        'encodeRLE',
        'Сжимает строку алгоритмом RLE.',
        ({bot}, msg, [_messageText, _command, arg]): void => {
            const chatId = msg.chat.id;
            const response = RLE.encode (arg);
            bot.sendMessage(chatId, response);
        }
    );

    commandStore.addCommand(
        'counter',
        'Счетчик. Просто счётчик.',
        ({bot, state}, msg): void => {
            const chatId = msg.chat.id;
            const counter = state.get([chatId, 'counter']) || 0;
            state.set([chatId, 'counter'], counter + 1);
            bot.sendMessage(chatId, `Счётчик: ${counter}`);
        }
    );

    return bot;
}
