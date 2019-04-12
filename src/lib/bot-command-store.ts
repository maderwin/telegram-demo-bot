import * as TelegramBot from 'tgfancy';
import {Message, Metadata} from 'node-telegram-bot-api';

export type BotCommandHandler = (
    {state, bot}: {state: BotChatState, bot: TelegramBot},
    msg: Message,
    match: RegExpMatchArray
) => void;

export type BotCommand = {
    description: string | null;
    handler: BotCommandHandler;
};

export class BotChatState extends Map<(number | string)[], any>{}

export class BotCommandStore extends Map<string, BotCommand> {
    bot: TelegramBot;
    state: BotChatState;

    constructor(bot: TelegramBot) {
        super();
        this.bot = bot;
        bot.on('message', this.onMessage);
        this.state = new BotChatState();
        this.addCommand('help', null, this.onHelpHandler);
    }

    addCommand(name: string, description: string | null, handler: BotCommandHandler): BotCommandStore {
        this.set(name, {
            description,
            handler
        });

        return this;
    }

    onMessage = (message: Message, metadata: Metadata) => {
        if (message.text) {
            const match = message.text.match(/^\/([^\s]*)(?:\s(.*))?$/);

            if (match) {
                const command = this.get(match[1]);
                if (command){
                    command.handler(
                        this,
                        message,
                        match
                    );
                }
            }
        }
    }

    onHelpHandler: BotCommandHandler = (
        {state, bot},
        msg: Message
    ) => {
        const helpMessage =
            [...this.entries()]
                .filter((item) => item[1].description)
                .map((item) => `/${item[0]} - ${item[1].description}`)
                .join('\n');

        const chatId = msg.chat.id;
        bot.sendMessage(chatId, helpMessage || 'No commands found');
    }
}
