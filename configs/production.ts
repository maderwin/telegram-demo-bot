import * as fs from 'fs';
import * as path from 'path';

import Config from './interface';
import * as assert from 'assert';

const secretFile = path.join(__dirname, '../../secret.json');

assert(fs.existsSync(secretFile), 'secret.json not found');

const secret = require(secretFile);

const production: Config = {
    telegram: {
        ...secret.telegram
    },
    proxy: secret.proxy
};

export default production;
