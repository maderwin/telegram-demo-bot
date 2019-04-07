'use strict';

const tasks = (arr) => arr.join(' && ');

module.exports = {
    'hooks': {
        'pre-commit': tasks([
            "tslint --project tsconfig.json -c tslint.json",
            "tsc"
        ]),
        'pre-push': tasks([
            "tslint --project tsconfig.json -c tslint.json",
            "tsc"
        ])
    }
}
