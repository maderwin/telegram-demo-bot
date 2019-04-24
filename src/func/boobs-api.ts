export default function (): string {
    const boobs = require('got');

    (async () => {
        try {
            const response = await boobs('http://api.oboobs.ru/boobs/0/1/random/');
            return response.boobs;
        } catch (error) {
            // re(error.response.body);
        }
    })();

    return boobs;
}
