// tslint:disable-next-line: no-empty-interface
interface Config {
    readonly telegram: {
        readonly token: string;
    };

    readonly proxy?: string;
}

export default Config;
