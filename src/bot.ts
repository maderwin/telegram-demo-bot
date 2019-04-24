import createBot from './lib/telegram-bot';
import isPalindrom from './func/is-palindrom';
import * as RLE from './func/rle';
import {BotCommandStore} from './lib/bot-command-store';

import registr from './func/registration';
import boobsApi from './func/boobs-api';


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

    commandStore.addCommand(
        'register',
        'Регистрация.',
        ({bot, state}, msg): void => {
            const chatId = msg.chat.id;
            commandStore.startDialog(chatId, registr, msg);
        }
    );

    commandStore.addCommand(
        'boobs',
        'Random boobs.',
        ({bot}, msg, [_messageText, _command, arg]): void => {
            const chatId = msg.chat.id;
            const response = 'http://media.oboobs.ru/' + boobsApi();
            bot.sendPhoto(chatId, response);
        }
    );

    return bot;
}
