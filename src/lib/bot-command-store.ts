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

export interface BotChatContext {
    next: BotCommandHandler;
}

export class BotChatState extends Map<string | number, any>{
    get(key: string | number | (string | number)[]): any | undefined {
        if (typeof key !== 'string' && typeof key !== 'number') {
            key = key.join('.');
        }
        return super.get(key);
    }
    has(key: string | number | (string | number)[]): boolean {
        if (typeof key !== 'string' && typeof key !== 'number') {
            key = key.join('.');
        }
        return super.has(key);
    }
    set(key: string | number | (string | number)[], value: any): this {
        if (typeof key !== 'string' && typeof key !== 'number') {
            key = key.join('.');
        }
        return super.set(key, value);
    }
}

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
        const dialog = this.getDialog(message.chat.id);

        if (message.text) {
            const match = message.text.match(/^\/([^\s]*)(?:\s(.*))?$/);

            if (match) {
                const command = this.get(match[1]);
                if (command){
                    this.clearDialog(message.chat.id);
                  
                    command.handler(
                        this,
                        message,
                        match
                    );
                    return;
                }
            }
        }

        if (dialog) {
            const {done} = dialog.next(message);
            if (done) {
                this.clearDialog(message.chat.id);
            }
            return;
        }

        this.onHelpHandler(
            this,
            message,
            []
        );
    }

    getDialog = (chatId: number | string) => this.state.get(chatId);

    startDialog = (chatId: number | string, dialogGenerator: any, message: Message) => {
        const dialog = dialogGenerator(this, chatId);
        const {done} = dialog.next(message);
        if (!done) {
            this.state.set(chatId, dialog);
        }
        return dialog;
    }

    clearDialog = (chatId: number | string) => this.state.delete(chatId);

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
