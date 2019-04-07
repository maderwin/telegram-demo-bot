'use strict';

const tasks = (arr) => arr.join(' && ');

module.exports = {
    'hooks': {
        'pre-commit': tasks([
            "npm run build",
            "npm run clean"
        ]),
        'pre-push': tasks([
            "npm run build",
            "npm run clean"
        ])
    }
}
