import Config from './interface';
import production from './production';
import testing from './testing';
import development from './development';

export default new Map<string, Config>([
    ['production', production],
    ['testing', testing],
    ['development', development]
]);
