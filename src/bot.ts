import createBot from './lib/telegram-bot';
import isPalindrom from './func/isPalindrom';
import decodeRLE from './func/decodeRLE';
import encodeRLE from './func/encodeRLE';

export default function () {
    const bot = createBot();

    let help = '';
    bot.onText(/\/echo (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match![1]; // the captured "whatever"

        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, resp);
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        // send a message to the chat acknowledging receipt of their message
        bot.sendMessage(chatId, 'Received your message');
    });

    bot.onText(/\/isPalindrom (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;

        const resp = isPalindrom (match![1]);
        bot.sendMessage(chatId, resp);
    });

    bot.onText(/\/decodeRLE (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;

        const resp = decodeRLE (match![1]);
        bot.sendMessage(chatId, resp);
    });

    bot.onText(/\/encodeRLE (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;

        const resp = encodeRLE (match![1]);
        bot.sendMessage(chatId, resp);
    });

    bot.onText(/\/help/, (msg) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        help = '/echo\n/isPalindrom\n/encodeRLE\n/decodeRLE';
        bot.sendMessage(chatId, help);
    });

    return bot;
}
